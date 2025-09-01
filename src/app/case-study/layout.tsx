import Header from '@/components/header';
import Footer from '@/components/footer';
import MainTitleAnimation from '@/components/MainTitleAnimation';

export const revalidate = 60;

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  // Placeholder for main title, can be replaced with dynamic value
  const mainTitle = 'Case Study';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-[4.53vw] py-[2.09vh] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        <div className="max-w-full w-full mx-auto">
          <div className="flex items-end w-full overflow-hidden mb-8 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:mb-[3.2vh]">
            <div className="w-full max-w-full [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:h-[21vh]">
              <MainTitleAnimation
                text={mainTitle}
                typeSpeed={60}
                delay={500}
                className="dt-h2"
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
