"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Minus, Plus } from 'lucide-react';
import { products } from '../data'; // Pulling in our fake database

export default function Navbar() {
  // State to control if the cart is open or closed
  const [isCartOpen, setIsCartOpen] = useState(false);

  // We'll just grab the first product from our data file to act as our "in cart" item
  const cartItem = products[0];

  return (
    <>
      {/* --- MAIN NAVIGATION BAR --- */}
      <nav className="fixed w-full z-40 top-0 flex justify-between items-center px-8 py-6 bg-black/40 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        
        {/* Left Side */}
        <div className="flex items-center gap-6 hidden md:flex">
          <Link href="/products" className="text-xs tracking-[0.2em] uppercase hover:text-[#d4af37] transition-colors duration-300">
            Shop
          </Link>
          <Link href="/products" className="text-xs tracking-[0.2em] uppercase hover:text-[#d4af37] transition-colors duration-300">
            Collections
          </Link>
        </div>
        <button className="md:hidden text-white hover:text-[#d4af37] transition-colors">
          <Menu size={24} />
        </button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-2xl font-serif tracking-[0.3em] uppercase text-white">
            Aura
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-[10px] tracking-widest uppercase text-gray-500 hover:text-white transition-colors hidden sm:block">
            Admin Demo
          </Link>
          
          <Link href="/login" className="text-white hover:text-[#d4af37] transition-colors">
            <User size={20} />
          </Link>
          
          {/* Shopping Cart Button - Opens the Cart */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-white hover:text-[#d4af37] transition-colors relative"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1.5 -right-2 bg-[#d4af37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              1
            </span>
          </button>
        </div>
      </nav>

      {/* --- SLIDE-OUT CART PANEL --- */}
      
      {/* 1. The Dark Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-500 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsCartOpen(false)} // Clicking the background closes the cart
      />

      {/* 2. The Actual Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#050505] border-l border-white/10 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Cart Header */}
        <div className="flex justify-between items-center p-8 border-b border-white/5">
          <h2 className="text-lg font-serif tracking-widest uppercase text-white">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex gap-6 mb-8">
            {/* Item Image */}
            <div className="w-24 h-32 bg-[#0a0a0a] border border-white/5 flex-shrink-0">
              <img src={cartItem.image} alt={cartItem.name} className="w-full h-full object-cover opacity-80" />
            </div>
            
            {/* Item Details */}
            <div className="flex flex-col justify-center flex-1">
              <h3 className="text-sm font-serif text-white uppercase tracking-wider mb-1">{cartItem.name}</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">{cartItem.category}</p>
              
              <div className="flex justify-between items-center mt-auto">
                {/* Fake Quantity Selector */}
                <div className="flex items-center gap-4 border border-white/20 px-3 py-1 text-white">
                  <button className="hover:text-[#d4af37] transition-colors"><Minus size={12} /></button>
                  <span className="text-xs">1</span>
                  <button className="hover:text-[#d4af37] transition-colors"><Plus size={12} /></button>
                </div>
                <p className="text-[#d4af37] tracking-[0.1em] text-sm">{cartItem.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Footer / Checkout Button */}
        <div className="p-8 border-t border-white/5 bg-[#0a0a0a]">
          <div className="flex justify-between text-white text-sm tracking-widest uppercase mb-6">
            <span>Subtotal</span>
            <span>{cartItem.price}</span>
          </div>
          <p className="text-[10px] text-gray-500 text-center mb-6">Shipping & taxes calculated at checkout.</p>
          
          <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full block text-center bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#d4af37] transition-colors duration-300">
            Proceed to Checkout
          </Link>
        </div>

      </div>
    </>
  );
}