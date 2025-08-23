'use client';

import React, { useState, useEffect, useRef } from "react";
import { FutureText } from "./FutureText";
import UnderlineOnHoverAnimation from "./underlineOnHoverAnimation"; 
import Link from 'next/link';


type GridItem = {
    id: number;
    content: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    mobileColSpan?: number;
    mobileRowSpan?: number;
    landscapeColSpan?: number;
    landscapeRowSpan?: number;
};

const Footer: React.FC = () => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [placeholder, setPlaceholder] = useState('');
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (footerRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !shouldAnimate) {
                            setShouldAnimate(true);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -10% 0px'
                }
            );

            observer.observe(footerRef.current);

            return () => observer.disconnect();
        }
    }, [shouldAnimate]);

    // Create items function inside component to access hooks
    const items = (shouldAnimate: boolean): GridItem[] => [
        {
            id: 1,
            content: (
                <p className="dt-h5">
                    {shouldAnimate ? (
                        <FutureText text="Social" delay={0} speed={50} triggerOnVisible={false} />
                    ) : (
                        "Social"
                    )}
                </p>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 2,
            content: (
                <ul className="text-[clamp(0.5vw,1.48vh,0.74vw)] font-roboto leading-[clamp(0.7vw,1.85vh,0.0.925vw)]">
                    <li><a href="https://www.google.com">{shouldAnimate ? <FutureText text="RSS" delay={1000} speed={30} triggerOnVisible={false} /> : "RSS"}</a></li>
                    <li><a href="https://www.openai.com">{shouldAnimate ? <FutureText text="Instagram" delay={1000} speed={30} triggerOnVisible={false} /> : "Instagram"}</a></li>
                    <li><a href="https://www.github.com">{shouldAnimate ? <FutureText text="Twitter" delay={1000} speed={30} triggerOnVisible={false} /> : "Twitter"}</a></li>
                    <li><a href="https://www.github.com">{shouldAnimate ? <FutureText text="Facebook" delay={1000} speed={30} triggerOnVisible={false} /> : "Facebook"}</a></li>
                    <li><a href="https://www.github.com">{shouldAnimate ? <FutureText text="Linkedin" delay={1000} speed={30} triggerOnVisible={false} /> : "Linkedin"}</a></li>
                    <li><a href="https://www.github.com">{shouldAnimate ? <FutureText text="Discord" delay={1000} speed={30} triggerOnVisible={false} /> : "Discord"}</a></li>
                </ul>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        {
            id: 3,
            content: (
                <h2 className="dt-h5">
                    {shouldAnimate ? (
                        <FutureText text="Quick Links" delay={2000} speed={30} triggerOnVisible={false} />
                    ) : (
                        "Quick Links"
                    )}
                </h2>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 2,
            landscapeRowSpan: 1,
        },
        {
            id: 4,
            content: (
                <ul className="text-[clamp(0.5vw,1.48vh,0.74vw)] font-roboto leading-[clamp(0.7vw,1.85vh,0.0.925vw)]">
                    <li><Link href="/contact">{shouldAnimate ? <FutureText text="Contact" delay={2000} speed={20} triggerOnVisible={false} /> : "Contact"}</Link></li>
                    <li><Link href="/keynotes">{shouldAnimate ? <FutureText text="Keynotes" delay={2000} speed={20} triggerOnVisible={false} /> : "Keynotes"}</Link></li>
                    <li><Link href="/people">{shouldAnimate ? <FutureText text="Join us" delay={2000} speed={20} triggerOnVisible={false} /> : "Join us"}</Link></li>
                    <li><Link href="/faq">{shouldAnimate ? <FutureText text="FAQs" delay={2000} speed={20} triggerOnVisible={false} /> : "FAQs"}</Link></li>
                    <li><Link href="/privacy-policy">{shouldAnimate ? <FutureText text="Privacy policy" delay={2000} speed={20} triggerOnVisible={false} /> : "Privacy policy"}</Link></li>
                    <li><Link href="/terms-conditions">{shouldAnimate ? <FutureText text="Terms and conditions" delay={2000} speed={20} triggerOnVisible={false} /> : "Terms and conditions"}</Link></li>
                    <li><Link href="/insights">{shouldAnimate ? <FutureText text="Shareholder Value Analytics" delay={2000} speed={20} triggerOnVisible={false} /> : "Shareholder Value Analytics"}</Link></li>
                </ul>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        {
            id: 5,
            content: (
                <>
                    <p className="text-[clamp(0.5vw,1.48vh,0.74vw)] font-roboto leading-[clamp(0.7vw,1.85vh,0.0.925vw)]">
                        {shouldAnimate ? (
                            <FutureText
                                text="Subscribe for news from the future"
                                delay={2500}
                                speed={20}
                                triggerOnVisible={false}
                            />
                        ) : (
                            "Subscribe for news from the future"
                        )}
                    </p>

                    {/* Animate placeholder text */}
                    {shouldAnimate && (
                        <FutureText
                            text="Enter your e-mail"
                            delay={2500}
                            speed={20}
                            triggerOnVisible={false}
                            onUpdate={setPlaceholder}
                            className="hidden"
                        />
                    )}

                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={shouldAnimate ? placeholder || ' ' : 'Enter your e-mail'}
                        className="outline-none border-none bg-transparent text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] text-base placeholder-gray placeholder:font-bold placeholder:text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:placeholder:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:placeholder:text-[4vh]"
                    />

                    <div className="dt-h5 mt-[2vh]">
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                            {shouldAnimate ? (
                                <FutureText
                                    text="Submit"
                                    delay={2500}
                                    speed={25}
                                    triggerOnVisible={false}
                                />
                            ) : (
                                "Submit"
                            )}
                        </UnderlineOnHoverAnimation>
                    </div>
                </>
            ),
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 1,
            landscapeRowSpan: 1,
        },
    ];

    const getGridClasses = (item: GridItem) => {
        const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'justify-end'];

        // Mobile
        if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
            baseClasses.push('block', '[@media(max-width:767px)]:hidden');
        } else {
            baseClasses.push(`col-span-${item.mobileColSpan}`);
            baseClasses.push(`row-span-${item.mobileRowSpan}`);
        }

        // Landscape
        if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
            baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
        } else {
            baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
            baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
        }

        // Desktop
        if (item.colSpan === 0 || item.rowSpan === 0) {
            baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
        } else {
            baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
            baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
        }

        return baseClasses.join(' ');
    };

    // Render mobile layout
    const renderMobileLayout = () => (
        <footer 
            ref={footerRef} 
            className={`p-[2vh] bg-[#F9F7F2] transition-opacity duration-1000 ${shouldAnimate ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="grid gap-[2vh] grid-cols-4 auto-rows-[12.5vh]">
                {/* Row 1: Empty */}
                <div className="col-span-4 row-span-1 bg-[#F9F7F2]"></div>

                {/* Row 1-2, Col 1-3: Subscribe section */}
                <div className="col-span-3 row-span-1 bg-[#F9F7F2] flex flex-col justify-start">
                    <p className="dt-body-lg mb-[1vh]">
                        {shouldAnimate ? (
                            <FutureText
                                text="Subscribe for news from the future"
                                delay={2500}
                                speed={20}
                                triggerOnVisible={false}
                            />
                        ) : (
                            "Subscribe for news from the future"
                        )}
                    </p>

                    {/* Animate placeholder text */}
                    {shouldAnimate && (
                        <FutureText
                            text="Enter your e-mail"
                            delay={2500}
                            speed={20}
                            triggerOnVisible={false}
                            onUpdate={setPlaceholder}
                            className="hidden"
                        />
                    )}

                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={shouldAnimate ? placeholder || ' ' : 'Enter your e-mail'}
                        className="outline-none border-none bg-transparent text-[2vh] text-base placeholder-gray placeholder:font-graphik-semibold placeholder:text-[clamp(1.2vw,3vh,1.5vw)] mb-[4vh]"
                    />

                    <div className="dt-h5 text-left">
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                            {shouldAnimate ? (
                                <FutureText
                                    text="Submit"
                                    delay={2500}
                                    speed={25}
                                    triggerOnVisible={false}
                                />
                            ) : (
                                "Submit"
                            )}
                        </UnderlineOnHoverAnimation>
                    </div>
                </div>

                {/* Row 1-2, Col 4: Empty */}
                <div className="col-span-1 row-span-1 bg-[#F9F7F2]"></div>

                {/* Row 3-5, Col 1: Social links */}
                <div className="col-span-1 row-span-2 bg-[#F9F7F2] flex flex-col justify-start">
                    <p className="dt-h5 mb-[1vh]">
                        {shouldAnimate ? (
                            <FutureText text="Social" delay={0} speed={50} triggerOnVisible={false} />
                        ) : (
                            "Social"
                        )}
                    </p>
                    <ul className="text-[1.5vh] leading-tight space-y-2">
                        <li><a href="https://www.google.com">{shouldAnimate ? <FutureText text="RSS" delay={1000} speed={30} triggerOnVisible={false} /> : "RSS"}</a></li>
                        <li><a href="https://www.openai.com">{shouldAnimate ? <FutureText text="Instagram" delay={1000} speed={30} triggerOnVisible={false} /> : "Instagram"}</a></li>
                        <li><a href="https://www.github.com">{shouldAnimate ? <FutureText text="Twitter" delay={1000} speed={30} triggerOnVisible={false} /> : "Twitter"}</a></li>
                        <li><a href="https://www.github.com">{shouldAnimate ? <FutureText text="Facebook" delay={1000} speed={30} triggerOnVisible={false} /> : "Facebook"}</a></li>
                        <li><a href="https://www.github.com">{shouldAnimate ? <FutureText text="Linkedin" delay={1000} speed={30} triggerOnVisible={false} /> : "Linkedin"}</a></li>
                        <li><a href="https://www.github.com">{shouldAnimate ? <FutureText text="Discord" delay={1000} speed={30} triggerOnVisible={false} /> : "Discord"}</a></li>
                    </ul>
                </div>

                {/* Row 3-5, Col 2: Empty */}
                <div className="col-span-1 row-span-2 bg-[#F9F7F2]"></div>

                {/* Row 3-5, Col 3-4: Quick links */}
                <div className="col-span-2 row-span-2 bg-[#F9F7F2] flex flex-col justify-start">
                    <h2 className="dt-h5 mb-[1vh]">
                        {shouldAnimate ? (
                            <FutureText text="Quick Links" delay={2000} speed={30} triggerOnVisible={false} />
                        ) : (
                            "Quick Links"
                        )}
                    </h2>
                    <ul className="text-[1.5vh] leading-tight space-y-2">
                        <li><Link href="/contact">{shouldAnimate ? <FutureText text="Contact" delay={2000} speed={20} triggerOnVisible={false} /> : "Contact"}</Link></li>
                        <li><Link href="/keynotes">{shouldAnimate ? <FutureText text="Keynotes" delay={2000} speed={20} triggerOnVisible={false} /> : "Keynotes"}</Link></li>
                        <li><Link href="/people">{shouldAnimate ? <FutureText text="Join us" delay={2000} speed={20} triggerOnVisible={false} /> : "Join us"}</Link></li>
                        <li><Link href="/faq">{shouldAnimate ? <FutureText text="FAQs" delay={2000} speed={20} triggerOnVisible={false} /> : "FAQs"}</Link></li>
                        <li><Link href="/privacy-policy">{shouldAnimate ? <FutureText text="Privacy policy" delay={2000} speed={20} triggerOnVisible={false} /> : "Privacy policy"}</Link></li>
                        <li><Link href="/terms-conditions">{shouldAnimate ? <FutureText text="Terms and conditions" delay={2000} speed={20} triggerOnVisible={false} /> : "Terms and conditions"}</Link></li>
                        <li><Link href="/insights">{shouldAnimate ? <FutureText text="Shareholder Value Analytics" delay={2000} speed={20} triggerOnVisible={false} /> : "Shareholder Value Analytics"}</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );

    // Render desktop layout
    const renderDesktopLayout = () => (
        <footer ref={footerRef} className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
            <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
                {items(shouldAnimate).map((item) => (
                    <div key={item.id} className={getGridClasses(item)}>
                        {item.content}
                    </div>
                ))}
            </div>
        </footer>
    );

    // Always render the same structure to maintain hook consistency
    return isMobile ? renderMobileLayout() : renderDesktopLayout();
};

export default Footer;