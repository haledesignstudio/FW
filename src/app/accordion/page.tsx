import HorizontalAccordion, { AccordionItem } from '@/components/HorizontalAccordion';
import VerticalAccordion from '@/components/VerticalAccordion';

const menuItems: AccordionItem[] = [
  {
    id: 'about',
    title: 'About',
    color: '#ffffff',
    content: (
      <div>
        <p className="mb-4">
          Discover the future of technology and innovation at FutureWorld. 
          We bring together the brightest minds to explore what's next.
        </p>
        <p>
          Join us as we shape tomorrow's world through cutting-edge research, 
          breakthrough technologies, and visionary thinking.
        </p>
      </div>
    )
  },
  {
    id: 'speakers',
    title: 'Speakers',
    color: '#DC5A50',
    content: (
      <div>
        <p className="mb-4">
          Meet our world-class lineup of keynote speakers, industry leaders, 
          and innovative researchers who are pushing the boundaries of what's possible.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Dr. Chris Kutarna - Futurist & Author</li>
          <li>Dr. Simons - AI Research Director</li>
          <li>Anton Musgrave - Technology Strategist</li>
          <li>Prof. Neil Jacobson - Biotechnology Pioneer</li>
        </ul>
      </div>
    )
  },
  {
    id: 'agenda',
    title: 'Agenda',
    color: '#000000',
    content: (
      <div>
        <p className="mb-4">
          A carefully curated program designed to inspire, educate, and connect 
          forward-thinking individuals from around the globe.
        </p>
        <div className="space-y-2">
          <div><strong>9:00 AM</strong> - Opening Keynote</div>
          <div><strong>10:30 AM</strong> - AI & Machine Learning Panel</div>
          <div><strong>2:00 PM</strong> - Future of Biotechnology</div>
          <div><strong>4:00 PM</strong> - Quantum Computing Workshop</div>
        </div>
      </div>
    )
  },
  {
    id: 'location',
    title: 'Location',
    color: '#ffffff',
    content: (
      <div>
        <p className="mb-4">
          Join us at the state-of-the-art FutureWorld Convention Center, 
          designed specifically for immersive tech experiences.
        </p>
        <div className="space-y-2">
          <div><strong>Address:</strong> 1 Innovation Drive, Tech City</div>
          <div><strong>Dates:</strong> July 15-17, 2025</div>
          <div><strong>Venue:</strong> Main Auditorium & Exhibition Halls</div>
          <div><strong>Parking:</strong> Complimentary on-site parking</div>
        </div>
      </div>
    )
  },
  {
    id: 'contact',
    title: 'Contact',
    color: '#DC5A50',
    content: (
      <div>
        <p className="mb-4">
          Have questions? Ready to join us? Our team is here to help make 
          your FutureWorld experience unforgettable.
        </p>
        <div className="space-y-2">
          <div><strong>Email:</strong> hello@futureworld.com</div>
          <div><strong>Phone:</strong> +1 (555) 123-4567</div>
          <div><strong>Social:</strong> @FutureWorldEvent</div>
          <div><strong>Support:</strong> 24/7 Live Chat Available</div>
        </div>
      </div>
    )
  }
];

export default function AccordionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            FutureWorld Accordian
          </h1>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
          {/* Horizontal Accordion */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Horizontal Accordion</h2>
            <HorizontalAccordion 
              items={menuItems}
              tabWidth={80}
              expandedWidth={500}
            />
          </div>
          
          {/* Vertical Accordion */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Vertical Accordion</h2>
            <VerticalAccordion 
              items={menuItems}
              tabHeight={60}
              expandedHeight={400}
            />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/test" 
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
