// app/test/page.tsx
'use client';

import Carousel from '@/components/CareerCarousel';



export default function Page() {
  return (
    <div className="min-h-screen bg-[#F9F7F2] text-black p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-roboto-bold">Test: Six-Column Carousel</h1>

      <Carousel
        items={[
          { src: "/menu-home.png", heading: "Moon colonists suspend mineral supply to earth", description: "Settlers declare independenle, almost half of whom have never lived anywhere else.Settlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere elseSettlers declare independenle, almost half of whom have never lived anywhere else" },
          { src: "/menu-people.png", heading: "Forest", description: "Misty and moody" },
          { src: "/menu-insights.png", heading: "Ocean", description: "Breakers at dusk" },
          { src: "/menu-what-we-do.png", heading: "City", description: "Neon nights" },
          { src: "/menu-contact.png", heading: "Desert", description: "Dunes and horizons" },
          { src: "/menu-home.png", heading: "Moon colonists suspend mineral supply to earth", description: "Settlers declare independence, threaten trade ark-siprocessem have never lived anywhere else." },
          { src: "/menu-people.png", heading: "Forest", description: "Misty and moody" },
          
        ]}

      />

    </div>
  );
}
