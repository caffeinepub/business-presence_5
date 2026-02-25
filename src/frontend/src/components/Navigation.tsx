import { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingCart, Heart, Camera } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
];

const LOGO_STORAGE_KEY = 'brandLogoCustom';
const DEFAULT_LOGO = '/assets/generated/logo-candle.dim_256x256.png';

interface NavigationProps {
  cartItemCount?: number;
  wishlistItemCount?: number;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
}

export default function Navigation({
  cartItemCount = 0,
  wishlistItemCount = 0,
  onCartClick,
  onWishlistClick,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>(DEFAULT_LOGO);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved logo from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOGO_STORAGE_KEY);
    if (saved) {
      setLogoSrc(saved);
    }
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setLogoSrc(dataUrl);
        localStorage.setItem(LOGO_STORAGE_KEY, dataUrl);
      }
    };
    reader.readAsDataURL(file);

    // Reset input so the same file can be re-selected if needed
    e.target.value = '';
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If shift/ctrl/alt is pressed, open file picker to change logo
    if (e.shiftKey || e.ctrlKey || e.altKey || isLogoHovered) {
      e.preventDefault();
      logoFileInputRef.current?.click();
    } else {
      // Normal click: scroll to top
      handleNavClick('#hero');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-sm shadow-xs border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="relative">
          <button
            type="button"
            onClick={handleLogoClick}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            className="flex items-center gap-3 group"
            aria-label="Go to top or change logo"
          >
            <div className="relative">
              <img
                src={logoSrc}
                alt="Melt & Glow logo"
                className="h-9 w-9 object-contain rounded-sm"
              />
              {/* Edit overlay on hover */}
              <div
                className={`absolute inset-0 rounded-sm flex items-center justify-center bg-black/60 transition-opacity duration-200 ${
                  isLogoHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Camera className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-display font-semibold text-lg text-foreground tracking-tight leading-tight">
                Melt &amp; Glow
              </span>
              <span className="hidden sm:block font-body text-xs italic text-accent opacity-80 leading-tight tracking-wide">
                Glow Your Beautiful Moments
              </span>
            </div>
          </button>

          {/* Hidden file input */}
          <input
            ref={logoFileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={handleLogoFileChange}
            aria-label="Change brand logo"
          />
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="font-body text-sm font-medium text-muted-foreground hover:text-accent transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-accent after:transition-all hover:after:w-full"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Wishlist icon */}
          <button
            type="button"
            onClick={onWishlistClick}
            aria-label={`Wishlist (${wishlistItemCount} items)`}
            className="relative p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
          >
            <Heart size={20} />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center leading-none">
                {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
              </span>
            )}
          </button>

          {/* Cart icon */}
          <button
            type="button"
            onClick={onCartClick}
            aria-label={`Cart (${cartItemCount} items)`}
            className="relative p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center leading-none">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('#contact')}
            className="ml-1 inline-flex items-center px-5 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium font-body hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile right actions */}
        <div className="md:hidden flex items-center gap-1">
          <button
            type="button"
            onClick={onWishlistClick}
            aria-label={`Wishlist (${wishlistItemCount} items)`}
            className="relative p-2 rounded-full text-foreground hover:text-accent transition-colors"
          >
            <Heart size={20} />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center leading-none">
                {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onCartClick}
            aria-label={`Cart (${cartItemCount} items)`}
            className="relative p-2 rounded-full text-foreground hover:text-accent transition-colors"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center leading-none">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-sm border-b border-border px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left font-body text-base font-medium text-foreground hover:text-accent transition-colors py-1"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('#contact')}
                className="w-full mt-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-medium font-body hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
