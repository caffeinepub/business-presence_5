import { CheckCircle2 } from 'lucide-react';

const trustItems = [
  { label: '100% Handcrafted' },
  { label: 'Long-Lasting Fragrance' },
  { label: 'Safe & Smokeless' },
  { label: 'Home Delivery Available' },
];

export default function TrustBadges() {
  return (
    <section className="bg-sand-light border-y border-sand-dark/20 py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 text-center group"
            >
              {/* Enhanced icon with gradient background and border */}
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-accent/25 to-accent/10 border-2 border-accent/40 group-hover:border-accent/60 group-hover:shadow-lg transition-all duration-200 shadow-md">
                <CheckCircle2
                  className="w-7 h-7 text-accent drop-shadow-sm"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
              <span className="font-body text-sm md:text-base font-semibold text-foreground leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
