import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import type { CartItem } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-card shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
      >
        {/* Header - Enhanced icon */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center border border-accent/30">
              <ShoppingCart size={18} className="text-accent drop-shadow-sm" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold font-body">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <ShoppingCart size={48} className="text-muted-foreground/30" strokeWidth={1} />
              <p className="font-body text-muted-foreground text-sm">
                Your cart is empty.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full border border-border text-sm font-body font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-background rounded-lg border border-border"
              >
                <img
                  src={item.product.image}
                  alt={item.product.alt}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-body text-sm font-semibold text-foreground leading-snug truncate">
                      {item.product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      aria-label={`Remove ${item.product.name}`}
                      className="flex-shrink-0 p-0.5 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  {/* Enhanced price display in cart */}
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent/10 border border-accent/30 mt-0.5">
                    <span className="font-body text-base font-bold text-accent">
                      ₹{item.product.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      className="w-7 h-7 rounded-full border-2 border-accent/30 flex items-center justify-center hover:bg-accent/10 transition-all text-accent shadow-sm"
                    >
                      <Minus size={14} strokeWidth={2.5} />
                    </button>
                    <span className="font-body text-sm font-semibold text-foreground w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="w-7 h-7 rounded-full border-2 border-accent/30 flex items-center justify-center hover:bg-accent/10 transition-all text-accent shadow-sm"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                    </button>
                    <span className="ml-auto font-body text-sm font-bold text-accent">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - Enhanced price display */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-muted-foreground">Subtotal</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/40">
                <span className="font-display text-2xl font-bold text-accent">
                  ₹{subtotal}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="w-full py-3 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:opacity-90 hover:shadow-lg active:scale-95 transition-all duration-200 shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
