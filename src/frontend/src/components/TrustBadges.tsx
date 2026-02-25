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
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-accent/15 group-hover:bg-accent/25 transition-colors duration-200">
                <CheckCircle2
                  className="w-6 h-6 text-accent"
                  strokeWidth={2}
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
