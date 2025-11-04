"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Cotton {
  id: number;
  name: string;
  image: string;
  imageAlt: string;
}

// Research institutes data - easily replaceable
const cottons: Cotton[] = [
  {
    id: 1,
    name: "MNS-Lab Details",
    image: "/mns.png.jpg",
    imageAlt: "MNS-Lab Details",
  },

  {
    id: 2,
    name: "Soil & Water Research Institute",
    image: "/soil.png.jpg",
    imageAlt: "Soil & Water Research Institute",
  },
  
  {
    id: 3,
    name: "Cotton Research Institute",
    image: "/cotton.jpg.png",
    imageAlt: "Cotton Research Institute",
  },
  
  {
    id: 4,
    name: "Horticulture Research Institute",
    image: "/hort.jpg.jpg",
    imageAlt: "Horticulture Research Institute",
  },
  {
    id: 5,
    name: "Pesticide Quality Control, Laboratory",
    image: "/pest.jpg.jpg",
    imageAlt: "Pesticide Quality Control, Laboratory",
  },
  {
    id: 6,
    name: "Mango research institute",
    image: "/mango.jpg.jpeg",
    imageAlt: "Mango research institute",
  },
];

export default function FeatureData() {
  const router = useRouter();

  const handleCardClick = (cottonId: number) => {
    if (cottonId === 3) {
      router.push("/cotton-institute");
    } else {
      console.log("Coming Soon");
    }
  };

  return (
    <div className="w-full bg-gray-100 pt-0 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 pt-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight tracking-tight">
            Research Institutes
          </h2>
        </div>

        {/* Grid Layout: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cottons.map((cotton) => (
            <div
              key={cotton.id}
              onClick={() => handleCardClick(cotton.id)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
            >
              {/* Institute Image */}
              <div className="relative w-full h-48 sm:h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
                <Image
                  src={cotton.image}
                  alt={cotton.imageAlt}
                  fill
                  className="object-contain rounded-t-2xl transition-transform duration-300 group-hover:scale-105 p-2"
                  unoptimized
                  onError={(e: any) => {
                    // Fallback to placeholder if image fails to load
                    e.target.style.display = 'none';
                    const placeholder = e.target.parentElement?.querySelector('.placeholder');
                    if (placeholder) {
                      (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="placeholder absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 rounded-t-2xl flex items-center justify-center shadow-sm hidden">
                  <span className="text-blue-600 text-xs sm:text-sm font-semibold">Image</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                {/* Institute Name */}
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight tracking-tight">
                  {cotton.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

