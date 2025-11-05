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
    <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 h-[1.3in]">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Side - Title and Subheading */}
          <div className="flex flex-col">
            <div className="inline-block">
              <button
                onClick={handleTitleClick}
                className="text-left cursor-pointer transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded block"
              >
                <h1 
                  className="font-medium tracking-tight leading-tight text-gray-900 hover:underline text-lg sm:text-xl md:text-3xl transition-all duration-300"
                >
                  Regional Agriculture Forum
                </h1>
              </button>
              <p 
                className="text-gray-700 font-light leading-tight mt-0.5 sm:mt-0.5 text-xs sm:text-sm md:text-2xl text-center"
              >
                South Punjab
              </p>
            </div>
          </div>

          {/* Right Side - Five Logos Side by Side */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 flex-wrap">
            <div className="flex-shrink-0 relative h-[0.6in] sm:h-[0.65in] md:h-[0.7in] lg:h-[0.75in] w-auto aspect-square transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo.png.png"
                alt="South Punjab Government Logo 1"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-[0.6in] sm:h-[0.65in] md:h-[0.7in] lg:h-[0.75in] w-auto aspect-square transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo2.png.png"
                alt="South Punjab Government Logo 2"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-[0.6in] sm:h-[0.65in] md:h-[0.7in] lg:h-[0.7in] w-auto aspect-square transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo3.png.jpg"
                alt="South Punjab Government Logo 3"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-[0.6in] sm:h-[0.65in] md:h-[0.6in] lg:h-[0.85in] w-auto aspect-square transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo4.jpg.jpeg"
                alt="South Punjab Government Logo 4"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-[0.6in] sm:h-[0.65in] md:h-[0.7in] lg:h-[0.75in] w-auto aspect-square transition-all duration-300 hover:scale-110 hover:brightness-110">
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
