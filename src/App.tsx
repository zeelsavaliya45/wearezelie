import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import { Product, CartItem } from './types';

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Elegant Diamond Ring",
    price: 2499,
    images: [
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
      "https://images.pexels.com/photos/2735037/pexels-photo-2735037.jpeg"
    ],
    description: "Exquisite diamond ring crafted with precision and elegance. Features a stunning center stone surrounded by delicate accent diamonds.",
    category: "Rings",
    inStock: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    name: "Pearl Drop Earrings",
    price: 899,
    images: [
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      "https://images.pexels.com/photos/2735037/pexels-photo-2735037.jpeg"
    ],
    description: "Classic pearl drop earrings that add timeless elegance to any outfit. Made with genuine freshwater pearls.",
    category: "Earrings",
    inStock: true,
    rating: 4.9,
    reviews: 18
  },
  {
    id: 3,
    name: "Gold Tennis Bracelet",
    price: 1899,
    images: [
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg"
    ],
    description: "Stunning gold tennis bracelet with brilliant cut diamonds. Perfect for special occasions or everyday luxury.",
    category: "Bracelets",
    inStock: true,
    rating: 4.7,
    reviews: 32
  },
  {
    id: 4,
    name: "Vintage Sapphire Necklace",
    price: 3299,
    images: [
      "https://images.pexels.com/photos/2735037/pexels-photo-2735037.jpeg",
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg"
    ],
    description: "Magnificent vintage-inspired sapphire necklace with intricate metalwork. A true statement piece.",
    category: "Necklaces",
    inStock: true,
    rating: 5.0,
    reviews: 15
  },
  {
    id: 5,
    name: "Rose Gold Wedding Band",
    price: 1299,
    images: [
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      "https://images.pexels.com/photos/2735037/pexels-photo-2735037.jpeg"
    ],
    description: "Beautiful rose gold wedding band with a brushed finish. Symbolizes eternal love and commitment.",
    category: "Rings",
    inStock: true,
    rating: 4.6,
    reviews: 28
  },
  {
    id: 6,
    name: "Emerald Pendant",
    price: 1799,
    images: [
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      "https://images.pexels.com/photos/2735037/pexels-photo-2735037.jpeg"
    ],
    description: "Striking emerald pendant with diamond accents. The perfect centerpiece for any jewelry collection.",
    category: "Necklaces",
    inStock: false,
    rating: 4.8,
    reviews: 12
  }
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(sampleProducts.map(p => p.category)))];

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setShowCheckout(false);
    alert('Order placed successfully! Thank you for shopping with Zelie.');
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setShowCart(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main>
        <Hero />
        
        <ProductGrid
          products={filteredProducts}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onProductClick={setSelectedProduct}
          onAddToCart={addToCart}
        />
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          totalPrice={getTotalPrice()}
        />
      )}

      {showCheckout && (
        <Checkout
          items={cartItems}
          totalPrice={getTotalPrice()}
          onClose={() => setShowCheckout(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </div>
  );
}

export default App;