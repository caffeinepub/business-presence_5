import { Heart } from 'lucide-react';
import { SiInstagram, SiFacebook, SiWhatsapp } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'unknown-app'
  );

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/logo-mark.dim_256x256.png"
                alt="Melt & Glow logo"
                className="h-8 w-8 object-contain rounded-sm opacity-90"
              />
              <span className="font-display font-semibold text-lg">Melt &amp; Glow</span>
            </div>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-xs mb-1">
              Handcrafted candles made with love by Arpan Ghosh.
            </p>
            <p className="font-display text-sm italic text-primary-foreground/50 mb-5">
              ✦ Glow Your Beautiful Moments ✦
            </p>
            <div className="flex items-center gap-4">
              {[
                {
                  Icon: SiWhatsapp,
                  label: 'WhatsApp',
                  href: 'https://wa.me/916294577453',
                },
                {
                  Icon: SiInstagram,
                  label: 'Instagram',
                  href: 'https://www.instagram.com/babaikhushi_0305',
                },
                {
                  Icon: SiFacebook,
                  label: 'Facebook',
                  href: 'https://www.facebook.com/share/1CxeHPxYJv/',
                },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-accent/80 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-[0.14em] uppercase text-primary-foreground/40 mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'About', href: '#about' },
                { label: 'Products', href: '#products' },
                { label: 'Contact', href: '#contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-[0.14em] uppercase text-primary-foreground/40 mb-5">
              Contact
            </h3>
            <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
              <li>
                <span className="block text-primary-foreground/40 text-xs uppercase tracking-wider mb-0.5">Owner</span>
                Arpan Ghosh
              </li>
              <li>
                <span className="block text-primary-foreground/40 text-xs uppercase tracking-wider mb-0.5">Phone</span>
                <a
                  href="tel:+916294577453"
                  className="hover:text-primary-foreground transition-colors block"
                >
                  +91 62945 77453
                </a>
                <a
                  href="tel:+918617376874"
                  className="hover:text-primary-foreground transition-colors block text-primary-foreground/50 text-xs mt-0.5"
                >
                  Alt: +91 86173 76874
                </a>
              </li>
              <li>
                <span className="block text-primary-foreground/40 text-xs uppercase tracking-wider mb-0.5">Location</span>
                Diamond Harbour, Falta
              </li>
              <li>
                <span className="block text-primary-foreground/40 text-xs uppercase tracking-wider mb-0.5">Service</span>
                Glow Your Beautiful Moments
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © {year} Melt &amp; Glow. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/40 flex items-center gap-1">
            Built with{' '}
            <Heart size={11} className="text-accent fill-accent mx-0.5" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
