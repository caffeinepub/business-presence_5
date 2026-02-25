import { X, Heart } from 'lucide-react';
import type { Product } from '../App';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (productId: string) => void;
}

export default function Wishlist({
  isOpen,
  onClose,
  items,
  onRemoveItem,
}: WishlistProps) {
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
        aria-label="Wishlist"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-accent fill-accent" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Wishlist
            </h2>
            {items.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-bold font-body">
                {items.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <Heart size={48} className="text-muted-foreground/30" strokeWidth={1} />
              <p className="font-body text-muted-foreground text-sm">
                Your wishlist is empty.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full border border-border text-sm font-body font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 bg-background rounded-lg border border-border"
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-body text-sm font-semibold text-foreground leading-snug">
                      {product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="flex-shrink-0 p-0.5 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="font-body text-lg font-bold text-accent mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
