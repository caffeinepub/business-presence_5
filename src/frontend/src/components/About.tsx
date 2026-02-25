import { Award, Users, Sparkles } from 'lucide-react';

const stats = [
  { icon: Award, value: '100%', label: 'Handcrafted with Love' },
  { icon: Users, value: '🌱', label: 'Growing Community of Happy Customers' },
  { icon: Sparkles, value: '✦', label: 'Glow Your Beautiful Moments' },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div>
            <p className="font-body text-sm font-semibold tracking-[0.16em] uppercase text-accent mb-4">
              About Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 text-balance">
              It Is My Dream Business
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-5">
              Handcrafted candles made with love by <strong className="text-foreground">Melt &amp; Glow</strong> —
              born from a deep passion for handcrafted beauty and the
              warmth that a single candle can bring to any space. Every candle we create
              is a piece of that dream — made with love, care, and the finest ingredients.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              Based in Diamond Harbour, Falta, the <strong className="text-foreground">MG</strong> team pours their heart into every product,
              believing that the right candle can transform an ordinary moment into
              something truly magical. This is more than a business — it's a calling.
            </p>
            <button
              type="button"
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 font-body font-semibold text-orange-500 hover:gap-3 transition-all duration-200 group"
            >
              Order Now
              <span className="text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </div>

          {/* Stats - Enhanced icons */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-6 p-6 bg-card rounded-lg shadow-card border border-border hover:shadow-card-hover transition-shadow duration-300"
              >
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-lg bg-orange-50 border-2 border-orange-300 flex items-center justify-center"
                  style={{boxShadow:'0 0 12px 4px rgba(251,146,60,0.40)'}}
                >
                  <Icon className="w-8 h-8 text-orange-500" strokeWidth={2} style={{filter:'drop-shadow(0 0 5px rgba(251,146,60,0.7))'}} />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">{value}</p>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
