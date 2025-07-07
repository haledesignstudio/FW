// footer.tsx
import React from "react";

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

const items: GridItem[] = [
    {
        id: 1,
        content: (
            <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                Social
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
            <ul className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                <li><a href="https://www.google.com">RSS</a></li>
                <li><a href="https://www.openai.com">Instagram</a></li>
                <li><a href="https://www.github.com">Twitter</a></li>
                <li><a href="https://www.github.com">Facebook</a></li>
                <li><a href="https://www.github.com">Linkedin</a></li>
                <li><a href="https://www.github.com">Discord</a></li>
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
            <h2 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] font-bold leading-tight">
                Quick Links
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
            <ul className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                <li><a href="https://www.google.com">Contact</a></li>
                <li><a href="https://www.openai.com">Keynotes</a></li>
                <li><a href="https://www.github.com">Join us</a></li>
                <li><a href="https://www.github.com">FAQs</a></li>
                <li><a href="https://www.github.com">Privacy policy</a></li>
                <li><a href="https://www.github.com">Terms and conditions</a></li>
                <li><a href="https://www.github.com">Shareholder Value Analytics</a></li>
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
                <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] leading-tight">
                    Subscribe for news from the future
                </p>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your e-mail"
                    required
                    className="outline-none border-none bg-transparent text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] text-base placeholder-gray placeholder:font-bold placeholder:text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:placeholder:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:placeholder:text-[4vh]"
                />
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
    const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col','justify-end'];

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

// ✅ Exporting as Footer
const Footer: React.FC = () => {
    return (
        <footer className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
                    {items.map((item) => (
                        <div key={item.id} className={getGridClasses(item)}>
                            {item.content}
                        </div>
                    ))}
                </div>
            </footer>
    );
};

export default Footer;
