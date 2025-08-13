'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from './menu_icon';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';



const menuItems = [
    {
        label: 'HOME',
        href: '/',
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
            <ul className="text-[0.85vw] whitespace-nowrap pb-[15vh]">
                <li>
                    <Link href="/insights?section=analytics" className="flex gap-[10%] hover:underline">
                        <span>01</span>
                        <span>Shareholder Value Analytics</span>
                    </Link>
                </li>
                <li>
                    <Link href="/insights?section=mindbullets" className="flex gap-[10%] hover:underline">
                        <span className="">02</span>
                        <span>Mindbullets: News From the Future</span>
                    </Link>
                </li>
                <li>
                    <Link href="/insights?section=keynotes" className="flex gap-[10%] hover:underline">
                        <span className="">03</span>
                        <span>Keynotes</span>
                    </Link>
                </li>
                <li>
                    <div className="group flex items-center group cursor-pointer">
                        <span className="group-hover:underline">04</span>
                        <div className="w-[10%]"></div>
                        <span className="group-hover:underline">Podcasts</span>
                        <div className="w-[2.5%]"></div>
                        
                        {/* COMING SOON slides in from bottom */}
                        <div className="overflow-hidden h-[0.85vw] relative w-fit flex items-center">
                            <span className="block text-[0.7vw] text-black/50 transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                (Coming Soon)
                            </span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="group flex items-center group cursor-pointer">
                        <span className="group-hover:underline">05</span>
                        <div className="w-[10%]"></div>
                        <span className="group-hover:underline">Corporate Venturing</span>
                        <div className="w-[2.5%]"></div>
                        
                        {/* COMING SOON slides in from bottom */}
                        <div className="overflow-hidden h-[0.85vw] relative w-fit flex items-center">
                            <span className="block text-[0.7vw] text-black/50 transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                (Coming Soon)
                            </span>
                        </div>
                    </div>
                </li>
                <li>
                    <Link href="/insights?section=edge" className="flex gap-[10%] hover:underline">
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
                <Image
                    src="/menu-our-work.png" 
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] pb-[7.5vh]"
                    loading="eager"
                    priority
                />
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
                <Image
                    src="/menu-people.png" 
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] pb-[7.5vh]"
                    loading="eager"
                    priority
                />
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
                <Image
                    src="/menu-contact.png" 
                    alt="home"
                    width={600}
                    height={400}
                    className="w-[60%] pb-[7.5vh]"
                    loading="eager"
                    priority
                />
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
                                <div className={`grid grid-cols-4 p-[2vh] ${
                                    isHomepage 
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
                                                className={`text-black font-bold hover:underline ${
                                                    isHomepage 
                                                        ? 'text-[4vh]' 
                                                        : 'text-[4vh]'
                                                }`}
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
                                                        className={`text-black font-bold whitespace-nowrap ${
                                                            isHomepage 
                                                                ? 'text-[4vw]' 
                                                                : 'text-[5vw]'
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