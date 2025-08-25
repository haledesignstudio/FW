'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from './menu_icon';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';




const menuItems = [
    {
        label: 'HOME',
        href: '/',
        content: (
            <div className="text-left">
                <ul className="dt-body-lg whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href={`/#tab`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/#tab' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>Benchmark your innovation</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/#tab`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/#tab' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Our process</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/#tab`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/#tab' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Case studies</span>
                        </Link>
                    </li>
                </ul>
                <Image
                    src="/menu-home.png"
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] h-auto"
                    loading="eager"
                    priority
                />



            </div>
        )
    },
    { label: '', href: '' },
    {
        label: 'WHAT WE DO',
        href: '/what-we-do',
        content: (
            <div className="text-left">
                <ul className="dt-body-lg whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href={`/what-we-do`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/what-we-do' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>What we do</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/what-we-do#how-we-do-it`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/what-we-do#how-we-do-it' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>How we do it</span>
                        </Link>
                    </li>
                </ul>
                <Image
                    src="/menu-what-we-do.png"
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] h-auto"
                    loading="eager"
                    priority
                />

            </div>
        )

    },
    { label: '', href: '' },
    // Update the INSIGHTS section in your menuItems array:

    {
        label: 'INSIGHTS',
        href: '/insights',
        content: (
            <div className="text-left">
                <ul className="dt-body-lg pb-[15vh]">
                    <li>
                        <Link href="/insights" onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/insights' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span>01</span>
                            <span>Shareholder Value Analytics</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/mindbullets" onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/mindbullets' } })
                            );
                        }} className="flex whitespace-nowrap gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Mindbullets: News From the Future</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/keynotes" onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/keynotes' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Keynotes</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/podcast" onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/podcast' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">04</span>
                            <span>Podcast</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/corporate-venturing" onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/corporate-venturing' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">05</span>
                            <span>Corporate Venturing</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/the-edge" onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/the-edge' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">06</span>
                            <span>The Edge: Insights Driven by Disruption</span>
                        </Link>
                    </li>
                </ul>
                <Image
                    src="/menu-insights.png"
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] pb-[7.5vh]"
                    loading="eager"
                    priority
                />
                <Link href="/insights" onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/insights' } })
                            );
                        }}>
                    <span className="dt-btn whitespace-nowrap">
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                            Explore Shareholder Value Analytics
                        </UnderlineOnHoverAnimation>

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
                <ul className="dt-body-lg whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href={`/our-work#impact-statistics`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/our-work#impact-statistics' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>Impact statistics</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/our-work#our-clients`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/our-work#our-clients' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Our clients</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/supercharge-tomorrow`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/supercharge-tomorrow' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Supercharge Tomorrow</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/our-work#case-studies`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/our-work#case-studies' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">04</span>
                            <span>Case studies</span>
                        </Link>
                    </li>
                </ul>
                <Image
                    src="/menu-our-work.png"
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] pb-[7.5vh]"
                    loading="eager"
                    priority
                />
                <Link href={`/our-work#case-studies`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/our-work#case-studies' } })
                            );
                        }}>
                    <span className="dt-btn whitespace-nowrap">
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                            See case studies
                        </UnderlineOnHoverAnimation>

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
                <ul className="dt-body-lg whitespace-nowrap pb-[15vh]">
                    <li>
                        <Link href={`/people#people-who-care`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/people#people-who-care' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>People who care</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/people#life-at-futureworld`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/people#life-at-futureworld' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Life at FutureWorld</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/people#why-join-us`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/people#why-join-us' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">03</span>
                            <span>Why join us</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/people#careers`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/people#careers' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">04</span>
                            <span>Careers</span>
                        </Link>
                    </li>
                </ul>
                <Image
                    src="/menu-people.png"
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] pb-[7.5vh]"
                    loading="eager"
                    priority
                />
                <Link href={`/people#careers`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/people#careers' } })
                            );
                        }}>
                    <span className="dt-btn whitespace-nowrap">
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                            See careers
                        </UnderlineOnHoverAnimation>

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
                <ul className="dt-body-lg whitespace-nowrap pb-[15vh]">

                    <li>
                        <Link href={"mailto:info@futureworld.org"} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: "mailto:info@futureworld.org" } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">01</span>
                            <span>Send an email</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/contact#book-keynote`} onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/contact#book-keynote' } })
                            );
                        }} className="flex gap-[10%] hover:underline">
                            <span className="">02</span>
                            <span>Book a keynote</span>
                        </Link>
                    </li>
                </ul>
                <Image
                    src="/menu-contact.png"
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] pb-[7.5vh]"
                    loading="eager"
                    priority
                />
                <Link href="/keynotes" onClick={(e) => {
                            e.preventDefault();
                            document.dispatchEvent(
                                new CustomEvent('fw:navigateAfterClose', { detail: { href: '/keynotes' } })
                            );
                        }}>
                    <span className="dt-btn whitespace-nowrap">
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                            Explore Keynote Topics
                        </UnderlineOnHoverAnimation>

                    </span>
                </Link>
            </div>
        )
    },
    { label: '', href: '' },
];



