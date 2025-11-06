"use client";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState, useMemo, memo } from "react";
import Image from "next/image";

interface Department {
  id: string;
  department_name: string;
  focal_person_name: string;
  designation: string;
  address: string;
  telephone: string;
  email: string;
}

interface LandBuilding {
  total_area: number;
  area_under_cultivation: number;
  area_under_buildings: number;
  area_under_roads: number;
  building_rooms: number;
  laboratories: number;
}

interface HumanResource {
  total_officers: number;
  officials_and_field_staff: number;
  vacant_for_officers: number;
}

interface LabEquipment {
  id: string;
  serial_no: number;
  equipment_name: string;
  model_specification: string;
  department: string;
  quantity: number;
  status: string;
}

interface FarmMachinery {
  id: string;
  serial_no: number;
  machine_name: string;
  model_year: number;
  location: string;
  quantity: number;
  status: string;
}

// Skeleton Loader Component
const SkeletonCard = memo(() => (
  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
));
SkeletonCard.displayName = "SkeletonCard";

// Summary Card Skeleton
const SkeletonSummaryCard = memo(() => (
  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg p-6 border-l-4 border-gray-300 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
    </div>
  </div>
));
SkeletonSummaryCard.displayName = "SkeletonSummaryCard";

// Table Skeleton
const TableSkeleton = memo(() => (
  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
    <div className="space-y-3">
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  </div>
));
TableSkeleton.displayName = "TableSkeleton";

