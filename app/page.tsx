import PillarEditor from "./components/home/PillarEditor"
import ParallaxImages from "./components/home/ParallaxImages"
import EmailSection from "./components/home/EmailSection"
import ProjectsList from "./components/home/ProjectsList"
import { Great_Vibes, Playfair_Display } from "next/font/google"

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" })
const playfairDisplay = Playfair_Display({ subsets: ["latin"], display: "swap" })


export default function Home() {
  return (
    <div className="bg-transparent relative">
      <PillarEditor />

      {/* First fold — name + description, full viewport height */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <div className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center items-center text-center gap-6 overflow-hidden md:overflow-visible">
          <ParallaxImages />

          {/* Text isolated above the bloom layer so color blend doesn't affect it */}
          <div className="relative flex flex-col items-center gap-6 md:bg-transparent md:px-6 md:py-4" style={{ zIndex: 5 }}>
            <h1 className="text-4xl md:text-5xl tracking-tight text-black">
              <span className={greatVibes.className} style={{ fontSize: '1.55em' }}>S</span>
              <span className={playfairDisplay.className} style={{ marginLeft: '4px' }}>uprith </span>
              <span className={`${greatVibes.className} gv-initial`} style={{ fontSize: '1.55em' }}>R</span>
              <span className={playfairDisplay.className} style={{ marginLeft: '4px' }}>ao</span>
            </h1>
            <p
              className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md"
              style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: '300' }}
            >
              I build compulsively, not performatively and I'm looking for a small team where the work is serious, the stakes are real, and I'm trusted with more than just a title.
            </p>
          </div>
          {/* Email box — absolutely anchored to bottom of first fold, not part of centered group */}
          <div className="absolute bottom-28 md:bottom-20 left-0 right-0 flex justify-center items-center" style={{ zIndex: 20 }}>
            <EmailSection />
          </div>
        </div>
      </div>

      {/* Work section — slightly wider layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div data-section="work" />
        <ProjectsList />
      </div>

    </div>
  )
}
