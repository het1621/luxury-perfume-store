"use client";
import { useState } from 'react';
import { PackagePlus, Loader2, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  // 1. Memory to hold whatever you type into the form
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Woody",
    image: ""
  });
  
  // 2. Memory for loading spinners and success messages
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // 3. The function that talks to your custom backend API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the page from refreshing
    setIsLoading(true);
    setStatus(null);

    try {
      // Convert the price from a text string into a real Math number
      const newPerfume = {
        ...formData,
        price: Number(formData.price)
      };

      // Send the data to the POST route we built earlier!
      const res = await fetch('/api/perfumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPerfume),
      });

      if (!res.ok) throw new Error("Failed to add product");

      // Show success message and clear the form
      setStatus('success');
      setFormData({ name: "", price: "", category: "Woody", image: "" });
      
    } catch (error) {
      console.error("Admin API Error:", error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Updates the state every time you type a letter
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 px-8 pb-24 flex justify-center">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
          <PackagePlus className="text-[#d4af37]" size={32} />
          <h1 className="text-2xl font-serif text-white uppercase tracking-widest">Admin Control Panel</h1>
        </div>

        {/* Success Alert */}
        {status === 'success' && (
          <div className="mb-8 p-4 bg-green-900/20 border border-green-500/50 flex items-center gap-3 text-green-400 text-xs tracking-widest uppercase">
            <CheckCircle2 size={16} />
            Product successfully written to Database!
          </div>
        )}

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Product Name */}
          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Fragrance Name</label>
            <input 
              required type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="e.g. Tom Ford Oud Wood" 
              className="w-full bg-transparent border-b border-white/20 text-white text-sm tracking-wider pb-2 outline-none focus:border-[#d4af37] transition-colors placeholder-gray-700" 
            />
          </div>

          {/* Price & Category Row */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Price ($)</label>
              <input 
                required type="number" name="price" value={formData.price} onChange={handleChange}
                placeholder="250" 
                className="w-full bg-transparent border-b border-white/20 text-white text-sm tracking-wider pb-2 outline-none focus:border-[#d4af37] transition-colors placeholder-gray-700" 
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Category</label>
              <select 
                name="category" value={formData.category} onChange={handleChange}
                className="w-full bg-[#050505] border-b border-white/20 text-white text-sm tracking-wider pb-2 outline-none focus:border-[#d4af37] transition-colors cursor-pointer"
              >
                <option value="Woody">Woody</option>
                <option value="Floral">Floral</option>
                <option value="Citrus">Citrus</option>
                <option value="Oriental">Oriental</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Unsplash Image URL</label>
            <input 
              required type="url" name="image" value={formData.image} onChange={handleChange}
              placeholder="https://images.unsplash.com/..." 
              className="w-full bg-transparent border-b border-white/20 text-white text-sm tracking-wider pb-2 outline-none focus:border-[#d4af37] transition-colors placeholder-gray-700" 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-10 bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#d4af37] transition-colors duration-300 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <PackagePlus size={16} />}
            {isLoading ? "Writing to Database..." : "Publish to Store"}
          </button>

        </form>

      </div>
    </div>
  );
}