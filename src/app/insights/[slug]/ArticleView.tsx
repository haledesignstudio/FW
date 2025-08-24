"use client";

import React, { useMemo } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import FadeInOnVisible from "@/components/FadeInOnVisible";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import { urlFor } from "@/sanity/lib/image";
import CommonHeader from "@/components/insights/CommonHeader";
import { getGridClasses } from "@/components/insights/grid";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import type { PortableTextComponentProps } from "@portabletext/react";
import Carousel from "@/components/Carousel";

type SanityAssetRef = { _type: "reference"; _ref: string };
type SanityImage = { asset?: SanityAssetRef; alt?: string };

type ArticleAuthor = {
  name: string;
  position: string;
  bio?: PortableTextBlock[];
  image?: SanityImage;
  linkedin?: string;
};

type ArticlePdf = { url: string };

type RelatedStory = { title: string; link: string };


type Article = {
  _id: string;
  slug?: string;
  title: string;
  byline?: string;
  datePublished?: string;
  image?: SanityImage;
  body?: PortableTextBlock[];

  hasPdf?: boolean;
  pdf?: ArticlePdf | null;

  hasAuthor?: boolean;
  author?: ArticleAuthor | null;

  hasRelatedStories?: boolean;
  relatedStories?: RelatedStory[];
};


type MindbulletCompact = {
  _id: string;
  title: string;
  slug?: string;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
};

function splitPortableBlocks(blocks: PortableTextBlock[] = []): [PortableTextBlock[], PortableTextBlock[]] {
  const mid = Math.ceil(blocks.length / 2);
  return [blocks.slice(0, mid), blocks.slice(mid)];
}

type ImageBlockValue = {
  _type: "image";
  asset?: SanityAssetRef;
  alt?: string;
};

type EmbedBlockValue = {
  _type: "embed";
  url?: string;
  title?: string;
};

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-[1em]">{children}</p>,
  },
  types: {
    image: ({ value }: PortableTextComponentProps<ImageBlockValue>) =>
      value?.asset ? (
        <img
          src={urlFor(value.asset).url()}
          alt={value.alt || "Embedded image"}
          className="my-4 w-full h-auto object-contain"
        />
      ) : null,

    embed: ({ value }: PortableTextComponentProps<EmbedBlockValue>) => {
      const url = value?.url;
      if (!url) return null;
      return (
        <div className="my-4 aspect-video w-full">
          <iframe
            src={url}
            title={value?.title || "Embedded media"}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      );
    },
  },
};


type PTChild = { text?: string };
type PTBlockWithChildren = PortableTextBlock & { children?: PTChild[] };


function toPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((b) => {
      const withChildren = b as PTBlockWithChildren;
      const children: PTChild[] = withChildren.children ?? [];
      return children.map((c) => c.text ?? "").join("");
    })
    .join("\n")
    .replace(/\s+/g, " ")
    .trim();
}

interface ArticleViewProps {
  data: Article;
  mindbullets?: MindbulletCompact[];
}

