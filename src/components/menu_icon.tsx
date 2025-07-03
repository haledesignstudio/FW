import React from 'react';

interface ElasticDotsToggleProps {
    stage: number;
    onClick: () => void;
}

const ElasticDotsToggle: React.FC<ElasticDotsToggleProps> = ({ stage, onClick }) => {
    return (
        <div
            className="relative w-full h-full cursor-pointer select-none"
            onClick={onClick}
        >
            <div className="relative w-full h-full flex items-center justify-center">

                {/* Top Dot (hidden in dice stage) */}
                <div
                    className="absolute w-[0.4vw] h-[0.4vw] bg-black rounded-full shadow transition-all duration-400 ease-out"
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        transform: `translate(${stage === 0
                            ? '-0.6vw, 0px'
                            : stage === 1 || stage === 2
                                ? '0px, -0.6vw'
                                : ''}) scale(${stage === 2 ? '0' : '1'})`,
                        opacity: stage === 2 ? 0 : 1,
                        transitionDelay: stage === 2 ? '0.3s' : '0s',
                    }}
                />

                {/* Center Dot - Always visible */}
                <div
                    className="absolute w-[0.4vw] h-[0.4vw] bg-black rounded-full shadow transition-all duration-400 ease-out"
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        transform: `translate(0px, 0px) scale(${stage === 2 ? '1.2' : '1'})`,
                    }}
                />

                {/* Bottom Dot (hidden in dice stage) */}
                <div
                    className="absolute w-[0.4vw] h-[0.4vw] bg-black rounded-full shadow transition-all duration-400 ease-out"
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        transform: `translate(${stage === 0
                            ? '0.6vw, 0px'
                            : stage === 1 || stage === 2
                                ? '0px, 0.6vw'
                                : ''}) scale(${stage === 2 ? '0' : '1'})`,
                        opacity: stage === 2 ? 0 : 1,
                        transitionDelay: stage === 2 ? '0.3s' : '0s',
                    }}
                />

                {/* Dice Dots (appear only in stage 2) */}
                {/* Top Left */}
                <div
                    className="absolute w-[0.4vw] h-[0.4vw] bg-black rounded-full shadow transition-all duration-500 ease-out"
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        transitionDelay: stage === 2 ? '0.2s' : '0s',
                        transform: `translate(${stage === 2 ? '-0.5vw, -0.5vw' : '0px, -0.6vw'}) scale(${stage === 2 ? '1.1' : '0'})`,
                        opacity: stage === 2 ? 1 : 0,
                    }}
                />

                {/* Top Right */}
                <div
                    className="absolute w-[0.4vw] h-[0.4vw] bg-black rounded-full shadow transition-all duration-500 ease-out"
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        transitionDelay: stage === 2 ? '0.2s' : '0s',
                        transform: `translate(${stage === 2 ? '0.5vw, -0.5vw' : '0px, -0.6vw'}) scale(${stage === 2 ? '1.1' : '0'})`,
                        opacity: stage === 2 ? 1 : 0,
                    }}
                />

                {/* Bottom Left */}
                <div
                    className="absolute w-[0.4vw] h-[0.4vw] bg-black rounded-full shadow transition-all duration-500 ease-out"
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        transitionDelay: stage === 2 ? '0.3s' : '0s',
                        transform: `translate(${stage === 2 ? '-0.5vw, 0.5vw' : '0px, 0.6vw'}) scale(${stage === 2 ? '1.1' : '0'})`,
                        opacity: stage === 2 ? 1 : 0,
                    }}
                />

                {/* Bottom Right */}
                <div
                    className="absolute w-[0.4vw] h-[0.4vw] bg-black rounded-full shadow transition-all duration-500 ease-out"
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        transitionDelay: stage === 2 ? '0.3s' : '0s',
                        transform: `translate(${stage === 2 ? '0.5vw, 0.5vw' : '0px, 0.6vw'}) scale(${stage === 2 ? '1.1' : '0'})`,
                        opacity: stage === 2 ? 1 : 0,
                    }}
                />

            </div>
        </div>
    );
};

export default ElasticDotsToggle;
