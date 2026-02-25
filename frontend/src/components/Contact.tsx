import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2, Phone, Mail, User, MapPin } from 'lucide-react';
import { SiWhatsapp, SiInstagram, SiFacebook } from 'react-icons/si';
import { useSubmitContactForm } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: '', email: '', message: '' };

const OWNER = {
  name: 'Arpan Ghosh',
  phone: '6294577453',
  altPhone: '8617376874',
  email: 'arpanghosh232@gmail.com',
  whatsapp: 'https://wa.me/916294577453',
  instagram: 'https://www.instagram.com/babaikhushi_0305',
  facebook: 'https://www.facebook.com/share/1CxeHPxYJv/',
  location: 'Diamond Harbour, Falta',
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const mutation = useSubmitContactForm();

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(
      { name: form.name, email: form.email, message: form.message },
      {
        onSuccess: () => {
          setForm(initialForm);
          setErrors({});
        },
      }
    );
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <div>
            <p className="font-body text-sm font-semibold tracking-[0.16em] uppercase text-accent mb-4">
              Get in Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 text-balance">
              Order Directly or Say Hello
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10">
              Reach out to place an order, ask about our candles, or just say hi!
              The quickest way to order is via WhatsApp — we'll get back to you right away.
            </p>

            {/* Contact details */}
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-accent" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Owner
                  </span>
                  <span className="font-body text-base text-foreground">{OWNER.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={16} className="text-accent" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Phone
                  </span>
                  <a
                    href={`tel:+91${OWNER.phone}`}
                    className="font-body text-base text-foreground hover:text-accent transition-colors"
                  >
                    +91 {OWNER.phone}
                  </a>
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-xs text-muted-foreground">Alt:</span>
                    <a
                      href={`tel:+91${OWNER.altPhone}`}
                      className="font-body text-sm text-foreground hover:text-accent transition-colors"
                    >
                      +91 {OWNER.altPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Location
                  </span>
                  <span className="font-body text-base text-foreground">{OWNER.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-accent" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Email
                  </span>
                  <a
                    href={`mailto:${OWNER.email}`}
                    className="font-body text-base text-foreground hover:text-accent transition-colors"
                  >
                    {OWNER.email}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp order button */}
            <a
              href={OWNER.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] text-white font-body font-semibold text-sm hover:opacity-90 transition-opacity mb-8"
            >
              <SiWhatsapp size={18} />
              Order on WhatsApp
            </a>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: SiInstagram, label: 'Instagram', href: OWNER.instagram },
                { Icon: SiFacebook, label: 'Facebook', href: OWNER.facebook },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors duration-200 text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="font-body text-sm font-medium text-foreground">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  className={`font-body bg-background ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="font-body text-xs text-destructive flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="font-body text-sm font-medium text-foreground">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`font-body bg-background ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && (
                  <p className="font-body text-xs text-destructive flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="font-body text-sm font-medium text-foreground">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what you'd like to order or ask..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`font-body bg-background resize-none ${errors.message ? 'border-destructive' : ''}`}
                />
                {errors.message && (
                  <p className="font-body text-xs text-destructive flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.message}
                  </p>
                )}
              </div>

              {mutation.isSuccess && (
                <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg text-accent font-body text-sm">
                  <CheckCircle size={16} />
                  Message sent! We'll get back to you soon.
                </div>
              )}

              {mutation.isError && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg text-destructive font-body text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-3 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
