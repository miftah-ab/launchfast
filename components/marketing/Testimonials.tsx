import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Saved me 2 weeks of setup. Auth and billing just worked. I went from idea to live SaaS in a single weekend.",
    name: "Alex M.",
    role: "Founder",
    initials: "AM",
    stars: 5,
    color: "bg-blue-600",
  },
  {
    quote: "The cleanest SaaS boilerplate I've used. Code is easy to extend and the architecture decisions are solid.",
    name: "Sarah K.",
    role: "Developer",
    initials: "SK",
    stars: 5,
    color: "bg-purple-600",
  },
  {
    quote: "Shipped my MVP in 3 days using LaunchFast. The Stripe integration alone would have taken me a week.",
    name: "James R.",
    role: "Indie Hacker",
    initials: "JR",
    stars: 5,
    color: "bg-green-600",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Loved by indie hackers
          </h2>
          <p className="text-xl text-muted-foreground">
            Don&apos;t take our word for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, initials, stars, color }) => (
            <div
              key={name}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
