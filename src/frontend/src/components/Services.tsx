import type { Product, CartItem } from '../App';
import { Heart, ShoppingCart, ShoppingBag } from 'lucide-react';

const PRODUCTS: Product[] = [
  {
    id: 'couple-candle',
    image: '/assets/IMG_20260226_003915.jpg',
    name: 'Couple Candle',
    price: 199,
    alt: 'Couple Candle – two figures embracing with lit wicks',
  },
  {
    id: 'rose-pillar-candle',
    image: '/assets/IMG_20260226_003856.jpg',
    name: 'Rose Pillar Candle',
    price: 150,
    alt: 'Rose Pillar Candle – golden pillar candle with rose texture',
  },
  {
    id: 'bubble-candle',
    image: '/assets/IMG_20260226_003932.jpg',
    name: 'Bubble Candle',
    price: 160,
    alt: 'Bubble Candle – blue bubble-shaped candles',
  },
  {
    id: 'jar-candle',
    image: '/assets/IMG_20260226_003830.jpg',
    name: 'Jar Candle',
    price: 130,
    alt: 'Jar Candle – white candle in a glass jar with herbs',
  },
];

interface ProductsProps {
  wishlistItems: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onPlaceOrder: (product: Product) => void;
}

export default function Products({
  wishlistItems,
  onAddToCart,
  onToggleWishlist,
  onPlaceOrder,
}: ProductsProps) {
  const isInWishlist = (productId: string) =>
    wishlistItems.some((p) => p.id === productId);

  return (
    <section id="products" className="section-padding bg-sand">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-sm font-semibold tracking-[0.16em] uppercase text-accent mb-4">
            Our Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Handcrafted Candles
          </h2>
          <p className="font-display text-xl md:text-2xl italic text-accent font-normal mb-5">
            ✦ Glow Your Beautiful Moments ✦
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Each candle is lovingly hand-poured with premium wax and natural fragrances —
            perfect for gifting or creating your own cosy ambiance.
          </p>
        </div>

        {/* Product cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => {
            const wishlisted = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Product image */}
                <div className="relative overflow-hidden aspect-[4/5] bg-muted">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                   {/* Wishlist heart icon on image - Enhanced with orange glow */}
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                      wishlisted
                        ? 'bg-orange-500 text-white scale-110 border-orange-300'
                        : 'bg-white/95 text-orange-500 hover:bg-orange-500 hover:text-white hover:scale-105 border-orange-300/60'
                    }`}
                    style={{boxShadow: '0 0 10px 3px rgba(251,146,60,0.55)'}}
                  >
                    <Heart
                      size={18}
                      className={`${wishlisted ? 'fill-current' : ''}`}
                      style={{filter: 'drop-shadow(0 0 4px rgba(251,146,60,0.8))'}}
                    />
                  </button>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-4 gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-2">
                      {product.name}
                    </h3>
                    {/* Price display with black shadow/glow */}
                    <div
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-br from-gray-900/90 to-gray-800/80 border-2 border-gray-700"
                      style={{ boxShadow: '0 0 16px 5px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.9)' }}
                    >
                      <span
                        className="font-body text-3xl font-extrabold text-white"
                        style={{ textShadow: '0 0 12px rgba(0,0,0,1), 0 0 24px rgba(0,0,0,0.8)' }}
                      >
                        ₹{product.price}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 mt-auto">
                     {/* Place Order - Orange glow */}
                    <button
                      type="button"
                      onClick={() => onPlaceOrder(product)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-orange-500 text-white text-sm font-semibold font-body hover:bg-orange-600 active:scale-95 transition-all duration-200 btn-orange-glow"
                    >
                      <ShoppingBag size={16} style={{filter:'drop-shadow(0 0 4px rgba(255,255,255,0.8))'}} />
                      Place Order
                    </button>

                    {/* Add to Cart - Orange outline with glow */}
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white border-2 border-orange-400 text-orange-500 text-sm font-semibold font-body hover:bg-orange-500 hover:text-white active:scale-95 transition-all duration-200"
                      style={{boxShadow:'0 0 10px 2px rgba(251,146,60,0.40)'}}
                    >
                      <ShoppingCart size={16} style={{filter:'drop-shadow(0 0 3px rgba(251,146,60,0.7))'}} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
