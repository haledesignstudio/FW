'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from './menu_icon';
import { motion, AnimatePresence, Variants } from 'framer-motion';



const menuItems = [
    {
        label: 'HOME',
        href: '/home',
        content: (
            <div className="text-left">
                <ul className="text-[0.85vw] whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>Benchmark your innovation</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Our process</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Case studies</span>
                        </Link>
                    </li>
                </ul>
                <img src="/menu-home.png" alt="home" className="w-[60%]" />
            </div>
        )
    },
    { label: '', href: '' },
    {
        label: 'WHAT WE DO',
        href: '/what-we-do',
        content: (
            <div className="text-left">
                <ul className="text-[0.85vw] whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>What we do</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>How we do it</span>
                        </Link>
                    </li>
                </ul>
                <img src="/menu-what-we-do.png" alt="what-we-do" className="w-[60%]" />
            </div>
        )

    },
    { label: '', href: '' },
    {
        label: 'INSIGHTS',
        href: '/insights',
        content: (
            <div className="text-left">
                <ul className="text-[0.85vw] whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span>01</span>
                            <span>Shareholder Value Analytics</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Mindbullets: News From the Future</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Keynotes</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">04</span>
                            <span>Podcasts</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">05</span>
                            <span>Corporate Venturing</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">06</span>
                            <span>The Edge: Insights Driven by Disruption</span>
                        </Link>
                    </li>
                </ul>
                <img src="/menu-insights.png" alt="insights" className="w-[60%] pb-[7.5vh]" />
                <Link href="/your-target-page">
                    <span className="bg-black text-white text-center text-sm font-medium inline-block w-[60%] text-[0.65vw] whitespace-nowrap py-[2.5%]">
                        Explore Shareholder Value Analytics
                    </span>
                </Link>
            </div>
        )
    },
    { label: '', href: '' },
    {
        label: 'OUR WORK',
        href: '/our-work',
        content: (
            <div className="text-left">
                <ul className="text-[0.85vw] whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>Impact statistics</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Our clients</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Supercharge Tomorrow</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">04</span>
                            <span>Value propositions</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">05</span>
                            <span>Case studies</span>
                        </Link>
                    </li>
                </ul>
                <img src="/menu-our-work.png" alt="our-work" className="w-[60%] pb-[7.5vh]" />
                <Link href="/your-target-page">
                    <span className="bg-black text-white text-center text-sm font-medium inline-block w-[60%] text-[0.65vw] whitespace-nowrap py-[2.5%]">
                        See case studies
                    </span>
                </Link>
            </div>
        )
    },
    { label: '', href: '' },
    {
        label: 'PEOPLE',
        href: '/people',
        content: (
            <div className="text-left">
                <ul className="text-[0.85vw] whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>People who care</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Life at FutureWorld</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Why join us</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">04</span>
                            <span>Careers</span>
                        </Link>
                    </li>
                </ul>
                <img src="/menu-people.png" alt="careers" className="w-[60%] pb-[7.5vh]" />
                <Link href="/your-target-page">
                    <span className="bg-black text-white text-center text-sm font-medium inline-block w-[60%] text-[0.65vw] whitespace-nowrap py-[2.5%]">
                        See careers
                    </span>
                </Link>
            </div>
        )
    },
    { label: '', href: '' },
    {
        label: 'CONTACT',
        href: '/contact',
        content: (
            <div className="text-left">
                <ul className="text-[0.85vw] whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>Schedule a call</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Send an email</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/our-process" className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Book a keynote</span>
                        </Link>
                    </li>
                </ul>
                <img src="/menu-contact.png" alt="careers" className="w-[60%] pb-[7.5vh]" />
                <Link href="/your-target-page">
                    <span className="bg-black text-white text-center text-sm font-medium inline-block w-[60%] text-[0.65vw] whitespace-nowrap py-[2.5%]">
                        Explore Keynote topics
                    </span>
                </Link>
            </div>
        )
    },
    { label: '', href: '' },
];



const menuVariants: Variants = {
    hidden: {
        y: '-100%',
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: [0.42, 0, 0.58, 1] // cubic bezier for easeInOut
        }
    },
    visible: {
        y: '0%',
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.42, 0, 0.58, 1]
        }
    },
    exit: {
        y: '-100%',
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: [0.42, 0, 0.58, 1]
        }
    }
};