export default function CottonInstituteDashboard() {
  const [department, setDepartment] = useState<Department | null>(null);
  const [land, setLand] = useState<LandBuilding | null>(null);
  const [hr, setHr] = useState<HumanResource | null>(null);
  const [labEquipment, setLabEquipment] = useState<LabEquipment[]>([]);
  const [farmMachinery, setFarmMachinery] = useState<FarmMachinery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      try {
        const { data: dept } = await supabase
          .from("departments")
          .select("id, department_name, focal_person_name, designation, address, telephone, email")
          .eq("department_name", "Cotton Research Institute, Multan")
          .single();

        if (!dept) {
          setLoading(false);
          return;
        }

        setDepartment(dept);

        const [landResult, hrResult, labResult, farmResult] = await Promise.all([
          supabase
            .from("cri_land_building")
            .select("*")
            .eq("department_id", dept.id)
            .single(),
          supabase
            .from("cri_human_resource")
            .select("*")
            .eq("department_id", dept.id)
            .single(),
          supabase
            .from("cri_lab_equipment")
            .select("*")
            .eq("department_id", dept.id),
          supabase
            .from("cri_farm_machinery")
            .select("*")
            .eq("department_id", dept.id),
        ]);

        setLand(landResult.data);
        setHr(hrResult.data);
        setLabEquipment(labResult.data || []);
        setFarmMachinery(farmResult.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Memoize calculations to prevent unnecessary re-renders
  const summaryStats = useMemo(() => {
    const totalLabEquipment = labEquipment.length;
    const totalFarmMachinery = farmMachinery.length;
    const functionalLabEquipment = labEquipment.filter(
      (item) => item.status?.toLowerCase() === "functional"
    ).length;
    const functionalFarmMachinery = farmMachinery.filter(
      (item) => item.status?.toLowerCase() === "functional"
    ).length;
    const nonFunctionalLabEquipment = totalLabEquipment - functionalLabEquipment;
    const nonFunctionalFarmMachinery = totalFarmMachinery - functionalFarmMachinery;

    return {
      totalLabEquipment,
      totalFarmMachinery,
      functionalLabEquipment,
      functionalFarmMachinery,
      nonFunctionalLabEquipment,
      nonFunctionalFarmMachinery,
    };
  }, [labEquipment, farmMachinery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 h-[1.3in]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-full">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex-shrink-0">
                  <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6 sm:space-y-8">
            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonSummaryCard key={i} />
              ))}
            </div>

            {/* Other Sections Skeleton */}
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 h-[1.3in]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/cotton.jpg.png"
                  alt="Cotton Research Institute"
                  fill
                  className="object-cover rounded-lg"
                  priority
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
                <div className="placeholder absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 rounded-lg flex items-center justify-center shadow-sm hidden">
                  <span className="text-green-600 text-[10px] sm:text-xs md:text-sm font-semibold">Logo</span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-4xl font-medium text-gray-800 leading-tight tracking-tight">
                  {department?.department_name || "Cotton Research Institute"}
                </h1>
                <p className="text-xs sm:text-xs md:text-sm text-gray-600 leading-tight mt-0.5">
                  Dashboard & Analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {hr && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Officers</p>
                    <p className="text-3xl font-bold text-gray-900">{hr.total_officers || 0}</p>
                  </div>
                  <div className="bg-blue-500 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Lab Equipment</p>
                  <p className="text-3xl font-bold text-gray-900">{summaryStats.totalLabEquipment}</p>
                  <p className="text-xs text-gray-600 mt-1">{summaryStats.functionalLabEquipment} functional</p>
                </div>
                <div className="bg-green-500 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Farm Machinery</p>
                  <p className="text-3xl font-bold text-gray-900">{summaryStats.totalFarmMachinery}</p>
                  <p className="text-xs text-gray-600 mt-1">{summaryStats.functionalFarmMachinery} functional</p>
              </div>
                <div className="bg-purple-500 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </div>
              </div>
            </div>

            {land && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Area</p>
                    <p className="text-3xl font-bold text-gray-900">{land.total_area || 0}</p>
                    <p className="text-xs text-gray-600 mt-1">acres</p>
                  </div>
                  <div className="bg-orange-500 rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Department Information Card */}
          {department && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-3 sm:p-5 md:p-6 mb-6 sm:mb-8 border border-blue-100">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Department Information</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                <div className="space-y-2.5">
                  <div>
                    <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1">Department Name</p>
                    <p className="text-sm sm:text-base font-medium text-gray-900">{department.department_name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1">Focal Person</p>
                    <p className="text-sm sm:text-base text-gray-700">{department.focal_person_name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1">Designation</p>
                    <p className="text-sm sm:text-base text-gray-700">{department.designation || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1">Address</p>
                    <p className="text-sm sm:text-base text-gray-700">{department.address || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1">Contact</p>
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base text-gray-700">📞 {department.telephone || "N/A"}</p>
                      <p className="text-sm sm:text-base text-gray-700">✉️ {department.email || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Land Resources & Buildings Card */}
          {land && (
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Land Resources & Buildings</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Chart Section */}
                <div className="bg-gradient-to-br from-emerald-50 via-indigo-50 to-cyan-50 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Area Distribution</h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Total Area</p>
                    <p className="text-2xl font-bold text-gray-900">{land.total_area || "N/A"}</p>
                    <p className="text-xs text-gray-500 mt-1">acres</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Cultivation</p>
                    <p className="text-2xl font-bold text-gray-900">{land.area_under_cultivation || "N/A"}</p>
                    <p className="text-xs text-gray-500 mt-1">acres</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Buildings</p>
                    <p className="text-2xl font-bold text-gray-900">{land.area_under_buildings || "N/A"}</p>
                    <p className="text-xs text-gray-500 mt-1">acres</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Roads</p>
                    <p className="text-2xl font-bold text-gray-900">{land.area_under_roads || "N/A"}</p>
                    <p className="text-xs text-gray-500 mt-1">acres</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Building Rooms</p>
                    <p className="text-2xl font-bold text-gray-900">{land.building_rooms || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Laboratories</p>
                    <p className="text-2xl font-bold text-gray-900">{land.laboratories || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Human Resources Card */}
          {hr && (
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
          </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Human Resources</h2>
        </div>

              {/* Chart removed */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Total Officers</p>
                  <p className="text-3xl font-bold text-gray-900">{hr.total_officers || 0}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Officials & Field Staff</p>
                  <p className="text-3xl font-bold text-gray-900">{hr.officials_and_field_staff || 0}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg transition-all transform hover:scale-105">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Vacant Positions</p>
                  <p className="text-3xl font-bold text-gray-900">{hr.vacant_for_officers || 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Lab Equipment Card */}
          {labEquipment && labEquipment.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Laboratory Equipment</h2>
          </div>

              {/* Status Chart removed */}

              <div className="overflow-x-auto -mx-4 sm:-mx-6 md:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider">Serial No</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider">Equipment Name</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider hidden sm:table-cell">Model/Specification</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider hidden md:table-cell">Department</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider">Quantity</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {labEquipment.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900">{item.serial_no || "N/A"}</td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm text-gray-900">{item.equipment_name || "N/A"}</td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm text-gray-600 hidden sm:table-cell">{item.model_specification || "N/A"}</td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm text-gray-600 hidden md:table-cell">{item.department || "N/A"}</td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900">{item.quantity || "N/A"}</td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1.5 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${
                              item.status?.toLowerCase() === "functional"
                                ? "bg-green-500 text-white shadow-sm"
                                : item.status?.toLowerCase() === "non-functional"
                                ? "bg-red-500 text-white shadow-sm"
                                : "bg-gray-300 text-gray-700"
                            }`}>
                              {item.status?.toLowerCase() === "functional" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                              {item.status?.toLowerCase() === "non-functional" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                              )}
                              {item.status || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Farm Machinery Card */}
          {farmMachinery && farmMachinery.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
          </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Farm Machinery</h2>
        </div>

              {/* Status Chart removed */}

              <div className="overflow-x-auto -mx-4 sm:-mx-6 md:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider">Serial No</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider">Machine Name</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider hidden sm:table-cell">Model Year</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider hidden md:table-cell">Location</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider">Quantity</th>
                        <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-base font-bold text-gray-800 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {farmMachinery.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900">{item.serial_no || "N/A"}</td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm text-gray-900">{item.machine_name || "N/A"}</td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm text-gray-600 hidden sm:table-cell">{item.model_year || "N/A"}</td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-[10px] sm:text-xs md:text-sm text-gray-600 hidden md:table-cell">{item.location || "N/A"}</td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900">{item.quantity || "N/A"}</td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1.5 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${
                              item.status?.toLowerCase() === "functional"
                                ? "bg-green-500 text-white shadow-sm"
                                : item.status?.toLowerCase() === "non-functional"
                                ? "bg-red-500 text-white shadow-sm"
                                : "bg-gray-300 text-gray-700"
                            }`}>
                              {item.status?.toLowerCase() === "functional" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                              {item.status?.toLowerCase() === "non-functional" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )}
                              {item.status || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!department && !land && !hr && (!labEquipment || labEquipment.length === 0) && (!farmMachinery || farmMachinery.length === 0) && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600 text-lg">No data available at this time.</p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
