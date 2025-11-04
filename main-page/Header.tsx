"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Scroll to top when pathname changes to homepage
  useEffect(() => {
    if (pathname === '/') {
      // Small delay to ensure page has rendered
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleTitleClick = () => {
    // If already on homepage, just scroll to top immediately
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to homepage - scroll will be handled by useEffect
      router.push('/');
    }
  };

  return (
    <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between py-3 sm:py-4 md:py-5">
          {/* Left Side - Title and Subheading */}
          <div className="flex flex-col">
            <button
              onClick={handleTitleClick}
              className="text-left cursor-pointer transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              <h1 
                className="font-medium tracking-tight leading-tight text-gray-700 hover:underline"
                style={{ 
                  fontSize: "clamp(16px, 4vw, 36px)", 
                  transition: 'all 0.3s ease',
                }}
              >
                South Punjab
              </h1>
            </button>
            <p 
              className="text-gray-500 font-light leading-tight mt-0.5 sm:mt-1"
              style={{
                fontSize: "clamp(10px, 2vw, 14px)",
              }}
            >
              Digital Asset Management System
            </p>
          </div>

          {/* Right Side - Five Logos Side by Side */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 flex-wrap">
            <div className="flex-shrink-0 relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo.png.png"
                alt="South Punjab Government Logo 1"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo2.png.png"
                alt="South Punjab Government Logo 2"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo3.png.jpg"
                alt="South Punjab Government Logo 3"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo4.jpg.jpeg"
                alt="South Punjab Government Logo 4"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo5.jpg.jpg"
                alt="South Punjab Government Logo 5"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
