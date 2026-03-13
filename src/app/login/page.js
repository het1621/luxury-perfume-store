"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Send the credentials to our new API
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid Email or Password");
      }

      const data = await res.json();
      
      // 1. Save the digital "ID Card" in the browser's memory
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // 2. Shout to the Navbar that someone just logged in!
      window.dispatchEvent(new Event('authChange'));
      
      // 3. Redirect the user based on their role
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/products');
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-8">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 space-y-8 relative overflow-hidden">
        
        <div className="flex flex-col items-center gap-4 mb-10 border-b border-white/10 pb-8">
          <LogIn className="text-[#d4af37]" size={32} />
          <h1 className="text-2xl font-serif text-white uppercase tracking-[0.3em] text-center">Sign In</h1>
        </div>

        {/* Error Message UI */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-400 text-[10px] tracking-widest uppercase text-center">
            {error}
          </div>
        )}

        <div>
          <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
          <input 
            required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@aura.com" 
            className="w-full bg-transparent border-b border-white/20 text-white text-sm tracking-wider pb-2 outline-none focus:border-[#d4af37] transition-colors placeholder-gray-700"
          />
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Password</label>
          <input 
            required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full bg-transparent border-b border-white/20 text-white text-sm tracking-wider pb-2 outline-none focus:border-[#d4af37] transition-colors placeholder-gray-700"
          />
        </div>

        <button 
          type="submit" disabled={isLoading}
          className="w-full mt-10 bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#d4af37] transition-colors duration-300 flex justify-center items-center gap-3 disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Authenticate"}
        </button>

      </form>
    </div>
  );
}