import React, { useEffect } from 'react';
import useIsMobile from '@/hooks/useIsMobile';

interface MenuIconProps {
    stage: number;
    onClick: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ stage, onClick }) => {
    const isMobile = useIsMobile();

    useEffect(() => {
        console.log(`MenuIcon stage changed to: ${stage}`);
    }, [stage]);

    // Helper for transition styles
    const transitionBase = {
        transitionProperty: 'transform, opacity',
        transitionDuration: '0.4s',
        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    };
    const transitionBaseDice = {
        transitionProperty: 'transform, opacity',
        transitionDuration: '0.5s',
        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    };
    return (
        <div
            className="relative w-full h-full cursor-pointer select-none"
            onClick={onClick}
        >
            <div className="relative w-full h-full">
                <div className="absolute top-0 right-0 w-[6vw] h-[6vw] md:w-[2vw] md:h-[2vw] flex items-center justify-center">
                    {/* Top Dot (hidden in dice stage) */}
                    <div
                        className="absolute w-[1.2vw] h-[1.2vw] md:w-[0.4vw] md:h-[0.4vw] bg-black rounded-full shadow"
                        style={{
                            ...transitionBase,
                            transitionDelay: stage === 2 ? '0.3s' : '0s',
                            transform: `translate(${stage === 0
                                ? isMobile ? 'calc(-0.6vw * 3), 0px' : '-0.6vw, 0px'
                                : stage === 1 || stage === 2
                                    ? isMobile ? '0px, calc(-0.6vw * 3)' : '0px, -0.6vw'
                                    : ''}) scale(${stage === 2 ? '0' : '1'})`,
                            opacity: stage === 2 ? 0 : 1,
                        }}
                    />
                    {/* Center Dot - Always visible */}
                    <div
                        className="absolute w-[1.2vw] h-[1.2vw] md:w-[0.4vw] md:h-[0.4vw] bg-black rounded-full shadow"
                        style={{
                            ...transitionBase,
                            transform: `translate(0px, 0px) scale(${stage === 2 ? '1.2' : '1'})`,
                        }}
                    />
                    {/* Bottom Dot (hidden in dice stage) */}
                    <div
                        className="absolute w-[1.2vw] h-[1.2vw] md:w-[0.4vw] md:h-[0.4vw] bg-black rounded-full shadow"
                        style={{
                            ...transitionBase,
                            transitionDelay: stage === 2 ? '0.3s' : '0s',
                            transform: `translate(${stage === 0
                                ? isMobile ? 'calc(0.6vw * 3), 0px' : '0.6vw, 0px'
                                : stage === 1 || stage === 2
                                    ? isMobile ? '0px, calc(0.6vw * 3)' : '0px, 0.6vw'
                                    : ''}) scale(${stage === 2 ? '0' : '1'})`,
                            opacity: stage === 2 ? 0 : 1,
                        }}
                    />
                    {/* Dice Dots (appear only in stage 2) */}
                    {/* Top Left */}
                    <div
                        className="absolute w-[1.2vw] h-[1.2vw] md:w-[0.4vw] md:h-[0.4vw] bg-black rounded-full shadow"
                        style={{
                            ...transitionBaseDice,
                            transitionDelay: stage === 2 ? '0.2s' : '0s',
                            transform: `translate(${stage === 2
                                ? isMobile ? 'calc(-0.5vw * 3), calc(-0.5vw * 3)' : '-0.5vw, -0.5vw'
                                : isMobile ? '0px, calc(-0.6vw * 3)' : '0px, -0.6vw'}) scale(${stage === 2 ? '1.1' : '0'})`,
                            opacity: stage === 2 ? 1 : 0,
                        }}
                    />
                    {/* Top Right */}
                    <div
                        className="absolute w-[1.2vw] h-[1.2vw] md:w-[0.4vw] md:h-[0.4vw] bg-black rounded-full shadow"
                        style={{
                            ...transitionBaseDice,
                            transitionDelay: stage === 2 ? '0.2s' : '0s',
                            transform: `translate(${stage === 2
                                ? isMobile ? 'calc(0.5vw * 3), calc(-0.5vw * 3)' : '0.5vw, -0.5vw'
                                : isMobile ? '0px, calc(-0.6vw * 3)' : '0px, -0.6vw'}) scale(${stage === 2 ? '1.1' : '0'})`,
                            opacity: stage === 2 ? 1 : 0,
                        }}
                    />
                    {/* Bottom Left */}
                    <div
                        className="absolute w-[1.2vw] h-[1.2vw] md:w-[0.4vw] md:h-[0.4vw] bg-black rounded-full shadow"
                        style={{
                            ...transitionBaseDice,
                            transitionDelay: stage === 2 ? '0.3s' : '0s',
                            transform: `translate(${stage === 2
                                ? isMobile ? 'calc(-0.5vw * 3), calc(0.5vw * 3)' : '-0.5vw, 0.5vw'
                                : isMobile ? '0px, calc(0.6vw * 3)' : '0px, 0.6vw'}) scale(${stage === 2 ? '1.1' : '0'})`,
                            opacity: stage === 2 ? 1 : 0,
                        }}
                    />
                    {/* Bottom Right */}
                    <div
                        className="absolute w-[1.2vw] h-[1.2vw] md:w-[0.4vw] md:h-[0.4vw] bg-black rounded-full shadow"
                        style={{
                            ...transitionBaseDice,
                            transitionDelay: stage === 2 ? '0.3s' : '0s',
                            transform: `translate(${stage === 2
                                ? isMobile ? 'calc(0.5vw * 3), calc(0.5vw * 3)' : '0.5vw, 0.5vw'
                                : isMobile ? '0px, calc(0.6vw * 3)' : '0px, 0.6vw'}) scale(${stage === 2 ? '1.1' : '0'})`,
                            opacity: stage === 2 ? 1 : 0,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MenuIcon;
