// import_mindbullets.js
// Node 16+ (CommonJS). Run:  node import_mindbullets.js
// - Reads your saved WP JSON export
// - Uploads featured images to Sanity
// - Scrapes Dateline (custom), Published date (<time>), Related Stories (exact section)
// - Upserts into Sanity with createOrReplace

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const he = require('he') // decode HTML entities

// ==========================
// Config (hard-coded values)
// ==========================
const SANITY_PROJECT_ID = 'nq48kwc6'
const SANITY_DATASET = 'production'
const SANITY_API_TOKEN = 'sk8bSHIwEE8ixB8gMRIAEbfvnqNgRqIabTTxCXDUoQINyDF7dsuTt0Xmzx8I6rZbp2ggNNFBfLnOyC5QTt87BBQmp9bLQ2to7yuu2OnzpTsZoMp58iVOWLspF1bzX0hWaTw832PDZPRf7ApPAkqqRd2lXAtDoSirXGV7sOXELtlW8pfIXb87'
const SANITY_API_VERSION = '2025-08-13'
const WP_BASE = 'https://futureworld.org'
const WP_MEDIA_API_BASE = `${WP_BASE}/wp-json/wp/v2/media/`

// Test limiter: 20 for a trial run; set to 0 (or null) for all posts
const LIMIT = 0

// Path to your saved WP JSON export (array of posts from /wp-json/wp/v2/posts?categories=6&per_page=100&page=…)
const INPUT_JSON = path.resolve('./wp-export/mind_bullets.json')

// Axios defaults
axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (compatible; MindBulletsImporter/1.0)'

// Sanity client
const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    token: SANITY_API_TOKEN,
    apiVersion: SANITY_API_VERSION,
    useCdn: false,
})

// ==========================
// Helpers
// ==========================
function toIsoDate(d) {
    if (!d) return null
    const t = new Date(d)
    if (!isNaN(t.valueOf())) return t.toISOString().slice(0, 10)
    const m = String(d).match(/\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/i)
    if (m) {
        const day = String(Number(m[1])).padStart(2, '0')
        const month = new Date(`${m[2]} 1, 2000`).getMonth() + 1
        const mm = String(month).padStart(2, '0')
        return `${m[3]}-${mm}-${day}`
    }
    return null
}

function buildPortableTextFromHtml(html) {
  const $ = cheerio.load(String(html || ''));

  // remove junk we never want
  $('script, style, noscript').remove();

  const blocks = [];

  function makeSpan(text) {
    return {
      _key: 'span-' + Math.random().toString(36).slice(2, 11),
      _type: 'span',
      text,
    };
  }

  function makeBlock({ style = 'normal', children, listItem, level } = {}) {
    // skip empty blocks
    const joined = (children || []).map(c => c.text).join('').trim();
    if (!joined) return;
    blocks.push({
      _key: 'block-' + Math.random().toString(36).slice(2, 11),
      _type: 'block',
      style,
      markDefs: [],
      ...(listItem ? { listItem } : {}),
      ...(level ? { level } : {}),
      children,
    });
  }

  // turn <p> with <br> into multiple paragraphs
  function pushParagraphLike(node) {
    // split on <br> boundaries
    const html = $(node).html() || '';
    const parts = html.split(/<br\s*\/?>/i).map(part =>
      he.decode($( '<div>' ).html(part).text()).trim()
    );
    parts.forEach(part => {
      if (part) makeBlock({ style: 'normal', children: [makeSpan(part)] });
    });
  }

  // flatten content we care about in DOM order
  const nodes = $('h1,h2,h3,h4,h5,h6,p,ul,ol,blockquote').toArray();
  nodes.forEach(node => {
    const $node = $(node);
    const tag = node.tagName.toLowerCase();

    if (tag === 'p') {
      pushParagraphLike(node);
      return;
    }

    if (/^h[1-6]$/.test(tag)) {
      const text = he.decode($node.text()).trim();
      if (text) {
        const style = tag; // 'h1'..'h6'
        makeBlock({ style, children: [makeSpan(text)] });
      }
      return;
    }

    if (tag === 'blockquote') {
      const text = he.decode($node.text()).trim();
      if (text) {
        makeBlock({ style: 'blockquote', children: [makeSpan(text)] });
      }
      return;
    }

    if (tag === 'ul' || tag === 'ol') {
      const listItemType = tag === 'ol' ? 'number' : 'bullet';
      $node.find('> li').each((_, li) => {
        const $li = $(li);
        // Split <br> inside list items into separate list blocks
        const html = $li.html() || '';
        const parts = html.split(/<br\s*\/?>/i).map(part =>
          he.decode($('<div>').html(part).text()).trim()
        );
        parts.forEach(part => {
          if (part) {
            makeBlock({
              style: 'normal',
              listItem: listItemType,
              level: 1,
              children: [makeSpan(part)],
            });
          }
        });
      });
      return;
    }
  });

  // Fallback: if everything was empty, emit a single empty block so Studio doesn’t choke
  if (blocks.length === 0) {
    makeBlock({ style: 'normal', children: [makeSpan('')] });
  }

  return blocks;
}


