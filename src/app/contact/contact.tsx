'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

type ContactPageContent = {
  title: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageHeader: {
    mainTitle: string;
  };
  contactFormSubheading?: string;
  contactFormIntro?: string;
  contactForm?: {
    namePlaceholder?: string;
    emailPlaceholder?: string;
    phonePlaceholder?: string;
    companyPlaceholder?: string;
    positionPlaceholder?: string;
    messagePlaceholder?: string;
  };
  officesSubheading?: string;
  officesAroundTheWorld: Array<{
    name: string;
    email: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt?: string;
    };
  }>;
  keynoteSubheading?: string;
  bookingKeynote?: {
    title: string;
    subtitle?: string;
    text: string;
    link: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
};

export default function Contact({ data }: { data: ContactPageContent }) {
  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setFormStatus('sent');
        setForm({ name: '', email: '', phone: '', company: '', position: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
          {/* ROW 2: Main Title (col-span-3) + Subheading (col-span-3) */}
          <div className="col-span-3 row-span-1 flex items-start bg-[#F9F7F2]">
            <MainTitleAnimation 
              text={data.pageHeader.mainTitle}
              typeSpeed={60}
              delay={500}
              className="text-[4vh] font-bold leading-tight"
            />
          </div>
          <div className="col-span-3 row-span-1 flex items-start bg-[#F9F7F2]">
            <h2 className="text-[2.5vh] font-bold">{data.contactFormSubheading || 'Get in Touch'}</h2>
          </div>
          {/* ROWS 3-5: Image (col-span-6) */}
          <div className="col-span-6 row-span-3 bg-[#F9F7F2] flex items-center justify-center">
            {data.mainImage?.asset ? (
              <img
                src={urlFor(data.mainImage).url()}
                alt={data.mainImage?.alt || 'Contact'}
                className="w-full h-full object-cover"
              />
            ) : (
              <img src="/placeholder-image.png" alt="Contact" className="w-full h-full object-cover" />
            )}
          </div>
          {/* ROW 6: Text (col-span-2) */}
          <div className="col-span-2 row-span-1 bg-[#F9F7F2] flex items-end justify-start">
            <p className="text-[1.2vh] text-gray-700">{data.contactFormIntro || "We’d love to connect. We just need to know:"}</p>
          </div>
          {/* ROWS 7-8: Contact Form (col-span-1-5) + Submit Button (col-6) */}
          <form className="col-span-5 row-span-2 bg-[#F9F7F2] flex flex-col justify-center p-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder={data.contactForm?.namePlaceholder || "Name and Surname"} className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2" required />
              <input name="email" value={form.email} onChange={handleChange} placeholder={data.contactForm?.emailPlaceholder || "Email"} type="email" className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder={data.contactForm?.phonePlaceholder || "Phone Number"} className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2" />
              <input name="company" value={form.company} onChange={handleChange} placeholder={data.contactForm?.companyPlaceholder || "Company"} className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2" />
              <input name="position" value={form.position} onChange={handleChange} placeholder={data.contactForm?.positionPlaceholder || "Position"} className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2" />
            </div>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder={data.contactForm?.messagePlaceholder || "Message"} className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2 mb-4 col-span-2" rows={4} required />
            {formStatus === 'sent' && <p className="text-green-600">Message sent!</p>}
            {formStatus === 'error' && <p className="text-red-600">Error sending message. Please try again.</p>}
          </form>
          <div className="col-span-1 row-span-2 bg-[#F9F7F2] flex items-start justify-end">
            <span
              role="button"
              tabIndex={0}
              onClick={() => document.querySelector('form')?.requestSubmit()}
              onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') document.querySelector('form')?.requestSubmit(); }}
              className="cursor-pointer text-[1.5vh] text-black font-semibold mt-4 mr-4 select-none underline"
            >
              Send
            </span>
          </div>

          {/* ROW 5: Keynote Title (cols 1-3) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div className="h-full w-full flex items-start justify-start">
              <div className="w-full max-w-full">
                <MainTitleAnimation 
                  text={data.bookingKeynote?.title || "Book a Keynote"}
                  typeSpeed={60}
                  delay={1500}
                  className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[6vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[6vh] font-bold leading-tight"
                />
              </div>
            </div>
          </div>

          {/* ROW 5: Empty (col 4) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div></div>
          </div>

          {/* ROW 5: Text + Link (cols 5-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div className="h-full w-full flex flex-col items-start justify-start">
              <p className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] mb-4">
                {data.bookingKeynote?.text || "Contact us to book a keynote speaker for your event."}
              </p>
              <Link
                href="/speakers"
                className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] underline hover:no-underline"
              >
                Visit Keynote Speakers Page
              </Link>
            </div>
          </div>

          {/* ROW 6: Keynote Subheading (cols 1-3) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div className="h-full w-full flex items-start justify-start">
              <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold">
                {data.keynoteSubheading || "Keynote Speakers"}
              </h2>
            </div>
          </div>

          {/* ROW 6: Empty (cols 4-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div></div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
