'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import MainTitleAnimation from '@/components/MainTitleAnimation';

type Props = {
  jobTitles: string[];
};

export default function ApplyView({ jobTitles }: Props) {
  // ----- Form state -----
  const [form, setForm] = useState({
    jobTitle: '',
    name: '',
    email: '',
    confirmEmail: '',  // must match email
    phone: '',
    location: '',      // Location (your city)
    linkedIn: '',      // LinkedIn URL (optional by itself)
    message: '',
  });
  const [resume, setResume] = useState<File | null>(null); // resume file
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [triedSubmit, setTriedSubmit] = useState(false);

  // File input ref (for the "Choose file" button)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ----- Mobile check -----
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ----- File constraints -----
  const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB
  const ALLOWED_MIME = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

  // ----- Handlers -----
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setResume(null);
      return;
    }

    // type check (by mime and extension, to cover browser quirks)
    const ext = file.name.toLowerCase().split('.').pop();
    const typeOk = ALLOWED_MIME.includes(file.type);
    const extOk = ext ? ALLOWED_EXT.includes(ext) : false;
    if (!typeOk && !extOk) {
      alert('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      e.target.value = '';
      setResume(null);
      return;
    }

    // size check
    if (file.size > MAX_FILE_BYTES) {
      alert('File is too large. Maximum size is 20MB.');
      e.target.value = '';
      setResume(null);
      return;
    }

    setResume(file);
  };

  // ----- Validation -----
  const LIMITS = {
    name: { min: 2, max: 80 },
    email: { min: 5, max: 120 },
    phone: { min: 7, max: 15 },
    location: { min: 2, max: 100 },
    message: { min: 10, max: 2000 },
  };

  const len = (v = '') => v.trim().length;
  const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);
  const isValidPhone = (v: string) => {
    const digits = v.replace(/\D/g, '');
    return digits.length >= LIMITS.phone.min && digits.length <= LIMITS.phone.max;
  };
  const isURL = (v: string) => {
    try {
      const u = new URL(v);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };
  const emailsMatch = () =>
    form.email.trim().toLowerCase() === form.confirmEmail.trim().toLowerCase();

  function getError(name: string) {
    switch (name) {
      case 'jobTitle':
        if (!form.jobTitle) return 'Please select a vacancy';
        if (!jobTitles.includes(form.jobTitle)) return 'Invalid job title';
        return '';
      case 'name':
        if (!len(form.name)) return 'Required';
        if (len(form.name) > LIMITS.name.max) return `Max ${LIMITS.name.max} characters`;
        return '';
      case 'email':
        if (!len(form.email)) return 'Required';
        if (!isEmail(form.email)) return 'Enter a valid email';
        return '';
      case 'confirmEmail':
        if (!len(form.confirmEmail)) return 'Required';
        if (!isEmail(form.confirmEmail)) return 'Enter a valid email';
        if (!emailsMatch()) return 'Emails must match';
        return '';
      case 'phone':
        if (!len(form.phone)) return 'Required';
        if (!isValidPhone(form.phone)) return 'Enter a valid phone number (7–15 digits)';
        return '';
      case 'location':
        if (!len(form.location)) return 'Required';
        if (len(form.location) > LIMITS.location.max) return `Max ${LIMITS.location.max} characters`;
        return '';
      case 'linkedIn': {
        // Cross-field rule: must have LinkedIn OR resume
        if (!form.linkedIn && !resume) return 'Provide a LinkedIn URL or upload a file';
        if (form.linkedIn && !isURL(form.linkedIn)) return 'Enter a valid URL';
        return '';
      }
      case 'resume': {
        // Cross-field rule mirror so error can also show near the file button
        return '';
      }
      case 'message':
        if (!len(form.message)) return 'Required';
        if (len(form.message) > LIMITS.message.max) return `Max ${LIMITS.message.max} characters`;
        return '';
      default:
        return '';
    }
  }

  const onSubmitWithUI: React.FormEventHandler<HTMLFormElement> = (e) => {
    const hasErrors = !!(
      getError('jobTitle') ||
      getError('name') ||
      getError('email') ||
      getError('confirmEmail') ||
      getError('phone') ||
      getError('location') ||
      getError('linkedIn') ||  // cross-field requirement
      getError('resume')   ||  // cross-field requirement
      getError('message')
    );
    if (hasErrors) {
      e.preventDefault();
      setTriedSubmit(true);
      return;
    }
    setTriedSubmit(false);
    handleSubmit(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      // Build FormData so we can include the file
      const fd = new FormData();
      fd.append('jobTitle', form.jobTitle);
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('confirmEmail', form.confirmEmail);
      fd.append('phone', form.phone);
      fd.append('location', form.location);
      fd.append('linkedIn', form.linkedIn);
      fd.append('message', form.message);
      if (resume) fd.append('resume', resume);

      const res = await fetch('/api/apply', {
        method: 'POST',
        body: fd, // DO NOT set Content-Type; browser adds proper multipart boundary
      });

      if (res.ok) {
        setFormStatus('sent');
        setForm({
          jobTitle: '',
          name: '',
          email: '',
          confirmEmail: '',
          phone: '',
          location: '',
          linkedIn: '',
          message: '',
        });
        setResume(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  // =========================
  // MOBILE LAYOUT
  // =========================
  if (isMobile) {
    return (
      <>
        <Header />
        <main className="p-[2vh] bg-[#F9F7F2]">
          <div className="grid grid-cols-4 gap-y-2 auto-rows-[12.5vh]">
            {/* Heading */}
            <div className="col-span-4 row-span-1 flex items-end">
              <FadeInOnVisible>
                <h1 className="dt-h2">Apply</h1>
              </FadeInOnVisible>
            </div>

            {/* Subheading */}
            <div className="col-span-4 row-span-1 flex items-end">
              <FadeInOnVisible>
                <h2 className="dt-h3">Pick a role &amp; tell us more</h2>
              </FadeInOnVisible>
            </div>

            {/* Intro */}
            <div className="col-span-4 row-span-1 flex items-end">
              <FadeInOnVisible>
                <p className="dt-body-sm text-gray-700">We&apos;d love to connect. We just need to know:</p>
              </FadeInOnVisible>
            </div>

            {/* Form */}
            <div className="col-span-4 row-span-3">
              <FadeInOnVisible>
                <form noValidate onSubmit={onSubmitWithUI} className="flex flex-col gap-[1.6vh]">
                  {/* Job Title (select) */}
                  <div className="flex flex-col">
                    <label className="dt-body-sm mb-[0.6vh]" htmlFor="jobTitle">Job Title *</label>
                    <select
                      id="jobTitle"
                      name="jobTitle"
                      value={form.jobTitle}
                      onChange={handleChange}
                      className={`bg-transparent border-b border-gray-400 py-2 text-[2vh] focus:outline-none appearance-none
                        ${form.jobTitle === '' ? 'text-gray-300' : 'text-black'}`}
                      aria-invalid={!!(triedSubmit && getError('jobTitle'))}
                      aria-describedby="err-jobTitle"
                    >
                      <option value="" disabled>Select a vacancy *</option>
                      {jobTitles.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {triedSubmit && getError('jobTitle') && (
                      <p id="err-jobTitle" className="text-red-600 text-[1.5vh]">{getError('jobTitle')}</p>
                    )}
                  </div>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name and Surname *"
                    className="bg-transparent border-b border-gray-400 py-2 text-[2vh] focus:outline-none"
                  />
                  {triedSubmit && getError('name') && <p className="text-red-600 text-[1.5vh]">{getError('name')}</p>}

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    className="bg-transparent border-b border-gray-400 py-2 text-[2vh] focus:outline-none"
                  />
                  {triedSubmit && getError('email') && <p className="text-red-600 text-[1.5vh]">{getError('email')}</p>}

                  <input
                    name="confirmEmail"
                    type="email"
                    value={form.confirmEmail}
                    onChange={handleChange}
                    placeholder="Confirm email *"
                    className="bg-transparent border-b border-gray-400 py-2 text-[2vh] focus:outline-none"
                  />
                  {triedSubmit && getError('confirmEmail') && <p className="text-red-600 text-[1.5vh]">{getError('confirmEmail')}</p>}

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    className="bg-transparent border-b border-gray-400 py-2 text-[2vh] focus:outline-none"
                  />
                  {triedSubmit && getError('phone') && <p className="text-red-600 text-[1.5vh]">{getError('phone')}</p>}

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location (your city) *"
                    className="bg-transparent border-b border-gray-400 py-2 text-[2vh] focus:outline-none"
                  />
                  {triedSubmit && getError('location') && <p className="text-red-600 text-[1.5vh]">{getError('location')}</p>}

                  <p className="dt-body-sm text-gray-700 mt-[1vh]">Please share your LinkedIn profile or upload your resume/CV.</p>

                  {/* LinkedIn URL */}
                  <input
                    name="linkedIn"
                    type="url"
                    value={form.linkedIn}
                    onChange={handleChange}
                    placeholder="LinkedIn profile"
                    className="bg-transparent border-b border-gray-400 py-2 text-[2vh] focus:outline-none"
                  />
                  {triedSubmit && getError('linkedIn') && <p className="text-red-600 text-[1.5vh]">{getError('linkedIn')}</p>}

                  {/* File upload button */}
                  <div className="flex items-center justify-between">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={handleFileClick}
                      className="dt-btn underline hover:no-underline"
                    >
                      {resume ? resume.name : 'Choose file'}
                    </button>
                  </div>
                  {/* Error under file control (cross-field rule) */}
                  {triedSubmit && getError('resume') && (
                    <p className="dt-body-sm text-red-600">{getError('resume')}</p>
                  )}

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message *"
                    rows={3}
                    className="bg-transparent border-b border-gray-400 py-2 text-[2vh] resize-none focus:outline-none"
                  />
                  {triedSubmit && getError('message') && <p className="text-red-600 text-[1.5vh]">{getError('message')}</p>}
                </form>
              </FadeInOnVisible>
            </div>

            {/* Submit */}
            <div className="col-span-4 row-span-1 flex items-start justify-end">
              <FadeInOnVisible>
                <UnderlineOnHoverAnimation hasStaticUnderline>
                  <button
                    type="submit"
                    onClick={() => document.querySelector('form')?.requestSubmit()}
                    className="dt-btn bg-transparent border-none outline-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    disabled={formStatus === 'sent' || formStatus === 'sending'}
                  >
                    {formStatus === 'sent' ? 'Sent!' : formStatus === 'sending' ? 'Sending…' : 'Submit'}
                  </button>
                </UnderlineOnHoverAnimation>
              </FadeInOnVisible>
            </div>

            {/* Status */}
            <div className="col-span-4 row-span-1">
              {formStatus === 'error' && <p className="text-red-600 text-[1.6vh]">Error submitting Application. Please try again.</p>}
              {formStatus === 'sent' && <p className="text-green-600 text-[1.6vh]">Message sent!</p>}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // =========================
  // DESKTOP LAYOUT
  // =========================
  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] grid-cols-6 auto-rows-[12.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
          {/* Headings */}
          <div className="col-span-3 row-span-1 flex items-start">
            <MainTitleAnimation
              text="Application Form"
              typeSpeed={60}
              delay={500}
              className="dt-h2"
            />
          </div>
          <FadeInOnVisible className="col-span-3 row-span-1 flex items-start">
            <></>
          </FadeInOnVisible>

          {/* Intro */}
          <FadeInOnVisible className="col-span-2 row-span-1 flex items-end">
            <p className="dt-body-sm">We just need to know:</p>
          </FadeInOnVisible>
          <FadeInOnVisible className="col-span-2 row-span-1 flex items-end">
            <p className="dt-body-sm">What about Futureworld interests you — why do you want to join our team?</p>
          </FadeInOnVisible>

          {/* Form */}
          <FadeInOnVisible className="col-span-6 row-span-4 grid grid-cols-6 gap-x-[1.795vw] gap-y-[3.2vh]">
            <form
              noValidate
              onSubmit={onSubmitWithUI}
              className="col-span-6 row-span-4 grid grid-cols-6 gap-x-[1.795vw] gap-y-[3.2vh]"
            >
              {/* Left column (fields + select) */}
              <div className="col-span-2 flex flex-col space-y-[3.2vh]">
                {/* Job Title */}
                <div className="relative">
                  <select
                    id="jobTitle"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    className={`dt-h3 bg-transparent w-full focus:outline-none appearance-none
                      ${form.jobTitle === '' ? 'text-gray-300' : 'text-black'}`}
                    aria-invalid={!!(triedSubmit && getError('jobTitle'))}
                  >
                    <option value="" disabled>Select a vacancy *</option>
                    {jobTitles.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <span
                    className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
                      bg-[#DC5A50] text-white shadow transition-opacity
                      ${triedSubmit && getError('jobTitle') ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {getError('jobTitle')}
                  </span>
                </div>

                {(['name', 'email', 'confirmEmail', 'phone', 'location'] as const).map((field) => (
                  <div className="relative" key={field}>
                    <input
                      name={field}
                      type={field === 'email' || field === 'confirmEmail' ? 'email' : 'text'}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={{
                        name: 'Name and Surname *',
                        email: 'Email *',
                        confirmEmail: 'Confirm email *',
                        phone: 'Phone Number *',
                        location: 'Location (your city) *',
                      }[field]}
                      className="dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full"
                      aria-invalid={!!(triedSubmit && getError(field))}
                    />
                    <span
                      className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
                        bg-[#DC5A50] text-white shadow transition-opacity
                        ${triedSubmit && getError(field) ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {getError(field)}
                    </span>
                  </div>
                ))}

                <div className="col-span-2 row-span-1 flex items-end mt-[14vh]">
                  <p className="dt-body-sm">Please share your LinkedIn profile or upload your resume/CV.</p>
                </div>

                {/* LinkedIn URL (under Location) */}
                <div className="relative">
                  <input
                    name="linkedIn"
                    type="url"
                    value={form.linkedIn}
                    onChange={handleChange}
                    placeholder="LinkedIn profile"
                    className="dt-h3 bg-transparent placeholder-gray-300 focus:outline-none w-full"
                    aria-invalid={!!(triedSubmit && getError('linkedIn'))}
                  />
                  <span
                    className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
                      bg-[#DC5A50] text-white shadow transition-opacity
                      ${triedSubmit && getError('linkedIn') ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {getError('linkedIn')}
                  </span>
                </div>

                {/* File upload button */}
                <div className="flex items-center justify-between">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={handleFileClick}
                    className="dt-btn underline hover:no-underline"
                  >
                    {resume ? resume.name : 'Choose file'}
                  </button>
                </div>
                {/* Error under file control (cross-field rule) */}
                {triedSubmit && getError('resume') && (
                  <p className="dt-body-sm text-red-600">{getError('resume')}</p>
                )}
              </div>

              {/* Message */}
              <div className="col-span-3 flex flex-col">
                <div className="relative h-full">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message *"
                    className="dt-h3 bg-transparent placeholder-gray-300 focus:outline-none h-full w-full resize-none"
                    aria-invalid={!!(triedSubmit && getError('message'))}
                  />
                  <span
                    className={`pointer-events-none absolute -top-[2vh] left-0 rounded font-roboto text-[clamp(0.25vw,1vh,0.5vw)] py-[0.35vh] px-[0.8vh]
                      bg-[#DC5A50] text-white shadow transition-opacity
                      ${triedSubmit && getError('message') ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {getError('message')}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="col-span-1 flex items-start justify-end">
                <button
                  type="submit"
                  disabled={formStatus === 'sent' || formStatus === 'sending'}
                  tabIndex={0}
                  onClick={() => document.querySelector('form')?.requestSubmit()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') document.querySelector('form')?.requestSubmit();
                  }}
                  className="dt-btn cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  <UnderlineOnHoverAnimation hasStaticUnderline>
                    {formStatus === 'sent' ? 'Sent!' : formStatus === 'sending' ? 'Sending…' : 'Submit'}
                  </UnderlineOnHoverAnimation>
                </button>
              </div>

              {/* Status */}
              <div className="col-span-6">
                {formStatus === 'error' && <p className="text-red-600">Error submitting Application. Please try again.</p>}
                {formStatus === 'sent' && <p className="text-green-700">Message sent!</p>}
              </div>
            </form>
          </FadeInOnVisible>
        </div>
      </main>
      <Footer />
    </>
  );
}
