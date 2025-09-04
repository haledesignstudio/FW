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
import { getImageDimensions } from '@sanity/asset-utils';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

type ContactPageContent = {
  title: string;
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
      setIsMobile(window.innerWidth < 1080);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // state + helpers (put near your other state)
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
const captchaRef = useRef<ReCAPTCHA | null>(null);
const [captchaError, setCaptchaError] = useState<string | null>(null);


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
  // No errors → show captcha overlay and stop normal submit
  e.preventDefault();
  setTriedSubmit(false);
  setCaptchaError(null);
  setShowCaptcha(true);
};

const actuallySubmit = async (recaptchaToken: string) => {
  setFormStatus('sending');
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Include the token:
      body: JSON.stringify({ ...form, recaptchaToken }),
    });
    if (res.ok) {
      setFormStatus('sent');
    } else {
      setFormStatus('error');
    }
  } catch {
    setFormStatus('error');
  } finally {
    setShowCaptcha(false);
    // Optionally reset the captcha widget for next time:
    captchaRef.current?.reset();
  }
};

const onCaptchaChange = async (token: string | null) => {
  if (!token) {
    // The user closed it or it expired
    setCaptchaError('Please complete the verification to continue.');
    return;
  }
  await actuallySubmit(token);
};




  if (isMobile) {
    return (
      <>
        <Header />
        <main className="px-[4.53vw] py-[2.09vh] bg-[#F9F7F2]">
          <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh]">
            {/* Row 1: Main heading (cols 1-3) */}
            <div className="col-span-4 flex items-end justify-start">
              <FadeInOnVisible>
                <MainTitleAnimation
                  text={data.pageHeader.mainTitle}
                  typeSpeed={60}
                  delay={500}
                  className="dt-h2"
                />
              </FadeInOnVisible>
            </div>


            {/* Row 2: Subheading (cols 2-4) */}
            <div className="col-span-1 "></div>
            <div className="col-span-3 flex items-end justify-start">
              <FadeInOnVisible>
                <h2 className="dt-h3">{data.contactFormSubheading || 'Get in Touch'}</h2>
              </FadeInOnVisible>
            </div>

            {/* Row 3-4: Image (cols 1-4) */}
            <div className="col-span-4 row-span-2 flex items-center justify-center relative">
              <FadeInOnVisible>
                {data.mainImage?.asset ? (
                  <Image
                    src={urlFor(data.mainImage).quality(75).auto('format').url()}
                    width={getImageDimensions(data.mainImage).width}
                    height={getImageDimensions(data.mainImage).height}
                    alt={data.mainImage?.alt || 'Contact'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src="/placeholder-image.png"
                    alt="Contact"
                    className="w-full h-full object-cover"
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
            {/* MOBILE: Contact form — stacked, desktop-styled */}
            <div className="col-span-4 mt-[2vh]">
              <FadeInOnVisible>
                {/* MOBILE: Contact form — 4-column grid, message spans 3, submit in 4th */}
                <form
                  noValidate
                  onSubmit={onSubmitWithUI}
                  className="grid grid-cols-4 gap-x-[4.53vw] gap-y-[3vh]"
                >
                  {/* Name */}
                  <div className="relative col-span-4">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={`${data.contactForm?.namePlaceholder ?? "Name and Surname"} *`}
                      className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full ${triedSubmit && getError("name")}`}
                    />
                    <span
                      className={`pointer-events-none absolute -top-[2.5vh] left-0 rounded font-roboto text-[clamp(1.8vw,1.25vh,2.5vw)] py-[0.15vh] px-[0.7vh]
      bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("name") ? "opacity-100" : "opacity-0"}`}
                    >
                      {getError("name")}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="relative col-span-4">
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={`${data.contactForm?.emailPlaceholder ?? "Email"} *`}
                      className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full ${triedSubmit && getError("email")}`}
                    />
                    <span
                      className={`pointer-events-none absolute -top-[2.5vh] left-0 rounded font-roboto text-[clamp(1.8vw,1.25vh,2.5vw)] py-[0.15vh] px-[0.7vh]
      bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("email") ? "opacity-100" : "opacity-0"}`}
                    >
                      {getError("email")}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="relative col-span-4">
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={`${data.contactForm?.phonePlaceholder ?? "Phone Number"} *`}
                      className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full ${triedSubmit && getError("phone")}`}
                    />
                    <span
                      className={`pointer-events-none absolute -top-[2.5vh] left-0 rounded font-roboto text-[clamp(1.8vw,1.25vh,2.5vw)] py-[0.15vh] px-[0.7vh]
      bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("phone") ? "opacity-100" : "opacity-0"}`}
                    >
                      {getError("phone")}
                    </span>
                  </div>

                  {/* Company */}
                  <div className="relative col-span-4">
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={`${data.contactForm?.companyPlaceholder ?? "Company"} *`}
                      className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full ${triedSubmit && getError("company")}`}
                    />
                    <span
                      className={`pointer-events-none absolute -top-[2.5vh] left-0 rounded font-roboto text-[clamp(1.8vw,1.25vh,2.5vw)] py-[0.15vh] px-[0.7vh]
      bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("company") ? "opacity-100" : "opacity-0"}`}
                    >
                      {getError("company")}
                    </span>
                  </div>

                  {/* Position */}
                  <div className="relative col-span-4">
                    <input
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      placeholder={`${data.contactForm?.positionPlaceholder ?? "Position"} *`}
                      className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full ${triedSubmit && getError("position")}`}
                    />
                    <span
                      className={`pointer-events-none absolute -top-[2.5vh] left-0 rounded font-roboto text-[clamp(1.8vw,1.25vh,2.5vw)] py-[0.15vh] px-[0.7vh]
      bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("position") ? "opacity-100" : "opacity-0"}`}
                    >
                      {getError("position")}
                    </span>
                  </div>

                  {/* Message — span 3 cols */}
                  <div className="relative col-span-3 mt-[7vh]">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={`${data.contactForm?.messagePlaceholder ?? "Message"} *`}
                      rows={6}
                      className={`dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full resize-none ${triedSubmit && getError("message")}`}
                    />
                    <span
                      className={`pointer-events-none absolute -top-[2.5vh] left-0 rounded font-roboto text-[clamp(1.8vw,1.25vh,2.5vw)] py-[0.15vh] px-[0.7vh]
      bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("message") ? "opacity-100" : "opacity-0"}`}
                    >
                      {getError("message")}
                    </span>
                  </div>

                  {/* Submit — in 4th col, aligned to top/right */}
                  <div className="col-span-1 flex items-start justify-end mt-[7vh]">
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
                      <UnderlineOnHoverAnimation hasStaticUnderline>
                        {formStatus === "sent" ? "Sent!" : formStatus === "sending" ? "Sending…" : "Submit"}
                      </UnderlineOnHoverAnimation>
                    </button>
                  </div>

                  {/* Status row */}
                  {formStatus === "error" && (
                    <p className="col-span-4 text-red-600 text-[1.5vh]">
                      Error sending message. Please try again.
                    </p>
                  )}
                </form>

              </FadeInOnVisible>
            </div>

            {/* Row 12: Book a keynote heading (cols 1-3) */}
            <div className="col-span-4 flex items-end justify-start mt-[7vh]">
              <FadeInOnVisible>
                <MainTitleAnimation
                  text={data.bookingKeynote?.title || "Book a Keynote"}
                  typeSpeed={60}
                  delay={1500}
                  className="dt-h2"
                />
              </FadeInOnVisible>
            </div>
            <div className="col-span-4 row-span-1"></div>


            {/* Row 14: Keynote subheading (cols 2-4) */}
            <div className="col-span-1 row-span-1"></div>
            <div className="col-span-3 flex items-end justify-start">
              <FadeInOnVisible>
                <h2 className="dt-h3">
                  {data.keynoteSubheading || "Keynote Speakers"}
                </h2>
              </FadeInOnVisible>
            </div>

            {/* Row 15: Empty */}
            <div className="col-span-4 row-span-1"></div>

            {/* Row 16-17: Keynote section text (cols 1-4) */}
            <div className="col-span-4 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <p className="dt-body-sm">
                  {data.bookingKeynote?.text || "Contact us to book a keynote speaker for your event."}
                </p>
              </FadeInOnVisible>
            </div>

            {/* Row 18: Speaker link (cols 1-3) */}
            <div className="col-span-4 flex flex-col justify-end">
              <FadeInOnVisible>
                <Link
                  href="/keynotes"
                  className="dt-btn"
                >
                  <UnderlineOnHoverAnimation hasStaticUnderline>Find the right speaker for your executive team</UnderlineOnHoverAnimation>
                </Link>
              </FadeInOnVisible>
            </div>

            <div className="col-span-4 flex justify-end items-center cursor-pointer mt-[4vh]" onClick={handleBackToTop}>
              <FadeInOnVisible>
                <span className="dt-btn flex items-center">
                  <svg
                    width="clamp(3.5vw,2.35vh,4.7vw)"
                    height="clamp(3.5vw,2.35vh,4.7vw)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: 'rotate(-45deg)' }}
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                    Back to top
                  </UnderlineOnHoverAnimation>

                </span>
              </FadeInOnVisible>

            </div>
          </div>
          {showCaptcha && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    aria-modal="true"
    role="dialog"
  >
    <div className="bg-[#F9F7F2] rounded-2xl shadow-xl p-6 w-[min(92vw,480px)]">
      <h3 className="dt-h3 mb-4">Verification required</h3>
      <p className="dt-body-sm mb-4">
        Please confirm you’re not a robot to send your message.
      </p>

      <div className="mb-4">
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          onChange={onCaptchaChange}
          theme="light"
        />
      </div>

      {captchaError && (
        <p className="text-red-600 text-sm mb-2">{captchaError}</p>
      )}

      <div className="gap-3">
        <button
          type="button"
          className="dt-btn cursor-pointer"
          onClick={() => {
            setShowCaptcha(false);
            setCaptchaError(null);
            captchaRef.current?.reset();
          }}
        >
          <UnderlineOnHoverAnimation hasStaticUnderline={true}>Cancel</UnderlineOnHoverAnimation>
          
        </button>
      </div>
    </div>
  </div>
)}

        </main>
        <Footer />
      </>
    );
  }

  // Desktop layout (existing code)
  return (
    <>
      <Header />
      <main className="px-[4.53vw] py-[2.09vh] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
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
                  src={urlFor(data.mainImage).quality(75).auto('format').url()}
                  width={getImageDimensions(data.mainImage).width}
                  height={getImageDimensions(data.mainImage).height}
                  alt={data.mainImage?.alt || 'Contact'}
                  className="w-full h-full object-cover"
                />
              </FadeInOnVisible>
            ) : (
              <Image
                src="/placeholder-image.png"
                alt="Contact"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 1080px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
          {/* ROW 6: Text (col-span-2) */}
          <FadeInOnVisible className="col-span-2 row-span-1 bg-[#F9F7F2] flex items-end justify-start">
            <div className="col-span-2 row-span-1 bg-[#F9F7F2] flex items-end justify-start">
              <p className="dt-body-sm">{data.contactFormIntro || "We'd love to connect. We just need to know:"}</p>
            </div>
          </FadeInOnVisible>
          {/* ROWS 7-8: Contact Form with 6-column grid layout */}

          <FadeInOnVisible className="col-span-6 row-span-2 bg-[#F9F7F2] grid grid-cols-6 gap-x-[1.795vw] gap-y-[3.2vh]">
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
          bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity
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
          bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity
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
          bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("phone") ? "opacity-100" : "opacity-0"}`}>
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
          bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("company") ? "opacity-100" : "opacity-0"}`}>
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
          bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("position") ? "opacity-100" : "opacity-0"}`}>
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
          bg-[#DC5A50] text-[#F9F7F2] shadow transition-opacity ${triedSubmit && getError("message") ? "opacity-100" : "opacity-0"}`}>
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
          </FadeInOnVisible>


          {/* ROW 5: Keynote Title (cols 1-3) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:1080px)]:col-span-4 [@media(max-height:600px)_and_(max-width:1080px)]:row-span-1 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:row-span-1">
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

          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:1080px)]:col-span-4 [@media(max-height:600px)_and_(max-width:1080px)]:row-span-1 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:col-span-1 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div></div>
          </div>

          {/* ROW 5: Text + Link (cols 5-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:1080px)]:col-span-4 [@media(max-height:600px)_and_(max-width:1080px)]:row-span-1 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:col-span-2 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div className="col-span-1 row-span-1 h-full flex flex-col justify-between">
              <FadeInOnVisible>
                <p className="dt-body-sm">
                  {data.bookingKeynote?.text || "Contact us to book a keynote speaker for your event."}
                </p>
              </FadeInOnVisible>
              <Link
                href="/keynotes"
                className="dt-btn"
              >
                <FadeInOnVisible>
                  <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                    Find the right speaker for your executive team
                  </UnderlineOnHoverAnimation>
                </FadeInOnVisible>
              </Link>
            </div>
          </div>

          {/* ROW 6: Keynote Subheading (cols 1-3) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:1080px)]:col-span-4 [@media(max-height:600px)_and_(max-width:1080px)]:row-span-1 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div className="h-full w-full flex items-start justify-start">
              <FadeInOnVisible>
                <h2 className="dt-h3">
                  {data.keynoteSubheading || "Keynote Speakers"}
                </h2>
              </FadeInOnVisible>
            </div>
          </div>

          {/* ROW 6: Empty (cols 4-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:1080px)]:col-span-4 [@media(max-height:600px)_and_(max-width:1080px)]:row-span-1 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:row-span-1">
            <div></div>
          </div>

        </div >
        {showCaptcha && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    aria-modal="true"
    role="dialog"
  >
    <div className="bg-[#F9F7F2] rounded-2xl shadow-xl p-6 w-[min(92vw,480px)]">
      <h3 className="dt-h3 mb-4">Verification required</h3>
      <p className="dt-body-sm mb-4">
        Please confirm you’re not a robot to send your message.
      </p>

      <div className="mb-4">
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          onChange={onCaptchaChange}
          theme="light"
        />
      </div>

      {captchaError && (
        <p className="text-red-600 text-sm mb-2">{captchaError}</p>
      )}

      <div className="gap-3">
        <button
          type="button"
          className="dt-btn cursor-pointer"
          onClick={() => {
            setShowCaptcha(false);
            setCaptchaError(null);
            captchaRef.current?.reset();
          }}
        >
          <UnderlineOnHoverAnimation hasStaticUnderline={true}>Cancel</UnderlineOnHoverAnimation>
        </button>
      </div>
    </div>
  </div>
)}

      </main >
      <Footer />
    </>
  );
}
