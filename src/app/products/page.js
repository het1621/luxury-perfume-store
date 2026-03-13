"use client";
import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react'; // <-- Add this exact line!

export default function ProductsPage() {
// ... the rest of your code stays exactly the same
  // 1. The State Hooks
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // 2. Add the missing filters array right here!
  const filters = ["All", "Woody", "Floral", "Citrus", "Oriental"];

  // 3. The fetching logic
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/perfumes');
        if (!res.ok) return; 
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }
    loadProducts();
  }, []);
  // The logic to save the item to local storage
  const handleAddToCart = (product) => {
    // 1. Get the current cart from memory, or start an empty array if it doesn't exist
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 2. Add the newly clicked perfume to the array
    existingCart.push(product);
    
    // 3. Save the new array back into the browser's memory
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // 4. Shout to the rest of the website that the cart has changed!
    window.dispatchEvent(new Event('cartUpdated'));
    
    alert(`Added ${product.name} to your cart!`); // Optional feedback for you
  };

  // ... keep the rest of your UI code exactly the same!

  return (
    // ... keep the rest of your beautiful UI and JSX exactly the same!
    // The {products.map(...)} section will now work perfectly once the API is online.
    <div className="min-h-screen bg-[#050505] pt-32 px-8 md:px-16 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-serif tracking-widest uppercase mb-4 text-white">
          The Collection
        </h1>
        <p className="text-xs tracking-[0.2em] text-gray-400 uppercase max-w-lg">
          Explore our signature scents, crafted with the world's most exquisite ingredients.
        </p>
      </div>

      {/* Fake Interactive Filter Bar */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 pb-1 border-b ${
              activeFilter === filter 
                ? 'text-[#d4af37] border-[#d4af37]' 
                : 'text-gray-500 border-transparent hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            
            {/* Image Container */}
            <div className="relative h-[60vh] w-full overflow-hidden mb-6 bg-[#0a0a0a]">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              
              {/* Quick Add to Cart Button (Appears on Hover) */}
              <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <button 
  onClick={() => handleAddToCart(product)} 
  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors"
>
  <ShoppingBag size={16} />
  Add to Cart
</button>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col items-center text-center">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
              <h3 className="text-xl font-serif text-white uppercase tracking-wider mb-2">{product.name}</h3>
              <p className="text-[#d4af37] tracking-[0.1em] text-sm">{product.price}</p>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}