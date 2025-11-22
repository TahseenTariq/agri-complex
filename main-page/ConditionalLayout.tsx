"use client";

import { usePathname } from "next/navigation";
import ImageCarousel from "@/main-page/ImageCarousel";
import FeatureSection from "@/main-page/FeatureSection";
import FeatureData from "@/main-page/FeatureData";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname === "/cotton-institute" || pathname === "/mns-data" || pathname?.startsWith("/soil-institute/");

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

