import Header from '@/components/header';
import Footer from '@/components/footer';
import MainTitleAnimation from '@/components/MainTitleAnimation';

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  // Placeholder for main title, can be replaced with dynamic value
  const mainTitle = 'Case Study';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <div className="max-w-full w-full mx-auto">
          <div className="flex items-end w-full overflow-hidden mb-8">
            <div className="w-full max-w-full">
              <MainTitleAnimation
                text={mainTitle}
                typeSpeed={60}
                delay={500}
                className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
              />
            </div>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
