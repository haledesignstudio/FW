import React, { useState } from 'react';

function getRandomDatelineNumber() {
  return Math.floor(Math.random() * 40) + 1;
}

const mockMindbullets = Array.from({ length: 40 }).map((_, i) => {
  const datelineNum = getRandomDatelineNumber();
  return {
    _id: `mb${i}`,
    title: `Mindbullet Title ${i + 1}`,
    publishedDate: `2025-07-${(i % 30) + 1}`,
    dateline: `Dateline ${datelineNum}`,
    headImage: { url: `https://picsum.photos/seed/${i}/120/120` },
  };
});

const PAGE_SIZE = 10;

type SortField = 'publishedDate' | 'dateline';
type SortDirection = 'asc' | 'desc';

const MindbulletArchive = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortField>('publishedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const sorted = [...mockMindbullets].sort((a, b) => {
    if (sortBy === 'dateline') {
      const numA = parseInt(a.dateline.replace(/\D/g, ''), 10);
      const numB = parseInt(b.dateline.replace(/\D/g, ''), 10);
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    } else {
      const dateA = new Date(a.publishedDate);
      const dateB = new Date(b.publishedDate);
      return sortDirection === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }
  });

  const displayed = sorted.slice(0, page * PAGE_SIZE);

  return (
    <div className="w-full relative mt-[20vh]">
      <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 w-full">
        {/* Headings */}
        <div className="col-span-3 text-2xl font-bold flex items-end">
          Mindbullets Archive
        </div>
        <div className="col-start-5 font-bold flex items-end">
          <button onClick={() => handleSort('publishedDate')} className="flex items-center cursor-pointer">
            <span
              className={`transition-transform duration-200 ${sortBy === 'publishedDate' && sortDirection === 'asc'
                  ? 'rotate-[-90deg]'
                  : 'rotate-0'
                }`}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M12 19l6-6M12 19l-6-6" />
              </svg>
            </span>
            Date Published
          </button>
        </div>
        <div className="col-start-6 font-bold flex items-end">
          <button onClick={() => handleSort('dateline')} className="flex items-center cursor-pointer">
            <span
              className={`transition-transform duration-200 ${sortBy === 'dateline' && sortDirection === 'asc'
                  ? 'rotate-[-90deg]'
                  : 'rotate-0'
                }`}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M12 19l6-6M12 19l-6-6" />
              </svg>
            </span>
            Dateline
          </button>
        </div>

        {/* Titles */}
        <div className="col-span-3">
          <ul className="space-y-2">
            {displayed.map((mb) => (
              <li key={mb._id}>
                <span
                  className="cursor-pointer"
                  onMouseMove={(e) => {
                    setMousePos({ x: e.clientX, y: e.clientY });
                    setHoveredImage(mb.headImage.url);
                  }}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  {mb.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-start-4" />

        {/* Dates */}
        <div className="col-start-5">
          <ul className="space-y-2">
            {displayed.map((mb) => (
              <li key={mb._id}>{mb.publishedDate}</li>
            ))}
          </ul>
        </div>

        {/* Datelines */}
        <div className="col-start-6">
          <ul className="space-y-2">
            {displayed.map((mb) => (
              <li key={mb._id}>{mb.dateline}</li>
            ))}
          </ul>
        </div>

        {/* Show More */}
        <div className="col-span-6 mt-4">
          {displayed.length < sorted.length && (
            <button
              className="text-400 underline bg-transparent border-none p-0 m-0 hover:text-600 transition-colors duration-150"
              style={{ boxShadow: 'none' }}
              onClick={() => setPage(page + 1)}
            >
              Show More
            </button>
          )}
        </div>
      </div>

      {/* Hover Image */}
      {hoveredImage && (
        <img
          src={hoveredImage}
          alt="Mindbullet"
          style={{
            position: 'fixed',
            top: mousePos.y + 10,
            left: mousePos.x + 10,
            width: 120,
            height: 120,
            pointerEvents: 'none',
            border: '2px solid #ccc',
            background: '#fff',
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default MindbulletArchive;
