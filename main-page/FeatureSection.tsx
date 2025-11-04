"use client";

import Image from "next/image";

export default function FeatureSection() {
  return (
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section - Left on large screens, top on small screens */}
            <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
              <Image
                src="/my-image2.jpg.jpg"
                alt="Feature Image"
                fill
                className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none transition-transform duration-700 ease-in-out hover:scale-110 animate-fadeIn"
                priority
                unoptimized
              />
            </div>

            {/* Text Content Section - Right on large screens, bottom on small screens */}
            <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Agriculture Complex 
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-600 mb-4 sm:mb-6">
                Multan
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
               The Agriculture Complex in South Punjab, Multan serves as a central hub for advancing modern agricultural research and innovation. It fosters collaboration among scientists, farmers, and institutions to enhance sustainable farming practices across the region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