async function uploadImageToSanity(imageUrl) {
    if (!imageUrl) return undefined
    try {
        const resp = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 30000 })
        const mime = resp.headers['content-type'] || 'image/jpeg'
        const filename = imageUrl.split('/').pop() || 'image.jpg'
        const asset = await client.assets.upload('image', Buffer.from(resp.data), {
            contentType: mime,
            filename,
        })
        return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    } catch (e) {
        console.warn('Image upload failed:', imageUrl, e?.message || e)
        return undefined
    }
}

async function getFeaturedMediaUrl(wpPost) {
    const mediaId = wpPost.featured_media
    if (!mediaId || mediaId === 0) return null
    try {
        const { data } = await axios.get(WP_MEDIA_API_BASE + mediaId, { timeout: 20000 })
        return data?.source_url || data?.media_details?.sizes?.full?.source_url || null
    } catch (e) {
        console.warn('Failed to fetch media JSON:', mediaId, e?.message || e)
        return null
    }
}

async function discoverOgImage(url) {
    try {
        const { data: html } = await axios.get(url, { timeout: 25000 })
        const $ = cheerio.load(html)
        const og = $('meta[property="og:image"]').attr('content')
        const featured = $('img.wp-post-image').attr('src')
        const firstArticleImg = $('article img, .entry-content img').first().attr('src')
        return og || featured || firstArticleImg || null
    } catch {
        return null
    }
}

function normalizeRelated(items) {
    // Ensure _key and strip empties; matches schema: array of objects {title, link}
    return (items || [])
        .filter(it => it && it.title && it.link)
        .map(it => ({
            _key: it._key || ('rel-' + Math.random().toString(36).slice(2, 10)),
            title: String(it.title).trim(),
            link: String(it.link).trim(),
        }))
}

// ==========================
// Precise scraping functions
// ==========================

// Fix: skip the literal label "Dateline" and return the first value that *looks* like a date.
function extractDateline($) {
    const spans = $('span.elementor-icon-list-text.elementor-post-info__item.elementor-post-info__item--type-custom')
    let found = null
    spans.each((_, el) => {
        const txt = ($(el).text() || '').trim()
        if (/\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i.test(txt)) {
            if (!found) found = txt
        }
    })
    return toIsoDate(found) // format to "YYYY-MM-DD" just like publishedAt
}

function extractPublishedDate($, wpFallbackDate) {
    // Prefer the <time> element if present, otherwise meta fallbacks, otherwise WP date
    const publishedText = $('.elementor-post-info__item--type-date time').first().text().trim()
    const pagePublishedRaw =
        $('time[datetime]').first().attr('datetime') ||
        $('meta[property="article:published_time"]').attr('content') ||
        $('meta[name="datePublished"]').attr('content') ||
        publishedText ||
        null
    return toIsoDate(pagePublishedRaw) || toIsoDate(wpFallbackDate) || null
}

