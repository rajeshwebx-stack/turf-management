import { TURF_INFO, AMENITIES } from '../data/mockData'

const SERVICES = [
  { title: 'Premium Surface', desc: 'State-of-the-art artificial turf for the perfect cricket experience.' },
  { title: 'Floodlit Nights', desc: 'Professional LED floodlights for seamless day and night play sessions.' },
  { title: 'Easy Booking', desc: 'Book your slot in seconds with our hassle-free online booking system.' },
  { title: 'Equipment Ready', desc: 'Bats, balls, stumps and gear available on request at the venue.' },
  { title: 'Safe & Secure', desc: '24/7 CCTV surveillance and netted boundaries for complete safety.' },
  { title: 'Spectator Area', desc: 'Covered seating gallery for friends and family to watch the action.' },
]

export default function BentoGrid() {
  return (
    <div className="bg-black w-full pt-40 min-h-screen py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 mx-auto max-w-7xl">
        {/* Card 1: Amenities (tall) */}
        <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:shadow-lg md:col-span-4 md:row-span-2 h-full">
          <div className="h-full p-6 flex flex-col justify-between">
            <div className="text-sm text-zinc-400 mb-1">Cricket Enthusiast</div>
            <div className="flex items-start">
              <div>
                <h3 className="font-medium text-zinc-200 text-lg">Everything you need for the perfect game.</h3>
              </div>
            </div>
            <div className="mt-4 flex-grow">
              <div className="grid grid-cols-2 gap-3">
                {AMENITIES.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: CTA */}
        <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:shadow-lg md:col-span-4 h-64">
          {/* Background image overlay */}
          <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-300" style={{ backgroundImage: "url('/assets/bento-turf.png')" }} />
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="relative z-10 h-full p-6 flex flex-col justify-between">
            <div className="flex items-start">
              <div>
                <h3 className="font-medium text-zinc-200 text-lg">Let's play together</h3>
                <p className="text-sm text-zinc-400 mt-1">Book your next session</p>
              </div>
            </div>
            <div className="mt-4 flex-grow relative">
              <div className="flex justify-center items-center mt-4">
                <div className="h-16 w-16 rounded-full bg-purple-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ST</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href={`mailto:${TURF_INFO?.contact?.email || 'booking@sunshineturf.com'}`}
                className="inline-flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/30 px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-black/50 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {TURF_INFO?.contact?.email || 'booking@sunshineturf.com'}
              </a>
            </div>
          </div>
        </div>

        {/* Card 3: Location */}
        <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:shadow-lg md:col-span-4 h-64">
          <div className="h-full p-6 flex flex-col justify-between">
            <div className="text-sm text-zinc-400 mb-1">📍 Location</div>
            <div className="flex items-start">
              <div>
                <h3 className="font-medium text-zinc-200 text-lg">Erode, Tamil Nadu</h3>
                <p className="text-sm text-zinc-400 mt-1">Gobichettipalayam Road</p>
              </div>
            </div>
            <div className="mt-4 flex-grow relative">
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-zinc-300 text-sm">India</span>
              </div>
            </div>
            <a
              href={TURF_INFO?.contact?.maps || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Card 4: Behind the Scenes marquee */}
        <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:shadow-lg md:col-span-8">
          <div className="h-full p-6 flex flex-col justify-between">
            <div className="text-sm text-zinc-400 mb-1">Behind the Scenes</div>
            <div className="flex items-start">
              <div>
                <h3 className="font-medium text-zinc-200 text-lg">What makes {TURF_INFO.name} special.</h3>
              </div>
            </div>
            <div className="mt-4 flex-grow relative">
              <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-[scrollLeft_30s_linear_infinite] gap-2 mt-4">
                  {[...SERVICES, ...SERVICES].map((svc, i) => (
                    <div key={i} className="h-32 bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 w-48 flex flex-col justify-center">
                      <h4 className="text-sm font-medium text-zinc-200 mb-1">{svc.title}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-3">{svc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
