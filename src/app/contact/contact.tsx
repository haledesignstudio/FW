'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
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
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // state + helpers (put near your other state)
  const [triedSubmit, setTriedSubmit] = useState(false);

  // length limits (tweak as you like)
  const LIMITS = {
    name: { min: 2, max: 80 },
    email: { min: 5, max: 120 },
    phone: { min: 7, max: 15 },   // digits count (E.164 up to 15)
    company: { min: 2, max: 100 },
    position: { min: 2, max: 100 },
    message: { min: 10, max: 2000 },
  };

  const len = (v = "") => v.trim().length;
  const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  // Allow spaces, dashes, parentheses, etc., but validate digit count 7–15
  const isValidPhone = (v: string) => {
    const digits = v.replace(/\D/g, "");
    return digits.length >= LIMITS.phone.min && digits.length <= LIMITS.phone.max;
  };

  function getError(name: string) {
    switch (name) {
      case "name":
        if (!len(form.name)) return "Required";
        if (len(form.name) > LIMITS.name.max) return `Max ${LIMITS.name.max} characters`;
        return "";
      case "email":
        if (!len(form.email)) return "Required";
        if (!isEmail(form.email)) return "Enter a valid email";
        return "";
      case "phone":
        if (!len(form.phone)) return "Required";
        if (!isValidPhone(form.phone)) return "Enter a valid phone number (7–15 digits)";
        return "";
      case "company":
        if (!len(form.company)) return "Required";
        if (len(form.company) > LIMITS.company.max) return `Max ${LIMITS.company.max} characters`;
        return "";
      case "position":
        if (!len(form.position)) return "Required";
        if (len(form.position) > LIMITS.position.max) return `Max ${LIMITS.position.max} characters`;
        return "";
      case "message":
        if (!len(form.message)) return "Required";
        if (len(form.message) > LIMITS.message.max) return `Max ${LIMITS.message.max} characters`;
        return "";
      default:
        return "";
    }
  }


  // in your submit handler, prevent submit if invalid and show tooltips
  const onSubmitWithUI: React.FormEventHandler<HTMLFormElement> = (e) => {
    const hasErrors = !!(
      getError("name") ||
      getError("email") ||
      getError("phone") ||
      getError("company") ||
      getError("position") ||
      getError("message")
    );
    if (hasErrors) {
      e.preventDefault();
      setTriedSubmit(true);
      return;
    }
    setTriedSubmit(false);
    handleSubmit(e);
  };





  if (isMobile) {
    return (
      <>
        <Header />
        <main className="p-[2vh] bg-[#F9F7F2]">
          <div className="grid grid-cols-4 gap-y-2 auto-rows-[12.5vh]">
            {/* Row 1: Main heading (cols 1-3) */}
            <div className="col-span-3 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <MainTitleAnimation
                  text={data.pageHeader.mainTitle}
                  typeSpeed={60}
                  delay={500}
                  className="dt-h2"
                />
              </FadeInOnVisible>
            </div>
            <div className="col-span-1 row-span-1"></div>

            {/* Row 2: Subheading (cols 2-4) */}
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-3 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <h2 className="dt-h3">{data.contactFormSubheading || 'Get in Touch'}</h2>
              </FadeInOnVisible>
            </div>

            {/* Row 3-4: Image (cols 1-4) */}
            <div className="col-span-4 row-span-2 flex items-center justify-center relative">
              <FadeInOnVisible>
                {data.mainImage?.asset ? (
                  <Image
                    src={urlFor(data.mainImage).url()}
                    alt={data.mainImage?.alt || 'Contact'}
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <Image
                    src="/placeholder-image.png"
                    alt="Contact"
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </FadeInOnVisible>
            </div>

            {/* Row 5: Form header (cols 1-4) */}
            <div className="col-span-4 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <p className="dt-body-sm text-gray-700">{data.contactFormIntro || "We'd love to connect. We just need to know:"}</p>
              </FadeInOnVisible>
            </div>

            {/* Row 6-8: Form fields (cols 1-3) - Reduced from 4 rows to 3 rows */}
            <div className="col-span-3 row-span-3">
              <FadeInOnVisible>
                <form onSubmit={handleSubmit} className="h-full flex flex-col justify-start gap-[1vh]">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={data.contactForm?.namePlaceholder || "Name and Surname"}
                    className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2 text-[2vh]"
                    required
                  />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={data.contactForm?.emailPlaceholder || "Email"}
                    type="email"
                    className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2 text-[2vh]"
                    required
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={data.contactForm?.phonePlaceholder || "Phone Number"}
                    className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2 text-[2vh]"
                  />
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder={data.contactForm?.companyPlaceholder || "Company"}
                    className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2 text-[2vh]"
                  />
                  <input
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    placeholder={data.contactForm?.positionPlaceholder || "Position"}
                    className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2 text-[2vh]"
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={data.contactForm?.messagePlaceholder || "Message"}
                    className="bg-transparent border-b border-gray-400 text-gray-700 placeholder-gray-400 focus:outline-none py-2 text-[2vh] resize-none"
                    rows={3}
                    required
                  />
                  {formStatus === 'sent' && <p className="text-green-600 text-[1.5vh]">Message sent!</p>}
                  {formStatus === 'error' && <p className="text-red-600 text-[1.5vh]">Error sending message. Please try again.</p>}
                </form>
              </FadeInOnVisible>
            </div>

            {/* Row 6-8: Empty space (col 4) to align with form */}
            <div className="col-span-1 row-span-3"></div>

            {/* Row 9: Submit button (col 4) */}
            <div className="col-span-3 row-span-1"></div>
            <div className="col-span-1 row-span-1 flex items-start justify-end">
              <FadeInOnVisible>
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  <button
                    type="submit"
                    onClick={() => document.querySelector('form')?.requestSubmit()}
                    className="dt-btn bg-transparent border-none outline-none cursor-pointer"
                  >
                    Submit
                  </button>
                </UnderlineOnHoverAnimation>
              </FadeInOnVisible>
            </div>

            {/* Row 10-11: Empty */}
            <div className="col-span-4 row-span-2"></div>

            {/* Row 12: Book a keynote heading (cols 1-3) */}
            <div className="col-span-3 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <MainTitleAnimation
                  text={data.bookingKeynote?.title || "Book a Keynote"}
                  typeSpeed={60}
                  delay={1500}
                  className="dt-h2"
                />
              </FadeInOnVisible>
            </div>
            <div className="col-span-1 row-span-1"></div>

            {/* Row 13: Empty */}
            <div className="col-span-4 row-span-1"></div>

            {/* Row 14: Keynote subheading (cols 2-4) */}
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-3 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <h2 className="dt-h3">
                  {data.keynoteSubheading || "Keynote Speakers"}
                </h2>
              </FadeInOnVisible>
            </div>

            {/* Row 15: Empty */}
            <div className="col-span-4 row-span-1"></div>

            {/* Row 16-17: Keynote section text (cols 1-4) */}
            <div className="col-span-4 row-span-2 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <p className="dt-body-sm text-gray-700">
                  {data.bookingKeynote?.text || "Contact us to book a keynote speaker for your event."}
                </p>
              </FadeInOnVisible>
            </div>

            {/* Row 18: Speaker link (cols 1-3) */}
            <div className="col-span-4 row-span-1  items-center justify-start">
              <FadeInOnVisible>
                <Link
                  href="/keynotes"
                  className="dt-btn underline hover:no-underline"
                >
                  Find the right speaker for your executive team
                </Link>
              </FadeInOnVisible>
            </div>
            <div className="col-span-1 row-span-1"></div>

            {/* Row 19: Back to top button (col 4) */}
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-2 row-span-1 flex justify-end items-center cursor-pointer" onClick={handleBackToTop}>
              <FadeInOnVisible>
                <span className="underline dt-btn flex items-center gap-1 font-bold">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: 'rotate(-45deg)' }}
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  Back to top
                </span>
              </FadeInOnVisible>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Desktop layout (existing code)
  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] grid-cols-6 auto-rows-[12.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
          {/* ROW 2: Main Title (col-span-3) + Subheading (col-span-3) */}
          <div className="col-span-3 row-span-1 flex items-start bg-[#F9F7F2]">
            <MainTitleAnimation
              text={data.pageHeader.mainTitle}
              typeSpeed={60}
              delay={500}
              className="dt-h2"
            />
          </div>
          <FadeInOnVisible className="col-span-3 row-span-1 flex items-start">
            <div className="col-span-3 row-span-1 flex items-start text-balance bg-[#F9F7F2]">
              <h2 className="dt-h3">{data.contactFormSubheading || 'Get in Touch'}</h2>
            </div>
          </FadeInOnVisible>
          {/* ROWS 3-5: Image (col-span-6) */}
          <div className="col-span-6 row-span-3 bg-[#F9F7F2] flex items-center justify-center relative">
            {data.mainImage?.asset ? (
              <FadeInOnVisible className="w-full h-full object-cover">
                <Image
                  src={urlFor(data.mainImage).url()}
                  alt={data.mainImage?.alt || 'Contact'}
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </FadeInOnVisible>
            ) : (
              <Image
                src="/placeholder-image.png"
                alt="Contact"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
          {/* ROW 6: Text (col-span-2) */}
          <div className="col-span-2 row-span-1 bg-[#F9F7F2] flex items-end justify-start">
            <p className="dt-body-sm">{data.contactFormIntro || "We'd love to connect. We just need to know:"}</p>
          </div>
          {/* ROWS 7-8: Contact Form with 6-column grid layout */}
          <form
            noValidate
            onSubmit={onSubmitWithUI}
            className="col-span-6 row-span-2 bg-[#F9F7F2] grid grid-cols-6 gap-x-[1.795vw] gap-y-[3.2vh]"
          >
            {/* Left column: the 5 contact fields (spans 2 cols) */}
            <div className="col-span-2 flex flex-col space-y-[3.2vh]">
              {/* Name */}
              <div className="relative">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={`${data.contactForm?.namePlaceholder ?? "Name and Surname"} *`}
                  className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full
          ${triedSubmit && getError("name")}`}
                />
                {/* tooltip */}
                <span
                  className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
          bg-[#DC5A50] text-white shadow transition-opacity
          ${triedSubmit && getError("name") ? "opacity-100" : "opacity-0"}`}
                >
                  {getError("name")}
                </span>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={`${data.contactForm?.emailPlaceholder ?? "Email"} *`}
                  className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full
          ${triedSubmit && getError("email")}`}
                />
                <span
                  className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
          bg-[#DC5A50] text-white shadow transition-opacity
          ${triedSubmit && getError("email") ? "opacity-100" : "opacity-0"}`}
                >
                  {getError("email")}
                </span>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={`${data.contactForm?.phonePlaceholder ?? "Phone Number"} *`}
                  className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full
          ${triedSubmit && getError("phone")}`}
                />
                <span className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
          bg-[#DC5A50] text-white shadow transition-opacity ${triedSubmit && getError("phone") ? "opacity-100" : "opacity-0"}`}>
                  {getError("phone")}
                </span>
              </div>

              {/* Company */}
              <div className="relative">
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder={`${data.contactForm?.companyPlaceholder ?? "Company"} *`}
                  className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full
          ${triedSubmit && getError("company")}`}
                />
                <span className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
          bg-[#DC5A50] text-white shadow transition-opacity ${triedSubmit && getError("company") ? "opacity-100" : "opacity-0"}`}>
                  {getError("company")}
                </span>
              </div>

              {/* Position */}
              <div className="relative">
                <input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder={`${data.contactForm?.positionPlaceholder ?? "Position"} *`}
                  className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full
          ${triedSubmit && getError("position")}`}
                />
                <span className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
          bg-[#DC5A50] text-white shadow transition-opacity ${triedSubmit && getError("position") ? "opacity-100" : "opacity-0"}`}>
                  {getError("position")}
                </span>
              </div>
            </div>

            {/* Message (spans next 3 cols) */}
            <div className="col-span-3 flex flex-col">
              <div className="relative h-full">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={`${data.contactForm?.messagePlaceholder ?? "Message"} *`}
                  className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none h-full w-full resize-none
          ${triedSubmit && getError("message")}`}
                />
                <span className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
          bg-[#DC5A50] text-white shadow transition-opacity ${triedSubmit && getError("message") ? "opacity-100" : "opacity-0"}`}>
                  {getError("message")}
                </span>
              </div>
            </div>

            {/* Submit (final col) */}
            <div className="col-span-1 flex items-start justify-end">
              <button
                type="submit"
                disabled={formStatus === "sent" || formStatus === "sending"}
                tabIndex={0}
                onClick={() => document.querySelector("form")?.requestSubmit()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") document.querySelector("form")?.requestSubmit();
                }}
                className="dt-btn cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-default"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline>{formStatus === "sent" ? "Sent!" : formStatus === "sending" ? "Sending…" : "Submit"}</UnderlineOnHoverAnimation>
              </button>
            </div>
            {/* Status messages */}
              <div className="">
                {formStatus === "error" && <p className="text-red-600">Error sending message. Please try again.</p>}
              </div>
          </form>

          
          {/* ROW 5: Keynote Title (cols 1-3) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div className="h-full w-full flex items-start justify-start">
              <div id="book-keynote" className="w-full max-w-full">
                <MainTitleAnimation
                  text={data.bookingKeynote?.title || "Book a Keynote"}
                  typeSpeed={60}
                  delay={1500}
                  className="dt-h2"
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
            <div className="col-span-1 row-span-1 h-full flex flex-col justify-between">
              <p className="dt-body-sm">
                {data.bookingKeynote?.text || "Contact us to book a keynote speaker for your event."}
              </p>
              <Link
                href="/keynotes#speakers"
                className="dt-btn"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  Find the right speaker for your executive team
                </UnderlineOnHoverAnimation>
              </Link>
            </div>
          </div>

          {/* ROW 6: Keynote Subheading (cols 1-3) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div className="h-full w-full flex items-start justify-start">
              <h2 className="dt-h3">
                {data.keynoteSubheading || "Keynote Speakers"}
              </h2>
            </div>
          </div>

          {/* ROW 6: Empty (cols 4-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div></div>
          </div>

        </div >
      </main >
      <Footer />
    </>
  );
}
