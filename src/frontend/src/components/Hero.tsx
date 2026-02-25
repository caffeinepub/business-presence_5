interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/hero-banner.dim_1440x600.png')`,
        }}
        aria-hidden="true"
      />
      {/* Overlay for text contrast */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(30,18,10,0.62) 0%, rgba(60,30,15,0.38) 60%, rgba(20,12,6,0.55) 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p className="font-body text-sm font-medium tracking-[0.18em] uppercase text-white/70 mb-5 animate-fade-up">
          Welcome to Melt &amp; Glow
        </p>
        <h1
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 text-balance animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          Handcrafted Candles,{' '}
          <span className="italic font-normal">Pure Magic</span>
        </h1>

        {/* Tagline */}
        <p
          className="font-display text-2xl md:text-3xl italic font-normal text-white/95 mb-4 animate-fade-up tracking-wide"
          style={{ animationDelay: '0.18s' }}
        >
          ✦ Glow Your Beautiful Moments ✦
        </p>

        {/* Creator tagline */}
        <p
          className="font-body text-base md:text-lg font-medium text-white/80 mb-6 animate-fade-up tracking-wide"
          style={{ animationDelay: '0.22s' }}
        >
          Handcrafted candles made with love by <span className="text-white font-semibold">Arpan Ghosh</span>
        </p>

        <p
          className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.28s' }}
        >
          Every candle is lovingly hand-poured with premium wax and natural fragrances —
          crafted to make your special moments shine brighter.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: '0.35s' }}
        >
          <button
            type="button"
            onClick={onCtaClick}
            className="px-8 py-3.5 rounded-full bg-orange-500 text-white font-body font-semibold text-base hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5 btn-orange-glow"
          >
            Shop Now
          </button>
          <button
            type="button"
            onClick={() => {
              document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full border-2 border-white/50 text-white font-body font-medium text-base hover:bg-white/10 transition-all duration-200"
          >
            View Products
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <div className="w-px h-10 bg-white/30" />
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
