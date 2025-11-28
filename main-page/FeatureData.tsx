"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Cotton {
  id: number;
  name: string;
  image: string;
  imageAlt: string;
  locked?: boolean;
}

// Research institutes data - easily replaceable
const cottons: Cotton[] = [
  {
    id: 3,
    name: "Cotton Research Institute",
    image: "/cotton.jpg.png",
    imageAlt: "Cotton Research Institute",
  },
  
  {
    id: 1,
    name: "Agriculture Engineering Field Wing",
    image: "/agri.jpg.png",
    imageAlt: "Agriculture Engineering Field Wing",
  },
  
  {
    id: 2,
    name: "Soil & Water Research Institute",
    image: "/soil.png.jpg",
    imageAlt: "Soil & Water Research Institute",
  },
  
  {
    id: 5,
    name: "Floriculture Research Institute",
    image: "/flori.jpg.jpg",
    imageAlt: "Floriculture Research Institute",
  },
  {
    id: 6,
    name: "Mango Research Institute",
    image: "/mango.jpg.jpg",
    imageAlt: "Mango research institute",
  },
  {
    id: 7,
    name: "Pesticides Quality Control Lab",
    image: "/lab.jpg.jpg",
    imageAlt: "Pesticides Labs",
  },
  {
    id: 8,
    name: "MNS University Of Agriculture",
    image: "/mns.png.jpg",
    imageAlt: "MNS University Of Agriculture",
  },
  {
    id: 9,
    name: "Agricultural Extension",
    image: "/ext.jpg.jpg",
    imageAlt: "Agricultural Extension",
  },
  {
    id: 10,
    name: "Agricultural Mechanization Research Institute",
    image: "/amri.jpg.jpeg",
    imageAlt: "Agricultural Mechanization Research Institute",
  },
  {
    id: 11,
    name: "Entomological Research Sub Station Multan",
    image: "/ent.jpg.jpg",
    imageAlt: "Entomological Research Sub Station Multan",
  },
  {
    id: 12,
    name: "RAEDC",
    image: "/raedc.jpg.jpg",
    imageAlt: "RAEDC",
  },
  {
    id: 13,
    name: "RARI",
    image: "/rai.jpg.jpg",
    imageAlt: "RARI",
  },
];

export default function FeatureData() {
  const router = useRouter();

  const handleCardClick = (cottonId: number, cottonName: string) => {
    if (cottonId === 3) {
      router.push("/cotton-institute");
    } else if (cottonId === 1) {
      // Navigate to MNS Lab / MNS Data page - force full page navigation
      window.location.href = "/mns-data";
    } else if (cottonId === 6) {
      // Navigate to Mango Research Institute dashboard
      window.location.href = "/mri.html";
    } else if (cottonId === 10) {
      // Navigate to Agricultural Mechanization Research Institute dashboard
      router.push("/amri");
    } else if (cottonId === 11) {
      // Navigate to Entomological Research Sub Station Multan dashboard
      window.location.href = "/ento.html";
    } else if (cottonId === 9) {
      // Navigate to Agricultural Extension dashboard
      window.location.href = "/ext.html";
    } else if (cottonId === 5) {
      // Navigate to Floriculture Research Institute dashboard
      router.push("/flori");
    } else if (cottonId === 7) {
      // Navigate to Pesticides Quality Control Lab dashboard
      router.push("/pest");
    } else if (cottonId === 12) {
      // Navigate to RAEDC dashboard
      window.location.href = "/RAEDC.html";
    } else if (cottonId === 8) {
      // Navigate to MNSUAM dashboard
      window.location.href = "/MNSUAM.html";
    } else if (cottonId === 13) {
      // Navigate to RARI dashboard
      window.location.href = "/Rari.html";
    } else if (cottonId === 2) {
      // Navigate to Soil & Water Research Institute dashboard
      router.push("/soil-water");
    }
    // All institutes now have specific routes - no default case needed
  };

  return (
    <div className="w-full bg-gray-100 pt-0 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 pt-8 sm:pt-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-gray-900 leading-tight tracking-tight px-4">
            Research Institutes
          </h2>
        </div>

        {/* Grid Layout: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 justify-items-center">
          {cottons.map((cotton) => (
            <div
              key={cotton.id}
              className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col"
            >
              {/* Institute Image */}
              <div 
                className="relative w-full h-44 sm:h-52 md:h-60 lg:h-64 bg-gray-50 overflow-hidden"
              >
                {cotton.locked ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-200/80 text-slate-600">
                    <svg
                      className="w-12 h-12 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M16 11V7a4 4 0 10-8 0v4m12 2H6a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2z"
                      />
                    </svg>
                    <p className="text-sm font-semibold uppercase tracking-wide">Locked</p>
                  </div>
                ) : (
                  <>
                    <Image
                      src={cotton.image}
                      alt={cotton.imageAlt}
                      fill
                      className="object-cover w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
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
                    <div className="placeholder absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 flex items-center justify-center shadow-sm hidden">
                      <span className="text-blue-600 text-xs sm:text-sm font-semibold">Image</span>
                    </div>
                  </>
                )}
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">
                {/* Institute Name */}
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-gray-900 leading-tight tracking-tight mb-3">
                  {cotton.name}
                </h3>
                
                {/* Learn More Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!cotton.locked) {
                      handleCardClick(cotton.id, cotton.name);
                    }
                  }}
                  disabled={cotton.locked}
                  className={`mt-auto w-full font-medium py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm sm:text-base ${
                    cotton.locked
                      ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 focus:ring-blue-500"
                  }`}
                >
                  {cotton.locked ? "Locked" : "Learn More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

