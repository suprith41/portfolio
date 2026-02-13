import Reveal from "./components/reveal/revealWrapper"

export default function Home() {
  return (
    <div className="min-h-[200vh] bg-[#f5f5f5] p-8">
      {/* Big card above the grid */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-[#f5f5f5] rounded-lg h-[1000px] flex items-center justify-center">
          
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#f7e3d5] rounded-lg p-6 aspect-square flex items-center justify-center"
          >
            <span className="text-gray-700">Card {index + 1}</span>
          </div>
        ))}
      </div>
      <Reveal />
    </div>
  )
}