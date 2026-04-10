"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  // 1. New State for Backend Data and Loading Status
  const [perfumes, setPerfumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const titleRef = useRef(null);
  const bgImageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const horizontalSectionRef = useRef(null);

  // 2. Fetch the API data when the component mounts
  useEffect(() => {
    async function loadPerfumes() {
      try {
        const res = await fetch('/api/perfumes');
        if (!res.ok) throw new Error("API not ready");
        
        const data = await res.json();
        setPerfumes(data);
      } catch (error) {
        console.error("Failed to fetch from API.", error);
        setPerfumes([]); // Protects the page from crashing by giving it an empty array
      } finally {
        setIsLoading(false); // Tell GSAP it is time to animate!
      }
    }
    loadPerfumes();
  }, []);

  // 3. GSAP Animations (Now waits for data to load)
  useEffect(() => {
    // Crucial: Do not run GSAP until the DOM has the loaded products
    if (isLoading) return; 

    let ctx = gsap.context(() => {
      
      // Initial Load Animation
      gsap.fromTo(titleRef.current, 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );

      // GLOBAL BACKGROUND EFFECT
      gsap.to(bgImageRef.current, {
        scale: 1.05,
        filter: "blur(15px)",
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // HORIZONTAL SCROLL PRODUCT GALLERY
      const sections = gsap.utils.toArray('.product-card');
      
      // Only create the scroll animation if we actually have products on screen
      if (sections.length > 0) {
        const scrollWidth = "+=" + (sections.length * window.innerWidth * 0.4); 
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 1.5,
            end: scrollWidth,
          }
        });
      }
    });

    return () => ctx.revert();
    
  }, [isLoading]); // This tells the useEffect to re-run once 'isLoading' turns false

  // Optional: Show a sleek loading state while fetching
  if (isLoading) {
    return <div className="h-screen w-full bg-black flex items-center justify-center text-white text-xs tracking-[0.3em] uppercase">Loading Collection...</div>;
  }

  return (
    <div className="flex flex-col relative text-white">
      
      {/* --- GLOBAL FIXED BACKGROUND --- */}
      <div className="fixed inset-0 -z-10 bg-black">
        <img 
          ref={bgImageRef}
          src="/image_1.png" 
          alt="Signature Perfume Bottle" 
          className="w-full h-full object-cover opacity-40 origin-center will-change-transform"
          style={{ filter: "blur(6px)" }}
        />
      </div>
      
      {/* --- 1. HERO SECTION --- */}
      <section ref={heroSectionRef} className="h-screen flex items-center justify-center relative mt-[-96px] bg-transparent">
        <div className="z-10 text-center px-4 flex flex-col items-center pointer-events-none" ref={titleRef}>
          <h1 className="text-5xl md:text-8xl font-serif tracking-widest uppercase mb-6 drop-shadow-2xl">
           Coco Noir
          </h1>
          <p className="text-sm md:text-base tracking-[0.3em] text-gray-300 uppercase mb-10 drop-shadow-md">
            The New Standard of Fragrance
          </p>
          <Link href="/products" className="pointer-events-auto backdrop-blur-md border border-white/30 px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-700">
            Discover the Collection
          </Link>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-[20vh] w-full z-20 relative bg-transparent"></div>

      {/* --- 2. HORIZONTAL SCROLL SECTION --- */}
      <section 
        ref={horizontalSectionRef} 
        className="h-screen w-full flex flex-col justify-center overflow-hidden relative z-20 border-t border-b border-white/10 bg-transparent"
      >
        <div className="absolute top-24 left-10 md:left-20 z-10">
          <h2 className="text-xs md:text-sm tracking-[0.3em] text-[#d4af37] uppercase drop-shadow-md">Featured Curations</h2>
        </div>

        <div className="horizontal-container flex w-[400vw] md:w-[150vw] h-[60vh] mt-10 px-[10vw] items-center gap-10 md:gap-20 z-10">
          {/* We are now mapping over the dynamic 'perfumes' state! */}
          {perfumes.map((product) => (
            <div key={product.id} className="product-card w-[80vw] md:w-[35vw] h-full flex-shrink-0 relative group cursor-pointer shadow-2xl">
              <div className="w-full h-full overflow-hidden relative border border-white/10 bg-[#0a0a0a]">
                <img 
                  // Fallback to a placeholder if your API data doesn't have an image field yet
                  src={product.image || "/image_1.png"} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
              </div>
              <div className="absolute bottom-10 left-[-1rem] bg-black/90 backdrop-blur-md p-6 border border-white/10 opacity-0 group-hover:opacity-100 group-hover:left-8 transition-all duration-700 ease-out">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{product.category || "Luxury"}</p>
                <h3 className="text-2xl font-serif text-white uppercase tracking-widest">{product.name}</h3>
                <p className="text-[#d4af37] tracking-[0.2em] text-sm mt-2">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    {/* --- SEAMLESS FROSTED GLASS CONTAINER --- */}
      <div className="bg-black/40 backdrop-blur-md border-t border-white/10 z-20 relative">
        
        {/* --- 3. CLOSING CTA SECTION --- */}
        <section className="h-[50vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-serif text-white tracking-widest uppercase mb-8 drop-shadow-lg">
            Ready to find your signature?
          </h2>
          <Link href="/products" className="bg-white/5 backdrop-blur-md border border-white/30 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-700">
            View All Products
          </Link>
        </section>

        {/* --- 4. LUXURY CONTACT FOOTER --- */}
        <footer className="text-white pb-12 px-8 md:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-3xl font-serif uppercase tracking-widest mb-6 text-white">Aura Studios</h2>
              <p className="text-xs text-gray-300 tracking-[0.2em] leading-loose max-w-sm">
                Experience the art of fine fragrance. Visit our boutique or contact our concierge for a private consultation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-12 md:justify-end text-xs tracking-[0.2em] uppercase text-gray-400">
              <div className="flex flex-col gap-4">
                <span className="text-[#d4af37] mb-2">Concierge</span>
                <a href="mailto:contact@aurastudios.com" className="hover:text-white transition-colors">contact@aurastudios.com</a>
                <a href="tel:+18001234567" className="hover:text-white transition-colors">+1 (800) 123-4567</a>
                <p className="mt-2 text-[9px] text-gray-500">MON - FRI, 9AM - 6PM EST</p>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[#d4af37] mb-2">Social</span>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Pinterest</a>
                <a href="#" className="hover:text-white transition-colors">Journal</a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto text-center md:text-left text-[9px] tracking-widest text-gray-500 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
            <p>&copy; 2026 AURA FRAGRANCES. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4 justify-center">
              <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </footer>

      </div>

    </div> 
  );
}