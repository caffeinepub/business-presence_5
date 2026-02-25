import { useState } from 'react';
import { X, CheckCircle, AlertCircle, MapPin, CreditCard, ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CartItem } from '../App';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: CartItem[];
  onOrderComplete: () => void;
}

interface AddressForm {
  fullName: string;
  streetAddress: string;
  city: string;
  pinCode: string;
  phoneNumber: string;
}

const initialAddress: AddressForm = {
  fullName: '',
  streetAddress: '',
  city: '',
  pinCode: '',
  phoneNumber: '',
};

type Step = 'address' | 'payment' | 'success';

const UPI_ID = '6294577453@ybl';

export default function CheckoutModal({
  isOpen,
  onClose,
  orderItems,
  onOrderComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>('address');
  const [address, setAddress] = useState<AddressForm>(initialAddress);
  const [errors, setErrors] = useState<Partial<AddressForm>>({});

  const total = orderItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep('address');
      setAddress(initialAddress);
      setErrors({});
    }, 300);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AddressForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateAddress = (): boolean => {
    const newErrors: Partial<AddressForm> = {};
    if (!address.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!address.streetAddress.trim()) newErrors.streetAddress = 'Street address is required.';
    if (!address.city.trim()) newErrors.city = 'City/Town is required.';
    if (!address.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required.';
    } else if (!/^\d{6}$/.test(address.pinCode)) {
      newErrors.pinCode = 'PIN code must be 6 digits.';
    }
    if (!address.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^[6-9]\d{9}$/.test(address.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid 10-digit Indian mobile number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateAddress()) {
      setStep('payment');
    }
  };

  const handleConfirmOrder = () => {
    setStep('success');
    setTimeout(() => {
      onOrderComplete();
      setTimeout(() => {
        setStep('address');
        setAddress(initialAddress);
        setErrors({});
      }, 300);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            {step === 'payment' && (
              <button
                onClick={() => setStep('address')}
                aria-label="Back to address"
                className="p-1 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground mr-1"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <h2 className="font-display text-xl font-semibold text-foreground">
              {step === 'address' && 'Delivery Address'}
              {step === 'payment' && 'Payment'}
              {step === 'success' && 'Order Placed!'}
            </h2>
          </div>
          {step !== 'success' && (
            <button
              onClick={handleClose}
              aria-label="Close checkout"
              className="p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Step indicator */}
        {step !== 'success' && (
          <div className="flex items-center gap-0 px-6 pt-4 pb-2 flex-shrink-0">
            <div className={`flex items-center gap-1.5 text-xs font-body font-semibold ${step === 'address' ? 'text-accent' : 'text-muted-foreground'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'address' ? 'bg-accent text-accent-foreground' : 'bg-accent/20 text-accent'}`}>1</span>
              Address
            </div>
            <div className="flex-1 h-px bg-border mx-2" />
            <div className={`flex items-center gap-1.5 text-xs font-body font-semibold ${step === 'payment' ? 'text-accent' : 'text-muted-foreground'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'payment' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>2</span>
              Payment
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {/* ── Step 1: Address ── */}
          {step === 'address' && (
            <div className="space-y-4">
              {/* Order summary mini */}
              <div className="bg-sand rounded-lg p-3 mb-2">
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Order Summary
                </p>
                {orderItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm font-body text-foreground">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-border mt-2 pt-2 flex justify-between font-body font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-accent">₹{total}</span>
                </div>
              </div>

              {/* Address form */}
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="font-body text-sm font-medium text-foreground">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  className={`font-body bg-background ${errors.fullName ? 'border-destructive' : ''}`}
                />
                {errors.fullName && (
                  <p className="font-body text-xs text-destructive flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="streetAddress" className="font-body text-sm font-medium text-foreground">
                  Street Address *
                </Label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  type="text"
                  placeholder="House no., street, area"
                  value={address.streetAddress}
                  onChange={handleAddressChange}
                  className={`font-body bg-background ${errors.streetAddress ? 'border-destructive' : ''}`}
                />
                {errors.streetAddress && (
                  <p className="font-body text-xs text-destructive flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.streetAddress}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="font-body text-sm font-medium text-foreground">
                    City / Town *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City or town"
                    value={address.city}
                    onChange={handleAddressChange}
                    className={`font-body bg-background ${errors.city ? 'border-destructive' : ''}`}
                  />
                  {errors.city && (
                    <p className="font-body text-xs text-destructive flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.city}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="pinCode" className="font-body text-sm font-medium text-foreground">
                    PIN Code *
                  </Label>
                  <Input
                    id="pinCode"
                    name="pinCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="6-digit PIN"
                    value={address.pinCode}
                    onChange={handleAddressChange}
                    className={`font-body bg-background ${errors.pinCode ? 'border-destructive' : ''}`}
                  />
                  {errors.pinCode && (
                    <p className="font-body text-xs text-destructive flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.pinCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber" className="font-body text-sm font-medium text-foreground">
                  Phone Number *
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={address.phoneNumber}
                  onChange={handleAddressChange}
                  className={`font-body bg-background ${errors.phoneNumber ? 'border-destructive' : ''}`}
                />
                {errors.phoneNumber && (
                  <p className="font-body text-xs text-destructive flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Step 2: Payment ── */}
          {step === 'payment' && (
            <div className="space-y-5">
              {/* Delivery address recap */}
              <div className="bg-sand rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MapPin size={13} className="text-accent" />
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Delivering to
                  </p>
                </div>
                <p className="font-body text-sm text-foreground font-semibold">{address.fullName}</p>
                <p className="font-body text-sm text-muted-foreground">
                  {address.streetAddress}, {address.city} – {address.pinCode}
                </p>
                <p className="font-body text-sm text-muted-foreground">📞 {address.phoneNumber}</p>
              </div>

              {/* Order summary */}
              <div className="bg-sand rounded-lg p-3">
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Order Summary
                </p>
                {orderItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm font-body text-foreground">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-border mt-2 pt-2 flex justify-between font-body font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-accent text-lg">₹{total}</span>
                </div>
              </div>

              {/* UPI Payment */}
              <div className="border-2 border-accent/30 rounded-xl p-4 bg-accent/5">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard size={18} className="text-accent" />
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Payment Method: UPI Only
                  </h3>
                </div>

                {/* QR Code placeholder */}
                <div className="flex flex-col items-center gap-3 py-3">
                  <div className="w-36 h-36 bg-white border-2 border-accent/20 rounded-xl flex flex-col items-center justify-center shadow-inner">
                    {/* Stylized QR placeholder */}
                    <div className="grid grid-cols-5 gap-0.5 p-2">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-[2px] ${
                            [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,6,12,18,7,11,17].includes(i)
                              ? 'bg-foreground'
                              : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-body text-[9px] text-muted-foreground mt-1">Scan to Pay</p>
                  </div>

                  <div className="text-center">
                    <p className="font-body text-xs text-muted-foreground mb-1">UPI ID</p>
                    <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-1.5">
                      <span className="font-body text-sm font-bold text-foreground tracking-wide">
                        {UPI_ID}
                      </span>
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <p className="font-body text-xs text-muted-foreground">
                      Pay <span className="font-bold text-accent">₹{total}</span> via any UPI app
                    </p>
                    <p className="font-body text-[11px] text-muted-foreground/70">
                      Google Pay · PhonePe · Paytm · BHIM
                    </p>
                  </div>
                </div>

                <div className="mt-2 p-2.5 bg-accent/10 rounded-lg">
                  <p className="font-body text-xs text-accent font-medium text-center">
                    ⚠️ After payment, click "Confirm Order" to complete your order.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Success ── */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle size={44} className="text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Order Placed! 🕯️
              </h3>
              <p className="font-body text-muted-foreground text-sm max-w-xs leading-relaxed">
                Thank you, <strong>{address.fullName}</strong>! Your order has been received.
                We'll contact you at <strong>{address.phoneNumber}</strong> to confirm delivery.
              </p>
              <p className="font-body text-xs text-muted-foreground italic">
                ✦ Glow Your Beautiful Moments ✦
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step !== 'success' && (
          <div className="px-6 py-4 border-t border-border flex-shrink-0">
            {step === 'address' && (
              <button
                onClick={handleContinueToPayment}
                className="w-full py-3 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                Continue to Payment →
              </button>
            )}
            {step === 'payment' && (
              <button
                onClick={handleConfirmOrder}
                className="w-full py-3 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                ✓ Confirm Order · ₹{total}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
