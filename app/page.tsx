import HeroGrid from "./components/home/heroGrid"
import WorkGallery from "./components/home/workGallery"
import Testimonials from "./components/home/testimonials"
import Unplugged from "./components/home/unplugged"
import Footer from "./components/home/footer"
import { Plus } from "./components/ui/Markers"

export default function Home() {
  return (
    <div className="bg-white min-h-screen mt-16 px-4 md:px-0">
      <div className="relative overflow-visible max-w-5xl mx-auto border-l border-r border-t border-gray-200 rounded-t-lg">
        <Plus h="left" v="top" />
        <Plus h="right" v="top" />
        <HeroGrid />
        <WorkGallery />
        <Testimonials />
        <Unplugged />
      </div>
      <Footer />
    </div>
  )
}