const menuVariants: Variants = {
    hidden: {
        maxHeight: '0px', // use string, not number
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.42, 0, 0.58, 1]
        }
    },
    visible: {
        maxHeight: '85vh', // Increased from 75vh
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.42, 0, 0.58, 1]
        }
    },
    exit: {
        maxHeight: '0px',
        opacity: 0,
        transition: {
            maxHeight: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
            opacity: { duration: 0.3, ease: "easeOut", delay: 0 }
        }
    }
};

// Smaller menu variants for non-homepage pages
const menuVariantsOtherPages: Variants = {
    hidden: {
        maxHeight: '0px',
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.42, 0, 0.58, 1]
        }
    },
    visible: {
        maxHeight: '80vh', // Increased from 75vh for more space
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.42, 0, 0.58, 1]
        }
    },
    exit: {
        maxHeight: '0px',
        opacity: 0,
        transition: {
            maxHeight: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
            opacity: { duration: 0.2, ease: "easeOut", delay: 0 }
        }
    }
};





const Header: React.FC = () => {
    // Get current pathname to conditionally style based on page
    const pathname = usePathname();
    const isHomepage = pathname === '/';

    // Mobile detection with hydration safety
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);



    const [activePair, setActivePair] = useState<number | null>(null);
    const [hovering, setHovering] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false); // controls menu visibility
    const [stage, setStage] = useState(0); // 0 = closed, 1 = animating, 2 = open
    const [isAnimating, setIsAnimating] = useState(false); // animation lock

    const router = useRouter();

    // Check if mobile
    const isMobileScreen = isClient && window.innerWidth < 768;


    // Mobile menu items - simplified for mobile layout
    const mobileMenuItems = [
        { label: 'HOME', href: '/' },
        { label: 'WHAT WE DO', href: '/what-we-do' },
        { label: 'INSIGHTS', href: '/insights' },
        { label: 'OUR WORK', href: '/our-work' },
        { label: 'PEOPLE', href: '/people' },
        { label: 'CONTACT', href: '/contact' }
    ];

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

    const closeMenuAndWait = React.useCallback((): Promise<void> => {
        return new Promise<void>((resolve) => {
            if (isAnimating) { resolve(); return; }
            setIsAnimating(true);
            setStage(1);                    // start closing transition
            setTimeout(() => setStage(0), 300);
            setTimeout(() => {
                setMenuOpen(false);
                setIsAnimating(false);
                setActivePair(null);
                setHovering(false);
                // ensure the DOM has painted the closed state
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => resolve());
                });
            }, 800);                        // <- match your existing close duration
        });
    }, [isAnimating, setIsAnimating, setStage, setMenuOpen, setActivePair, setHovering]);


    useEffect(() => {
        const handler = (e: Event) => {
            const href = (e as CustomEvent<{ href: string }>).detail?.href;
            if (!href) return;
            closeMenuAndWait().then(() => {
                // navigate only after the close animation + 2 paints
                router.push(href);
            });
        };
        document.addEventListener('fw:navigateAfterClose', handler as EventListener);
        return () => document.removeEventListener('fw:navigateAfterClose', handler as EventListener);
    }, [closeMenuAndWait, router]);




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
            {isMobileScreen ? (
                // MOBILE LAYOUT
                <>
                    {/* Mobile Header */}
                    <header className="grid grid-cols-4 gap-[2vh] auto-rows-[6.25vh] items-start bg-[#F9F7F2] p-[2vh] relative top-0 left-0 z-50">
                        {/* Logo: Row 1, Col 1-2, Top Left */}
                        <Link href="/" className="col-span-2 flex items-start justify-start">
                            <Image
                                src="/FW_Logo.gif"
                                alt="Logo"
                                width={120}
                                height={40}
                                className="object-contain cursor-pointer h-[4vh] w-auto"
                                priority
                                unoptimized={false}
                            />
                        </Link>

                        {/* Empty Col 3 */}
                        <div className="col-span-1"></div>

                        {/* Menu Button: Row 1, Col 4, Top Right */}
                        <div className="col-span-1 flex justify-end items-start">
                            <div className="relative h-[6.25vh]">
                                <MenuIcon stage={stage} onClick={toggleMenu} />
                            </div>
                        </div>
                    </header>

                    {/* Mobile Menu Dropdown with conditional styling */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                key="mobile-menu"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={isHomepage ? menuVariants : menuVariantsOtherPages}
                                className="w-screen bg-[#F9F7F2] relative left-0 z-40 overflow-hidden"
                            >
                                <div className={`grid grid-cols-4 p-[2vh] ${isHomepage
                                    ? 'gap-[1vh] auto-rows-[5vh]'
                                    : 'gap-[1vh] auto-rows-[5vh]'
                                    }`}>
                                    {/* Conditional empty rows - 3 for homepage, 4 for other pages */}
                                    <div className="col-span-4"></div>
                                    <div className="col-span-4"></div>
                                    <div className="col-span-4"></div>
                                    {!isHomepage && <div className="col-span-4"></div>}
                                    {!isHomepage && <div className="col-span-4"></div>}
                                    {!isHomepage && <div className="col-span-4"></div>}

                                    {/* Menu Items with conditional sizing */}
                                    {mobileMenuItems.map((item, index) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.3 }}
                                            className="col-span-4 flex items-center justify-start"
                                        >
                                            <Link
                                                href={item.href}
                                                className={`dt-h2 dt-btn text-black font-bold hover:underline`}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                // DESKTOP LAYOUT  
                <>
                    {/* Desktop Header */}
                    <header className="grid grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 
                    gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] 
                    auto-rows-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[15vh]
                    items-start bg-[#F9F7F2] px-[2vh] pt-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:pt-[4vh] 
                    relative top-0 left-0 z-50">

                        {/* Logo: always first column */}
                        <Link href="/" className="relative col-span-1 aspect-[5/1]">
                            <Image
                                src="/FW_Logo.gif"
                                alt="Logo"
                                fill
                                className="object-contain object-left-top cursor-pointer"
                                priority
                                unoptimized={false}
                            />
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

                    {/* Desktop Menu Section with conditional styling */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                key="menu"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={isHomepage ? menuVariants : menuVariantsOtherPages}
                                className="w-screen bg-[#F9F7F2] flex items-center justify-end relative left-0 z-40 overflow-hidden"
                                style={{
                                    height: isHomepage ? '57.5vh' : '77.5vh'
                                }}
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
                                                        className={`text-black font-graphik-semibold text-[clamp(3.5vw,8.8vh,4.4vw)] leading-[clamp(3.5vw,8.8vh,4.4vw)] whitespace-nowrap ${isHomepage
                                                            ? 'font-graphik-semibold text-[clamp(3.5vw,8.8vh,4.4vw)] leading-[clamp(3.5vw,8.8vh,4.4vw)]'
                                                            : 'font-graphik-semibold text-[clamp(3.5vw,8.8vh,4.4vw)] leading-[clamp(3.5vw,8.8vh,4.4vw)]'
                                                            }`}
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
            )}
        </>
    );
};

export default Header;