"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(false);
    };
    img.src = "/logo.png.png";
  }, []);

  return (
    <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-3 sm:py-4 md:py-5">
          {/* Logo */}
          <div className="flex-shrink-0 relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-transform duration-300 hover:scale-105">
            {imageLoaded && !imageError ? (
              <Image
                src="/logo.png.png"
                alt="South Punjab Government Logo"
                fill
                className="object-contain rounded-lg"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-blue-600 text-[10px] sm:text-xs md:text-sm font-semibold">Logo</span>
              </div>
            )}
          </div>
          
          {/* Title */}
          <h1 
            className="font-medium text-center tracking-tight leading-tight text-gray-700"
            style={{ 
              fontSize: "clamp(16px, 4vw, 36px)", 
              transition: 'all 0.3s ease',
            }}
          >
            South Punjab
          </h1>
        </div>
      </div>
    </header>
  );
}
