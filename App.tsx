/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Dashboard from './components/Dashboard';
import { Product, JournalArticle, ViewState, Order } from './types';
import { PRODUCTS } from './constants';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dynamic State
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('aura_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(PRODUCTS);
    }

    const savedOrders = localStorage.getItem('aura_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('aura_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // Check for dashboard link (internal convention)
    if (targetId === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setView({ type: 'dashboard' });
      return;
    }

    // If we are not home, go home first
    if (view.type !== 'home') {
      setView({ type: 'home' });
      // Allow state update to render Home before scrolling
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) { }
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const placeOrder = (customer: { name: string, email: string }) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toLocaleDateString(),
      customer,
      status: 'completed'
    };

    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setView({ type: 'home' });
    alert(`Order Placed Successfully! Your Order ID is #${newOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      {view.type !== 'checkout' && view.type !== 'dashboard' && (
        <Navbar
          onNavClick={handleNavClick}
          cartCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <ProductGrid
              products={products}
              onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
              }}
            />
            <About />
            <Journal onArticleClick={(a) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView({ type: 'journal', article: a });
            }} />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail
            product={view.product}
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('products'), 50);
            }}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail
            article={view.article}
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
          <Checkout
            items={cartItems}
            onBack={() => setView({ type: 'home' })}
            onPlaceOrder={placeOrder}
          />
        )}

        {view.type === 'dashboard' && (
          <Dashboard
            products={products}
            orders={orders}
            onAddProduct={(p) => setProducts([...products, p])}
            onUpdateProduct={(p) => setProducts(products.map(old => old.id === p.id ? p : old))}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
            onBack={() => setView({ type: 'home' })}
          />
        )}
      </main>

      {view.type !== 'checkout' && view.type !== 'dashboard' && <Footer onLinkClick={handleNavClick} />}

      <Assistant />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setView({ type: 'checkout' });
        }}
      />
    </div>
  );
}

export default App;
