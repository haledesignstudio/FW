import { useState, useEffect } from 'react';

const useIsMobile = (options?: { breakpoint?: number; advanced?: boolean }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return; // Prevent SSR issues

        let timeoutId: ReturnType<typeof setTimeout>;

        const checkDevice = () => {
            if (options?.advanced) {
                const isTabletLandscape = window.matchMedia('(max-height: 600px) and (max-width: 1080px)').matches;
                const isDesktop = window.matchMedia('(min-width: 1080px) and (min-aspect-ratio: 1/1)').matches;
                const isVerticalMonitor = window.innerWidth <= 1080 && window.innerHeight >= 600;
                setIsMobile(!isTabletLandscape && !isDesktop || isVerticalMonitor);
            } else {
                const breakpoint = options?.breakpoint ?? 768;
                const isVerticalMonitor = window.innerWidth <= 1080 && window.innerHeight >= 600;
                setIsMobile(window.innerWidth < breakpoint || isVerticalMonitor);
            }
        };

        const debouncedCheckDevice = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkDevice, 200);
        };

        checkDevice();
        window.addEventListener('resize', debouncedCheckDevice);
        return () => {
            window.removeEventListener('resize', debouncedCheckDevice);
            clearTimeout(timeoutId);
        };
    }, [options]);

    return isMobile;
};

export default useIsMobile;