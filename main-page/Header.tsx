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
    <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 min-h-[3.5rem] sm:min-h-[1.3in] flex items-center overflow-hidden">
      <div className="max-w-9xl mx-auto px-3 py-1 sm:px-6 md:px-8 lg:px-10 sm:py-0 w-full h-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-1.5 sm:gap-4 w-full">
          {/* Logo Section - Top on mobile, Right on desktop */}
          <div className="flex items-center justify-center sm:justify-end gap-1 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-4 flex-shrink-0 order-1 sm:order-2">
            <div className="flex-shrink-0 relative h-6 w-6 sm:h-8 sm:w-8 md:h-[0.65in] md:w-[0.65in] lg:h-[0.7in] lg:w-[0.7in] xl:h-[0.75in] xl:w-[0.75in] transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo6.png"
                alt="South Punjab Government Logo 6"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-6 w-6 sm:h-8 sm:w-8 md:h-[0.65in] md:w-[0.65in] lg:h-[0.7in] lg:w-[0.7in] xl:h-[0.75in] xl:w-[0.75in] transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo.png.png"
                alt="South Punjab Government Logo 1"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-6 w-6 sm:h-8 sm:w-8 md:h-[0.65in] md:w-[0.65in] lg:h-[0.7in] lg:w-[0.7in] xl:h-[0.75in] xl:w-[0.75in] transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo2.png.png"
                alt="South Punjab Government Logo 2"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-6 w-6 sm:h-8 sm:w-8 md:h-[0.65in] md:w-[0.65in] lg:h-[0.7in] lg:w-[0.7in] xl:h-[0.7in] xl:w-[0.7in] transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo3.png.jpg"
                alt="South Punjab Government Logo 3"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-6 w-6 sm:h-8 sm:w-8 md:h-[0.6in] md:w-[0.6in] lg:h-[0.7in] lg:w-[0.7in] xl:h-[0.85in] xl:w-[0.85in] transition-all duration-300 hover:scale-110 hover:brightness-110">
              <Image
                src="/logo4.jpg.jpeg"
                alt="South Punjab Government Logo 4"
                fill
                className="object-contain rounded-lg"
                priority
                unoptimized
              />
            </div>
            <div className="flex-shrink-0 relative h-6 w-6 sm:h-8 sm:w-8 md:h-[0.65in] md:w-[0.65in] lg:h-[0.7in] lg:w-[0.7in] xl:h-[0.75in] xl:w-[0.75in] transition-all duration-300 hover:scale-110 hover:brightness-110">
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

          {/* Text Section - Below logo on mobile, Left on desktop */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-shrink-0 min-w-0 order-2 sm:order-1">
            <button
              onClick={handleTitleClick}
              className="text-center sm:text-left cursor-pointer transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded block"
            >
              <h1 
                className="font-medium tracking-tight leading-tight text-gray-900 hover:underline text-xs sm:text-base md:text-lg lg:text-xl xl:text-3xl transition-all duration-300"
              >
                Regional Agriculture Forum
              </h1>
            </button>
            <p 
              className="text-gray-700 font-light leading-tight mt-0.5 text-[10px] sm:text-xs md:text-sm lg:text-lg xl:text-2xl"
            >
              South Punjab
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
