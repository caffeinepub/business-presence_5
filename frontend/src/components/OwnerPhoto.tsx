export default function OwnerPhoto() {
  return (
    <div
      className="fixed bottom-28 right-4 z-40 flex flex-col items-center gap-1.5"
      aria-label="Owner photo"
    >
      <div className="relative">
        {/* Decorative glow ring */}
        <div className="absolute inset-0 rounded-full bg-accent/30 blur-md scale-110 pointer-events-none" />
        <img
          src="/assets/generated/owner-photo.dim_120x120.png"
          alt="Arpan Ghosh – Owner, Melt & Glow"
          className="relative w-16 h-16 rounded-full object-cover border-2 border-accent shadow-lg"
          style={{ boxShadow: '0 4px 18px 0 rgba(0,0,0,0.18)' }}
        />
      </div>
      <span
        className="font-body text-[10px] font-semibold text-foreground/80 bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-sand-dark/20 whitespace-nowrap"
      >
        Arpan Ghosh
      </span>
    </div>
  );
}
