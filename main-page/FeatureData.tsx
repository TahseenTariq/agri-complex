"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Cotton {
  id: number;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
}

// Research institutes data - easily replaceable
const cottons: Cotton[] = [
  {
    id: 1,
    name: "Cotton Research Institute",
    price: 850,
    image: "/cotton.jpg.jpg",
    imageAlt: "Cotton Research Institute",
  },
  {
    id: 2,
    name: "Floriculture Research Institute",
    price: 1200,
    image: "/fort.jpg.jpg",
    imageAlt: "Floriculture Research Institute",
  },
  {
    id: 3,
    name: "Soil & Water Research Institute",
    price: 950,
    image: "/soil.jpg.jpg",
    imageAlt: "Soil & Water Research Institute",
  },
  {
    id: 4,
    name: "Horticulture Research Institute",
    price: 750,
    image: "/hort-image.jpg.png",
    imageAlt: "Horticulture Research Institute",
  },
 
];

export default function FeatureData() {
  const router = useRouter();

  const handleCardClick = (cottonId: number) => {
    if (cottonId === 1) {
      router.push("/cotton-institute");
    } else {
      console.log("Coming Soon");
    }
  };

  return (
    <div className="w-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
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
              <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <Image
                  src={cotton.image}
                  alt={cotton.imageAlt}
                  fill
                  className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-110"
                />
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

