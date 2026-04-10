"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // <-- 1. Added Next.js router to change pages!
import { CreditCard, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter(); // <-- 2. Initialize the router

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // 3. The engine that actually "processes" the order
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is already empty!");
      return;
    }

    // A. Clear the cart from the browser's hard drive
    localStorage.removeItem('cart');
    
    // B. Clear the cart on this specific page
    setCartItems([]);
    
    // C. Shout to the Navbar to erase its badge number immediately
    window.dispatchEvent(new Event('cartUpdated'));
    
    // D. Show a success message and send them home!
    alert('Payment Successful! Thank you for shopping with Aura.');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 px-8 md:px-16 pb-24">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: Checkout Form */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <h1 className="text-3xl font-serif text-white uppercase tracking-widest mb-8">Secure Checkout</h1>
            
            <div className="mb-10">
              <h2 className="text-xs text-[#d4af37] tracking-[0.2em] uppercase mb-6">1. Contact Information</h2>
              <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-[#0a0a0a] border border-white/10 text-white text-xs tracking-widest p-4 outline-none focus:border-white/50 transition-colors placeholder-gray-600" />
            </div>

            <div className="mb-10">
              <h2 className="text-xs text-[#d4af37] tracking-[0.2em] uppercase mb-6">2. Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="FIRST NAME" className="w-full bg-[#0a0a0a] border border-white/10 text-white text-xs tracking-widest p-4 outline-none focus:border-white/50 transition-colors placeholder-gray-600" />
                <input type="text" placeholder="LAST NAME" className="w-full bg-[#0a0a0a] border border-white/10 text-white text-xs tracking-widest p-4 outline-none focus:border-white/50 transition-colors placeholder-gray-600" />
              </div>
              <input type="text" placeholder="STREET ADDRESS" className="w-full bg-[#0a0a0a] border border-white/10 text-white text-xs tracking-widest p-4 outline-none focus:border-white/50 transition-colors placeholder-gray-600 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="CITY" className="w-full bg-[#0a0a0a] border border-white/10 text-white text-xs tracking-widest p-4 outline-none focus:border-white/50 transition-colors placeholder-gray-600" />
                <input type="text" placeholder="POSTAL CODE" className="w-full bg-[#0a0a0a] border border-white/10 text-white text-xs tracking-widest p-4 outline-none focus:border-white/50 transition-colors placeholder-gray-600" />
              </div>
            </div>

            <div>
              <h2 className="text-xs text-[#d4af37] tracking-[0.2em] uppercase mb-6">3. Payment</h2>
              <div className="bg-[#0a0a0a] border border-white/10 p-6 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6 text-white">
                  <CreditCard size={20} />
                  <span className="text-xs tracking-widest uppercase">Credit / Debit Card</span>
                </div>
                <input type="text" placeholder="CARD NUMBER" className="w-full bg-transparent border-b border-white/20 text-white text-xs tracking-widest pb-2 mb-6 outline-none focus:border-white/50 transition-colors placeholder-gray-600" />
                <div className="grid grid-cols-2 gap-8">
                  <input type="text" placeholder="MM / YY" className="w-full bg-transparent border-b border-white/20 text-white text-xs tracking-widest pb-2 outline-none focus:border-white/50 transition-colors placeholder-gray-600" />
                  <input type="text" placeholder="CVC" className="w-full bg-transparent border-b border-white/20 text-white text-xs tracking-widest pb-2 outline-none focus:border-white/50 transition-colors placeholder-gray-600" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-5 relative">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 sticky top-32">
            <h2 className="text-lg font-serif text-white uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Order Summary</h2>
            
            <div className="max-h-[40vh] overflow-y-auto pr-2 mb-8">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-xs tracking-widest uppercase text-center py-8">Your cart is empty</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex gap-6 mb-6">
                    <div className="w-20 h-24 bg-black flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <h3 className="text-sm font-serif text-white uppercase tracking-wider mb-1">{item.name}</h3>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{item.category}</p>
                      <p className="text-[#d4af37] tracking-[0.1em] text-xs">₹{item.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-4 text-xs tracking-widest uppercase border-t border-white/10 pt-6 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between text-white text-sm pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-[#d4af37]">₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* 4. We attached the checkout function to the button! */}
            <button 
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#d4af37] transition-colors duration-300"
            >
              <ShieldCheck size={16} />
              Complete Order
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}