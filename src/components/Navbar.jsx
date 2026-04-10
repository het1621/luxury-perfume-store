"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { Menu, ShoppingBag, Search, User, X, Minus, Plus } from 'lucide-react';

export default function Navbar() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null); // <-- 1. Memory for the logged-in user
  const router = useRouter();

  const handleCheckoutNavigation = (e) => {
    e.preventDefault(); 
    router.push('/checkout');
    setIsCartOpen(false); 
  };

  useEffect(() => {
    // Check Cart
    const updateCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(savedCart);
    };

    // 2. Check Auth Status
    const checkAuth = () => {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      setUser(savedUser);
    };

    updateCart();
    checkAuth(); // Run once when page loads

    window.addEventListener('cartUpdated', updateCart);
    window.addEventListener('authChange', checkAuth); // Listen for login events

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handlePlus = (itemToAdd) => {
    const rawItem = { id: itemToAdd.id, name: itemToAdd.name, price: itemToAdd.price, category: itemToAdd.category, image: itemToAdd.image };
    const updatedCart = [...cartItems, rawItem];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleMinus = (itemId) => {
    const indexToRemove = cartItems.findIndex(item => item.id === itemId);
    if (indexToRemove !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(indexToRemove, 1);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const handleRemoveAll = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <>
      <nav className="fixed w-full z-40 top-0 flex justify-between items-center px-8 py-6 bg-black/40 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="flex items-center gap-6 hidden md:flex">
          <Link href="/products" className="text-xs tracking-[0.2em] uppercase hover:text-[#d4af37] transition-colors duration-300">Shop</Link>
          <Link href="/products" className="text-xs tracking-[0.2em] uppercase hover:text-[#d4af37] transition-colors duration-300">Collections</Link>
        </div>
        <button className="md:hidden text-white hover:text-[#d4af37] transition-colors"><Menu size={24} /></button>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-2xl font-serif tracking-[0.3em] uppercase text-white">Aura</Link>
        </div>

        <div className="flex items-center gap-6">
          
          {/* 3. THE MAGIC LOCK: Only shows if the user role is exactly 'ADMIN' */}
          {user?.role === 'ADMIN' && (
            <Link href="/admin" className="text-[10px] tracking-widest uppercase text-[#d4af37] hover:text-white transition-colors hidden sm:block">
              Admin Panel
            </Link>
          )}

          <Link href="/login" className="text-white hover:text-[#d4af37] transition-colors flex items-center gap-2">
            <User size={20} />
            {/* Bonus: Shows your name if you are logged in! */}
            {user && <span className="text-[10px] tracking-widest uppercase hidden sm:block">{user.name}</span>}
          </Link>

          <button onClick={() => setIsCartOpen(true)} className="text-white hover:text-[#d4af37] transition-colors relative">
            <ShoppingBag size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#d4af37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-500 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsCartOpen(false)} 
      />

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#050505] border-l border-white/10 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-8 border-b border-white/5">
          <h2 className="text-lg font-serif tracking-widest uppercase text-white">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {groupedItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10 text-xs tracking-widest uppercase">Your cart is empty</p>
          ) : (
            groupedItems.map((item) => (
              <div key={item.id} className="flex gap-6 mb-8">
                <div className="w-24 h-32 bg-[#0a0a0a] border border-white/5 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-serif text-white uppercase tracking-wider mb-1">{item.name}</h3>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">{item.category}</p>
                    </div>
                    <button onClick={() => handleRemoveAll(item.id)} className="text-gray-600 hover:text-red-500 transition-colors"><X size={14} /></button>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-4 border border-white/20 px-3 py-1 text-white">
                      <button onClick={() => handleMinus(item.id)} className="hover:text-[#d4af37] transition-colors"><Minus size={12} /></button>
                      <span className="text-xs">{item.quantity}</span>
                      <button onClick={() => handlePlus(item)} className="hover:text-[#d4af37] transition-colors"><Plus size={12} /></button>
                    </div>
                    <p className="text-[#d4af37] tracking-[0.1em] text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-white/5 bg-[#0a0a0a]">
          <div className="flex justify-between text-white text-sm tracking-widest uppercase mb-6">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <p className="text-[10px] text-gray-500 text-center mb-6">Shipping & taxes calculated at checkout.</p>
          
          <button 
            onClick={(e) => handleCheckoutNavigation(e)} 
            className="w-full block text-center bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#d4af37] transition-colors duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}