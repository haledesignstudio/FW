import { sanityFetch } from '@/sanity/lib/fetch'
import { faqPageQuery } from '@/sanity/lib/queries'
import FAQClient from './faq'

export const revalidate = 60;

// Type definitions for FAQ data
interface FAQ {
  question: string
  answer: string
  category: string
  featured?: boolean
  order?: number
}

interface FAQData {
  pageHeader: {
    mainTitle: string
    subtitle?: string
  }
  faqs: FAQ[]
}

export default async function FAQPage() {
  try {
    const response = await sanityFetch<FAQData>({
      query: faqPageQuery,
      tags: ['faqPage']
    })

    if (!response.data) {
      return (
        <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
          <div className="text-2xl">No FAQ data available</div>
        </div>
      )
    }

    return <FAQClient faqData={response.data} />
  } catch (error) {
    console.error('Error fetching FAQ data:', error)
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
        <div className="text-2xl">Error loading FAQ data</div>
      </div>
    )
  }
}
