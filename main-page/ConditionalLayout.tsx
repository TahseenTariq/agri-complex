"use client";

import { usePathname } from "next/navigation";
import ImageCarousel from "@/main-page/ImageCarousel";
import FeatureSection from "@/main-page/FeatureSection";
import FeatureData from "@/main-page/FeatureData";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCottonInstitute = pathname === "/cotton-institute";

  return (
    <>
      {!isCottonInstitute && (
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