const Header: React.FC = () => {

    const [activePair, setActivePair] = useState<number | null>(null);
    const [hovering, setHovering] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false); // controls menu visibility
    const [stage, setStage] = useState(0); // 0 = closed, 1 = animating, 2 = open
    const [isAnimating, setIsAnimating] = useState(false); // animation lock

    const toggleMenu = () => {
        if (isAnimating) return;

        setIsAnimating(true);

        if (stage === 0) {
            // Opening sequence
            setStage(1); // transition stage
            setTimeout(() => setStage(2), 300);
            setTimeout(() => {
                setMenuOpen(true); // show menu AFTER animation
                setIsAnimating(false);
            }, 800);
        } else {
            // Closing sequence
            setStage(1); // transition stage
            setTimeout(() => setStage(0), 300);
            setTimeout(() => {
                setMenuOpen(false); // hide menu AFTER animation
                setIsAnimating(false);
                setActivePair(null);
                setHovering(false);
            }, 800);
        }
    };



    const handleMouseEnter = (index: number) => {
        setActivePair(index);
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
        setTimeout(() => {
            if (!hovering) {
                setActivePair(null);
            }
        }, 100);
    };

    const handleMenuMouseLeave = () => {
        setHovering(false);
        setActivePair(null);
    };

    const getColumnInfo = () => {
        const totalOddColumns = menuItems.filter((_, i) => i % 2 === 0).length;
        const maxLayoutWidth = 50; // in vw
        const columnWidth = maxLayoutWidth / totalOddColumns;
        const evenColumnWidth = columnWidth * 2.5;
        const activeEvenIndex = activePair !== null ? activePair + 1 : null;

        return menuItems.map((_, index) => {
            const isOdd = index % 2 === 0;
            const baseOddIndex = Math.floor(index / 2);

            const isActiveEven = index === activeEvenIndex;
            const isVisible = isOdd || isActiveEven;

            let left = baseOddIndex * columnWidth;
            let width = columnWidth;

            if (activeEvenIndex !== null) {
                const activeOddIndex = Math.floor(activeEvenIndex / 2);

                if (isOdd && baseOddIndex <= activeOddIndex) {
                    left -= evenColumnWidth;
                }

                if (isActiveEven) {
                    left = (activeOddIndex + 1) * columnWidth - evenColumnWidth;
                    width = evenColumnWidth;
                }

                if (index > activeEvenIndex) {
                    left = baseOddIndex * columnWidth;
                }
            }

            return {
                isVisible,
                isOdd,
                isActiveEven,
                width: `${width}vw`,
                left: `${left}vw`,
            };
        });
    };

    const columnInfo = getColumnInfo();

    return (
        <>
            {/* Header */}
            <header className="grid grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 
            gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] 
            auto-rows-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]
            items-start bg-[#F9F7F2] px-[2vh] pt-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:pt-[4vh] 
            relative top-0 left-0 z-50">

                {/* Logo: always first column */}
                <Link href="/" passHref>
                    <div className="relative col-span-1 aspect-[5/1] cursor-pointer">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain object-left-top"
                            priority
                        />
                    </div>
                </Link>

                {/* Spacer: fills unused middle columns */}
                <div className="hidden [@media(max-height:600px)_and_(max-width:768px)]:block [@media(max-height:600px)_and_(max-width:768px)]:col-span-2 
                  [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4"></div>

                {/* MenuIcon: last column */}
                <div className="col-span-1 flex justify-end items-start">
                    <div className="relative h-[20vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:h-[25vh]">
                        <MenuIcon stage={stage} onClick={toggleMenu} />
                    </div>
                </div>

            </header>


            {/* Menu Section */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="menu"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className="w-screen h-[75vh] bg-[#F9F7F2] flex items-center justify-end fixed top-[20vh] left-0 z-60"
                    >
                        <div
                            className="relative h-full overflow-visible"
                            style={{ width: '65vw' }}
                            onMouseLeave={handleMenuMouseLeave}
                        >
                            {/* your mapped menu content */}
                            {menuItems.map((item, index) => {
                                const info = columnInfo[index];
                                return (
                                    <div
                                        key={index}
                                        className="transition-all duration-300 ease-in-out overflow-visible flex flex-col items-center justify-end absolute h-full"
                                        style={{
                                            width: info.width,
                                            left: info.left,
                                            opacity: info.isVisible ? 1 : 0,
                                            pointerEvents: info.isVisible ? 'auto' : 'none',
                                        }}
                                        onMouseEnter={() => {
                                            if (info.isOdd) handleMouseEnter(index);
                                            else if (info.isActiveEven) setHovering(true);
                                        }}
                                        onMouseLeave={() => {
                                            if (info.isOdd || info.isActiveEven) handleMouseLeave();
                                        }}
                                    >
                                        {info.isOdd && (
                                            <Link
                                                href={item.href}
                                                className="text-black text-[5vw] font-bold"
                                                style={{
                                                    writingMode: 'vertical-rl',
                                                    textOrientation: 'mixed',
                                                    transform: 'rotate(180deg)'
                                                }}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                        {info.isActiveEven && (
                                            <div className="w-full h-full flex items-end justify-center">
                                                {menuItems[index - 1]?.content}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};

export default Header;