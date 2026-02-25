import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import About from './components/About';
import Products from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import CheckoutModal from './components/CheckoutModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import OwnerPhoto from './components/OwnerPhoto';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Checkout state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cart handlers
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist handlers
  const toggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
  };

  // Checkout handlers
  const openCheckout = (items: CartItem[]) => {
    setCheckoutItems(items);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = (product: Product) => {
    openCheckout([{ product, quantity: 1 }]);
  };

  const handleCartCheckout = () => {
    openCheckout(cartItems);
    setIsCartOpen(false);
  };

  const handleOrderComplete = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        cartItemCount={cartItemCount}
        wishlistItemCount={wishlistItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      <main>
        <Hero onCtaClick={scrollToContact} />
        <TrustBadges />
        <About />
        <Products
          wishlistItems={wishlistItems}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          onPlaceOrder={handlePlaceOrder}
        />
        <Contact />
      </main>
      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCartCheckout}
      />

      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={removeFromWishlist}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        orderItems={checkoutItems}
        onOrderComplete={handleOrderComplete}
      />

      {/* Fixed bottom-right elements */}
      <OwnerPhoto />
      <FloatingWhatsApp />
    </div>
  );
}
