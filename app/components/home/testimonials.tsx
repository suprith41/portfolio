import GridDivider from '../ui/GridDivider'

const testimonials = [
  {
    id: 1,
    quote: "Satish brought structure to our chaos. Before him, we were shipping screens without a real system. He helped us define our design language from scratch — it gave the whole team clarity.",
    name: 'Founder, Early-stage SaaS',
    role: 'Placeholder · Replace with real',
  },
  {
    id: 2,
    quote: "What stood out was how fast he grasped our product context. Within days he was designing flows that felt native to our users. We went from concept to testable prototype in two weeks.",
    name: 'Co-founder, B2B Product',
    role: 'Placeholder · Replace with real',
  },
  {
    id: 3,
    quote: "He doesn't just hand off screens — he thinks about the whole experience. Working with Satish felt like having a design co-founder on the team.",
    name: 'CEO, Consumer App',
    role: 'Placeholder · Replace with real',
  },
]

export default function Testimonials() {
  return (
    <>
      <GridDivider />
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">

        <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-4"
           style={{ fontFamily: 'Poppins, sans-serif' }}>
          Kind Words
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-black mb-10"
            style={{ fontFamily: 'Garamond, Georgia, serif' }}>
          What founders say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id}
                 className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-6 bg-white">
              <p className="text-gray-500 text-sm leading-relaxed flex-1"
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="w-6 h-px bg-gray-200 mb-2.5" />
                <p className="text-black text-xs font-medium"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t.name}
                </p>
                <p className="text-gray-400 text-xs mt-0.5"
                   style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
