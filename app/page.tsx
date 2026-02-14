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
        {[
          '#f7e3d5', // warm peach
          '#d5e8f0', // soft blue
          '#e8f0d5', // sage green
          '#f0d5e8', // dusty rose
          '#e8e0d5', // warm sand
          '#d5e0f0', // pale blue-gray
          '#f0e8d5', // cream
          '#e0d5f0', // lavender
        ].map((color, index) => (
          <div
            key={index}
            className="rounded-lg p-6 aspect-square flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="text-gray-700">Card {index + 1}</span>
          </div>
        ))}
      </div>
      <Reveal />
    </div>
  )
}