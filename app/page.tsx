import Reveal from "./components/reveal/revealWrapper"
import WorkGallery from "./components/home/workGallery"
import HeroSection from "./components/home/heroGrid"
import Unplugged from "./components/home/unplugged"
import Testimonials from "./components/home/testimonials"
import Footer from "./components/home/footer"

export default function Home() {
  return (
    <div className="bg-[#f5f5f5]">
      {/*
        100dvh = dynamic viewport height (excludes mobile browser chrome) and
        matches window.innerHeight exactly. The old 100vh spacer was taller than
        window.innerHeight on mobile, leaving a blank dead zone after the reveal.
      */}
      <div style={{ height: '100dvh' }} />

      <WorkGallery />
      <HeroSection />
      <Unplugged />
      <Testimonials />
      <Footer />

      <Reveal />
    </div>
  )
}
