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
  phone: '8617376874',
  email: 'arpanghosh232@gmail.com',
  whatsapp: 'https://wa.me/918617376874',
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

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-accent" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Phone
                  </span>
                  <a
                    href={`tel:+91${OWNER.phone}`}
                    className="font-body text-base text-foreground hover:text-accent transition-colors"
                  >
                    +91 {OWNER.phone}
                  </a>
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
            <div>
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={OWNER.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-body text-foreground hover:bg-secondary hover:border-accent transition-colors"
                >
                  <SiInstagram size={15} className="text-accent" />
                  Instagram
                </a>
                <a
                  href={OWNER.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-body text-foreground hover:bg-secondary hover:border-accent transition-colors"
                >
                  <SiFacebook size={15} className="text-accent" />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-card rounded-xl border border-border shadow-card p-8 md:p-10">
            {mutation.isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                <CheckCircle className="w-14 h-14 text-accent" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  Message Sent!
                </h3>
                <p className="font-body text-muted-foreground text-sm max-w-xs">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => mutation.reset()}
                  className="mt-4 px-6 py-2.5 rounded-full border border-border text-sm font-body font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="font-body text-sm font-medium text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={mutation.isPending}
                    className={`font-body bg-background ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  {errors.name && (
                    <p className="font-body text-xs text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-body text-sm font-medium text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={mutation.isPending}
                    className={`font-body bg-background ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="font-body text-xs text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="font-body text-sm font-medium text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what you'd like to order or ask us anything..."
                    value={form.message}
                    onChange={handleChange}
                    disabled={mutation.isPending}
                    rows={5}
                    className={`font-body bg-background resize-none ${errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  {errors.message && (
                    <p className="font-body text-xs text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                {mutation.isError && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
                    <AlertCircle size={16} className="text-destructive flex-shrink-0" />
                    <p className="font-body text-sm text-destructive">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
