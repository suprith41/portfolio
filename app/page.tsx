import WorkGallery from "./components/home/workGallery"
import { Plus } from "./components/ui/Markers"

export default function Home() {
  return (
    <div className="bg-white min-h-screen mt-16 px-4 md:px-0">
      <div className="relative overflow-visible max-w-5xl mx-auto border-l border-r border-t border-gray-200">
        <Plus h="left" v="top" />
        <Plus h="right" v="top" />

        {/* Title row */}
        <div className="relative overflow-visible flex items-center justify-between px-6 md:px-10 py-4 border-b border-gray-200">
          <span
            className="text-[10px] uppercase tracking-widest text-gray-400"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Portfolio
          </span>
          <h1
            className="text-2xl md:text-4xl font-light tracking-tight"
            style={{ fontFamily: 'Garamond, Georgia, serif' }}
          >
            Satish Hebbal
          </h1>
          <span
            className="text-[10px] uppercase tracking-widest text-gray-400"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            2026
          </span>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        <WorkGallery />
      </div>
    </div>
  )
}