const ArticleView: React.FC<ArticleViewProps> = ({ data, mindbullets = [] }) => {
  const [leftBlocks, rightBlocks] = splitPortableBlocks(data.body);


  const carouselItems = useMemo(() => {
    return (mindbullets || []).map((m) => {
      const src =
        m.mainImage?.asset ? urlFor(m.mainImage.asset).url() : "/placeholder-image.png";
      const description = toPlainText(m.body).slice(0, 400);
      return {
        src,
        heading: m.title,
        description,
        href: m.slug ? `/mindbullets/${m.slug}` : "#",
      };
    });
  }, [mindbullets]);


  const AuthorBlock = (
    <>
      {data.hasAuthor && data.author ? (
        <div className="mt-[2vh]">
          {data.author.image?.asset ? (
            <img
              src={urlFor(data.author.image.asset).url()}
              alt={data.author.image.alt || "Author image"}
              className="w-full h-auto object-cover mb-[1vh]"
            />
          ) : null}

          {data.author.name ? <div className="font-bold">{data.author.name}</div> : null}
          {data.author.position ? <div className="opacity-80">{data.author.position}</div> : null}

          {data.author.bio?.length ? (
            <div className="mt-[1vh]">
              <PortableText value={data.author.bio} components={ptComponents} />
            </div>
          ) : null}

          {data.author.linkedin ? (
            <div className="mt-[1vh]">
              <a
                href={data.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold"
              >
                Connect on LinkedIn
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );


  const RelatedStoriesBlock = (
    <>
      {data.hasRelatedStories && (data.relatedStories?.length ?? 0) > 0 ? (
        <div className="mt-[6vh]">
          <div className="text-[2.5vh] font-graphik leading-tight mb-[2vh]">
            Related stories
          </div>
          <ul className="space-y-[1vh]">
            {data.relatedStories!.map((rs, i) => (
              <li key={`${rs.title}-${i}`}>
                <a
                  href={rs.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[2.5vh] leading-relaxed"
                >
                  <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#232323">
                    {rs.title}
                  </UnderlineOnHoverAnimation>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );

  // --- MOBILE ---
  const mobile = (
    <div className="block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden min-h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-4 gap-y-5 w-full">
        <div className="col-span-4 row-span-2 dt-h2">
          {data.title}
        </div>

        {data.image?.asset && (
          <div className="col-span-4 row-span-2">
            <img
              src={urlFor(data.image.asset).url()}
              alt={data.image.alt || "Article image"}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {data.byline ? (
          <div className="col-span-4 row-span-1 dt-h3">
            {data.byline}
          </div>
        ) : null}

        {data.datePublished ? (
          <div className="col-span-2 row-span-1 flex items-center">
            <span className="dt-body-lg">
              {data.datePublished}
            </span>
          </div>
        ) : null}

        <div className="col-span-4 dt-body-sm">
          <PortableText value={leftBlocks} components={ptComponents} />
          <PortableText value={rightBlocks} components={ptComponents} />
        </div>


        {data.hasPdf && data.pdf?.url ? (
          <div className="col-span-4 mt-[2vh]">
            <a
              href={data.pdf.url}
              className="dt-btn inline-block mt-[1vh] underline font-bold"
              target="_blank"
              rel="noreferrer"
            >
              Download PDF
            </a>
          </div>
        ) : null}


        <div className="col-span-4">{AuthorBlock}</div>


        <div className="col-span-4">{RelatedStoriesBlock}</div>


        {carouselItems.length > 0 && (
          <div className="col-span-4 mt-[10vh]">
            <FadeInOnVisible>
              <div className="dt-h5 mb-[2vh]">
                You may also like
              </div>
              <Carousel
                items={carouselItems}
                imageHeight="25vh"
                captionHeight="25vh"
                innerRowGap="4vh"
                gap="4vh"
                mobileImageHeight="22vh"
                mobileCaptionHeight="22vh"
                mobileInnerRowGap="3vh"
                mobileGap="3vh"
              />
            </FadeInOnVisible>
          </div>
        )}

        <div className="col-span-2 row-span-1 mt-4">
          <FadeInOnVisible>
            <Link href="/keynotes" className="dt-btn transition font-bold cursor-pointer">
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                See Keynotes
              </UnderlineOnHoverAnimation>
            </Link>
          </FadeInOnVisible>
        </div>

        <div
          className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FadeInOnVisible>
            <span className="underline dt-btn flex items-center gap-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: "rotate(-45deg)" }}
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              Back to top
            </span>
          </FadeInOnVisible>
        </div>
      </div>
    </div>
  );

  // --- DESKTOP ---
  const gridItems = [
    {
      id: "article-1",
      content: data.image?.asset ? (
        <img
          src={urlFor(data.image.asset).url()}
          alt={data.image.alt || "Article image"}
          className="w-full h-full object-cover"
        />
      ) : null,
      colSpan: 6,
      rowSpan: 3,
    },
    {
      id: "article-2",
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: "article-3",
      content: (
        <FadeInOnVisible>
          <div className="h-full flex flex-col gap-[7.5vh]">
            <div className="dt-h2 text-balance">
              {data.title}
            </div>
            <div className="dt-h3">
              {data.byline}
            </div>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 3,
    },
    {
      id: "article-4",
      content: (
        <div className="dt-body-lg">
          {data.datePublished}
        </div>
      ),
      colSpan: 6,
      rowSpan: 1,
    },
  ];

  const desktop = (
    <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block">
      <CommonHeader title={data.title} active="corporate" />
      <div className="grid gap-[2vh] grid-cols-2 auto-rows-[25vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className={getGridClasses({
              id: item.id,
              colSpan: item.colSpan,
              rowSpan: item.rowSpan,
            })}
          >
            {item.content}
          </div>
        ))}
      </div>

      <FadeInOnVisible>
        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 mt-[4vh]">
          <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4">
            <div className="grid grid-cols-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-2 gap-[2vh]">
              <div className="dt-body-sm">
                <PortableText value={leftBlocks} components={ptComponents} />
              </div>
              <div className="dt-body-sm">
                <PortableText value={rightBlocks} components={ptComponents} />
              </div>
            </div>
          </div>


          <div className="col-span-2">
            <div className="mt-auto dt-btn justify-end flex gap-[2vh] flex-wrap">
              {data.hasPdf && data.pdf?.url ? (
                <a
                  href={data.pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dt-btn"
                >
                  <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                    Download PDF
                  </UnderlineOnHoverAnimation>
                </a>
              ) : null}
            </div>
          </div>

          <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2" />
        </div>
      </FadeInOnVisible>


      {data.hasAuthor && data.author ? (
        <FadeInOnVisible>
          <div className="grid gap-[2vh] grid-cols-6 mt-[25vh]">
            <div className="col-span-3 flex flex-col">
              <div className="dt-h3">
                About the Author
              </div>

              <div className="mt-[10vh] dt-h5">
                {data.author.name ? <span>{data.author.name}</span> : null}
                {data.author.position ? <>, {data.author.position}</> : null}
              </div>

              <div className="dt-body-sm">
                {data.author.bio?.length ? (
                  <div className="mt-[2.5vh]">
                    <PortableText value={data.author.bio} components={ptComponents} />
                  </div>
                ) : null}
              </div>

              <div className="mt-auto dt-btn flex gap-[2vh] flex-wrap">
                {data.author.linkedin ? (
                  <a
                    href={data.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold"
                  >
                    <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                      Connect on LinkedIn
                    </UnderlineOnHoverAnimation>
                  </a>
                ) : null}
              </div>
            </div>

            <div className="col-span-3">
              {data.author.image?.asset ? (
                <img
                  src={urlFor(data.author.image.asset).url()}
                  alt={data.author.image.alt || "Author image"}
                  className="w-full h-auto object-cover mb-[1vh]"
                />
              ) : null}
            </div>

            <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2" />
          </div>
        </FadeInOnVisible>
      ) : null}


      {data.hasRelatedStories && (data.relatedStories?.length ?? 0) > 0 ? (
        <FadeInOnVisible>
          <div className="mt-[25vh]">
            <p className="dt-h5">
              Links to related stories
            </p>
            <ul className="list space-y-[0.75vh] mt-[2vh]">
              {data.relatedStories!.map((rs, i) => (
                <li key={`${rs.title}-${i}`}>
                  <a
                    href={rs.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dt-body-lg"
                  >
                    <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#232323">
                      {rs.title}
                    </UnderlineOnHoverAnimation>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeInOnVisible>
      ) : null}


      {carouselItems.length > 0 && (
        <FadeInOnVisible>
          <div className="mt-[25vh]">
            <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-relaxed mb-[2vh]">
              You may also like
            </div>
            <Carousel
              items={carouselItems}
              imageHeight="25vh"
              captionHeight="25vh"
              innerRowGap="4vh"
              gap="4vh"
            />
          </div>
        </FadeInOnVisible>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        {mobile}
        {desktop}
      </main>
      <Footer />
    </>
  );
};

export default ArticleView;
