"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ImageCarousel from "@/main-page/ImageCarousel";
import FeatureSection from "@/main-page/FeatureSection";
import FeatureData from "@/main-page/FeatureData";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname === "/cotton-institute" || pathname === "/mns-data" || pathname === "/amri" || pathname === "/soil-water" || pathname === "/flori" || pathname === "/pest" || pathname === "/mri" || pathname === "/mnsuam" || pathname === "/ext" || pathname === "/ento" || pathname === "/raedc" || pathname === "/rari" || pathname === "/adp";

  // Restore scroll position when returning to main page
  useEffect(() => {
    if (!isDashboardRoute && pathname === '/') {
      const savedScrollPosition = sessionStorage.getItem('mainPageScrollPosition');
      if (savedScrollPosition) {
        // Use setTimeout to ensure all content is loaded
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScrollPosition, 10),
            behavior: 'auto' // Instant scroll, not smooth
          });
          // Clear saved position after restoring
          sessionStorage.removeItem('mainPageScrollPosition');
        }, 150);
      }
    }
  }, [isDashboardRoute, pathname]);

  return (
    <>
      {!isDashboardRoute && (
        <>
          <ImageCarousel />
          <FeatureSection />
          <FeatureData />
        </>
      )}
      {children}
    </>
  );
}

