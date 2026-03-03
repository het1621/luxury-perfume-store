"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      
      {/* --- GLOBAL FIXED BACKGROUND --- */}
      <div className="fixed inset-0 -z-10 bg-black">
        <img 
          src="/image_1.png" 
          alt="Luxury Aesthetic Background" 
          className="w-full h-full object-cover opacity-30"
          style={{ filter: "blur(12px)" }} // Consistent high-end blur
        />
      </div>

      {/* --- LOGIN CARD --- */}
      {/* Glassmorphism effect to make the form float over the blurred image */}
      <div className="w-full max-w-md mx-4 p-10 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-white uppercase tracking-widest mb-2">
            {isLogin ? 'Aura' : 'Join Aura'}
          </h1>
          <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.2em]">
            {isLogin ? 'Sign in to your collection' : 'Create your signature account'}
          </p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {!isLogin && (
            <div className="relative border-b border-white/20 pb-2">
              <input 
                type="text" 
                placeholder="FULL NAME" 
                className="w-full bg-transparent text-white text-xs tracking-widest outline-none placeholder-gray-600"
              />
            </div>
          )}

          <div className="relative border-b border-white/20 pb-2 flex items-center">
            <Mail size={16} className="text-gray-500 mr-4" />
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-transparent text-white text-xs tracking-widest outline-none placeholder-gray-600"
            />
          </div>

          <div className="relative border-b border-white/20 pb-2 flex items-center">
            <Lock size={16} className="text-gray-500 mr-4" />
            <input 
              type="password" 
              placeholder="PASSWORD" 
              className="w-full bg-transparent text-white text-xs tracking-widest outline-none placeholder-gray-600"
            />
          </div>

          <button className="w-full flex items-center justify-between border border-[#d4af37]/50 text-white p-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 group">
            <span>{isLogin ? 'Login' : 'Register'}</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-12 text-center border-t border-white/10 pt-8">
          <p className="text-[10px] text-gray-400 tracking-[0.1em]">
            {isLogin ? "New to Aura?" : "Already a member?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#d4af37] ml-2 hover:text-white transition-colors uppercase tracking-widest"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}