// Tightened: only read from the actual related-stories block, trim whitespace,
// reject non-HTTP links, and drop common junk/CTA items.
function extractRelatedStrict($, max = 10) {
    const out = []
    const BAD = /^(home|read more|sign ?up|supercharge tomorrow)$/i

    $('.mb-link-wrap .mb-links a').each((_, a) => {
        const href = ($(a).attr('href') || '').trim()
        const title = ($(a).text() || '').trim().replace(/\s+/g, ' ')
        if (!href || !title) return
        if (!/^https?:\/\//i.test(href)) return
        if (BAD.test(title)) return
        out.push({ title, link: href, _key: 'rel-' + Math.random().toString(36).slice(2, 10) })
    })

    return out.slice(0, max)
}

// ==========================
// Core mapping per post
// ==========================
async function mapPost(wpPost) {
    // Body (simple PT block with full stripped text)
    const blocks = buildPortableTextFromHtml(wpPost.content?.rendered)

    // Featured image (primary: WP media; fallback: OG image/first article image)
    let mainImage = undefined
    let imageUrl = await getFeaturedMediaUrl(wpPost)
    if (!imageUrl) imageUrl = await discoverOgImage(wpPost.link)
    if (imageUrl) mainImage = await uploadImageToSanity(imageUrl)

    // Live page scrape
    let dateline = null
    let publishedAt = null
    let byLine = null
    let relatedStories = []

    try {
        const resp = await axios.get(wpPost.link, { timeout: 25000 })
        const $ = cheerio.load(resp.data)

        dateline = extractDateline($)
        publishedAt = extractPublishedDate($, wpPost.date)

        // Byline (theme-specific; best-effort fallback to rel="author")
        const byLineElement = $('.jet-listing-dynamic-field__inline-wrap h3.jet-listing-dynamic-field__content').first()
        byLine = (byLineElement.text().trim() || $('[rel="author"]').first().text().trim() || null) || null

        // Related Stories (strict)
        relatedStories = extractRelatedStrict($, 10)
    } catch (err) {
        console.warn(`Failed to scrape live post page for ${wpPost.link}:`, err.message)
        publishedAt = toIsoDate(wpPost.date)
    }

    // Build Sanity doc — adjust field names to match your schema exactly
    // Build Sanity doc — matches your 'mindbullet' schema
    const doc = {
        _type: 'mindbullet',
        _id: `mindbullet-${wpPost.slug}`, // idempotent per slug
        title: he.decode(wpPost.title?.rendered || ''),
        slug: { _type: 'slug', current: wpPost.slug },
        publishedAt,                 // string (e.g. "2024-10-31")
        dateline,                    // string (e.g. "18 June 2030") or null
        byLine,
        body: blocks,                // portable text
        RelatedStories: normalizeRelated(relatedStories),
    }

    if (mainImage) {
        doc.mainImage = mainImage
    }


    return doc
}

// ==========================
// Import runner
// ==========================
async function importPosts() {
    if (!fs.existsSync(INPUT_JSON)) {
        console.error('Input JSON not found at:', INPUT_JSON)
        process.exit(1)
    }

    const posts = JSON.parse(fs.readFileSync(INPUT_JSON, 'utf-8'))
    console.log('Loaded posts:', posts.length)

    const subset = LIMIT ? posts.slice(0, LIMIT) : posts
    console.log(`Importing ${subset.length} post(s)${LIMIT ? ' (limited for test)' : ''}...`)

    for (const wpPost of subset) {
        try {
            const doc = await mapPost(wpPost)
            const saved = await client.createOrReplace(doc)
            console.log(`✅ Imported: ${doc.title}  →  ${saved._id}`)
        } catch (err) {
            console.error('❌ Import error:', wpPost?.link || wpPost?.slug, err?.message || err)
        }
    }

    console.log('Done.')
}

importPosts()
