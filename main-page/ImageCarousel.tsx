"use client";

import Image from "next/image";
import { useState } from "react";

interface CarouselImage {
  src: string;
  alt: string;
}

// You can add your images here - update the paths to match your images in the public folder
const carouselImages: CarouselImage[] = [
  {
    src: "/my-image.jpg.jpg",
    alt: "Digital Asset Management System",
  },
];

export default function ImageCarousel() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative w-full max-w-[1536px] h-[5.5in] overflow-hidden bg-gray-100 rounded-2xl">
        {/* Image Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {!imageError ? (
          <Image
            src={carouselImages[0].src}
            alt={carouselImages[0].alt}
            fill
            className="object-cover rounded-2xl"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Image not found: {carouselImages[0].src}</p>
          </div>
        )}
        
        {/* Caption Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 via-black/20 to-black/30">
          <div className="text-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 backdrop-blur-sm bg-black/10 rounded-xl border border-white/10 shadow-lg">
            <h2 
              className="font-normal text-gray-100 leading-tight tracking-tight"
              style={{ 
                fontSize: "clamp(20px, 5vw, 48px)",
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
              }}
            >
              Digital Asset Management System
            </h2>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
