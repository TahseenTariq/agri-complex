"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, memo } from "react";
import { supabase } from "@/lib/supabase-client";

// Fixed department ID for "Directorate of Agricultural Engineering, Multan"
const DEPARTMENT_ID = "bfd9afd2-0092-48b2-9184-f74bba24fbde";

// Helper function to format column names
const formatColumnName = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/Id/g, 'ID')
    .replace(/No /g, 'No. ');
};

// Helper function to get all columns from data, excluding system fields
const getTableColumns = (data: any[], excludeFields: string[] = ['id', 'department_id', 'created_at'], includeSerialNo: boolean = true): string[] => {
  if (!data || data.length === 0) return [];
  const allKeys = Object.keys(data[0] || {});
  const filtered = allKeys.filter(key => !excludeFields.includes(key.toLowerCase()));
  
  // Check if serial_no exists and should be first
  if (includeSerialNo) {
    const hasSerialNo = filtered.some(k => k.toLowerCase() === 'serial_no');
    if (hasSerialNo) {
      const serialNoIndex = filtered.findIndex(k => k.toLowerCase() === 'serial_no');
      if (serialNoIndex > 0) {
        // Move serial_no to front
        const serialNo = filtered.splice(serialNoIndex, 1)[0];
        return [serialNo, ...filtered];
      }
    }
  }
  
  return filtered;
};

// Skeleton Components
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

const SkeletonTable = memo(() => (
  <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse overflow-hidden">
    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="space-y-3">
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
));
SkeletonTable.displayName = "SkeletonTable";


const SkeletonSummaryCard = memo(() => (
  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg p-6 border-l-4 border-gray-300 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
    </div>
  </div>
));
SkeletonSummaryCard.displayName = "SkeletonSummaryCard";

// Enhanced Table Component with sticky headers
const DataTable = memo(({ 
  title, 
  data, 
  columns 
}: { 
  title: string; 
  data: any[]; 
  columns: { key: string; label: string; render?: (value: any, row?: any, rowIndex?: number) => React.ReactNode }[] 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {title}
        </h3>
        <p className="text-gray-500 text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-2 border-b border-gray-200">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {title} <span className="text-base font-normal text-gray-500">({data.length} records)</span>
      </h3>
      <div className="overflow-x-auto -mx-6 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <div className="overflow-y-auto max-h-[600px]">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gradient-to-r from-gray-700 to-gray-800 sticky top-0 z-10">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-gray-600"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900">
                          {col.render 
                            ? col.render(row[col.key], row, idx) 
                            : (row[col.key] !== null && row[col.key] !== undefined ? String(row[col.key]) : "—")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
DataTable.displayName = "DataTable";

export default function MnsDataPage() {
  // State for all data tables
  const [department, setDepartment] = useState<any>(null);
  const [buildingDetails, setBuildingDetails] = useState<any[]>([]);
  const [farmMachinery, setFarmMachinery] = useState<any[]>([]);
  const [handBoringPlants, setHandBoringPlants] = useState<any[]>([]);
  const [powerDrillingRigs, setPowerDrillingRigs] = useState<any[]>([]);
  const [electricityResistivityMeters, setElectricityResistivityMeters] = useState<any[]>([]);
  const [labMachinery, setLabMachinery] = useState<any[]>([]);
  const [humanResources, setHumanResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel for better performance with ordering
        const [
          { data: deptData, error: deptError },
          { data: buildingData, error: buildingError },
          { data: farmData, error: farmError },
          { data: handBoringData, error: handError },
          { data: powerRigData, error: powerError },
          { data: ermData, error: ermError },
          { data: labData, error: labError },
          { data: hrData, error: hrError },
        ] = await Promise.all([
          supabase.from("departments").select("*").eq("id", DEPARTMENT_ID).single(),
          supabase.from("mns_buildings_details").select("*").eq("department_id", DEPARTMENT_ID).order("serial_no", { ascending: true, nullsFirst: false }),
          supabase.from("mns_farm_machinery").select("*").eq("department_id", DEPARTMENT_ID).order("serial_no", { ascending: true, nullsFirst: false }),
          supabase.from("mns_hand_boring_plants").select("*").eq("department_id", DEPARTMENT_ID).order("serial_no", { ascending: true, nullsFirst: false }),
          supabase.from("mns_power_drillings_rig").select("*").eq("department_id", DEPARTMENT_ID).order("serial_no", { ascending: true, nullsFirst: false }),
          supabase.from("mns_electrict_resistivity_meter").select("*").eq("department_id", DEPARTMENT_ID).order("serial_no", { ascending: true, nullsFirst: false }),
          supabase.from("mns_lab_machinary").select("*").eq("department_id", DEPARTMENT_ID).order("serial_no", { ascending: true, nullsFirst: false }),
          supabase.from("mns_human_resource").select("*").eq("department_id", DEPARTMENT_ID).order("id", { ascending: true }),
        ]);

        // Set data (errors are logged but don't block rendering)
        if (deptError) {
          console.error("❌ Department fetch error:", deptError);
          setError(`Department fetch failed: ${deptError.message}`);
        } else {
          setDepartment(deptData);
        }

        if (buildingError) {
          console.error("❌ Building details error:", buildingError);
        } else {
          setBuildingDetails(buildingData || []);
          if (buildingData && buildingData.length > 0) {
            console.log("✅ Building Details Sample:", buildingData[0]);
          }
        }

        if (farmError) {
          console.error("❌ Farm machinery error:", farmError);
        } else {
          setFarmMachinery(farmData || []);
          if (farmData && farmData.length > 0) {
            console.log("✅ Farm Machinery Sample:", farmData[0]);
            console.log("✅ Farm Machinery Keys:", Object.keys(farmData[0]));
          }
        }

        if (handError) {
          console.error("❌ Hand boring plants error:", handError);
        } else {
          setHandBoringPlants(handBoringData || []);
        }

        if (powerError) {
          console.error("❌ Power drilling rigs error:", powerError);
        } else {
          setPowerDrillingRigs(powerRigData || []);
        }

        if (ermError) {
          console.error("❌ Electricity resistivity meters error:", ermError);
        } else {
          setElectricityResistivityMeters(ermData || []);
        }

        if (labError) {
          console.error("❌ Lab machinery error:", labError);
        } else {
          setLabMachinery(labData || []);
        }

        if (hrError) {
          console.error("❌ Human resources error:", hrError);
        } else {
          setHumanResources(hrData || []);
        }

      } catch (err: any) {
        console.error("❌ Unexpected error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Helper function to create columns with serial number as first column
  const createColumnsWithSerialNo = (data: any[], hasStatus: boolean = false): { key: string; label: string; render?: (value: any, row?: any, rowIndex?: number) => React.ReactNode }[] => {
    const cols = getTableColumns(data);
    const hasSerialNo = cols[0]?.toLowerCase() === 'serial_no';
    
    const columnDefs = cols.map((key, index) => {
      // If serial_no exists and is first, keep it as "Sr. No."
      if (index === 0 && hasSerialNo) {
        return {
          key,
          label: "Sr. No.",
          render: (value: any, _row?: any, rowIndex?: number) => (
            <span className="font-semibold text-gray-700">{value || (rowIndex !== undefined ? rowIndex + 1 : index + 1)}</span>
          ),
        };
      }
      
      return {
        key,
        label: formatColumnName(key),
        render: hasStatus && key.toLowerCase().includes('status')
          ? (value: any) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                value?.toLowerCase() === 'functional' || value?.toLowerCase() === 'working' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {value || '—'}
              </span>
            )
          : undefined,
      };
    });
    
    // If no serial_no field exists, prepend it
    if (!hasSerialNo) {
      return [
        {
          key: '_sr_no',
          label: "Sr. No.",
          render: (_value: any, _row?: any, rowIndex?: number) => (
            <span className="font-semibold text-gray-700">{rowIndex !== undefined ? rowIndex + 1 : 1}</span>
          ),
        },
        ...columnDefs,
      ];
    }
    
    return columnDefs;
  };

  // Memoized table columns - dynamically generated and excluding created_at
  const buildingColumns = useMemo(() => {
    return createColumnsWithSerialNo(buildingDetails, false);
  }, [buildingDetails]);

  const farmMachineryColumns = useMemo(() => {
    return createColumnsWithSerialNo(farmMachinery, true);
  }, [farmMachinery]);

  const labMachineryColumns = useMemo(() => {
    return createColumnsWithSerialNo(labMachinery, true);
  }, [labMachinery]);

  const humanResourcesColumns = useMemo(() => {
    return createColumnsWithSerialNo(humanResources, false);
  }, [humanResources]);

  const handBoringPlantsColumns = useMemo(() => {
    return createColumnsWithSerialNo(handBoringPlants, false);
  }, [handBoringPlants]);

  const powerDrillingRigsColumns = useMemo(() => {
    return createColumnsWithSerialNo(powerDrillingRigs, false);
  }, [powerDrillingRigs]);

  const electricityResistivityMetersColumns = useMemo(() => {
    return createColumnsWithSerialNo(electricityResistivityMeters, false);
  }, [electricityResistivityMeters]);


  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="flex items-center justify-between py-3 sm:py-4 md:py-5">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex-shrink-0 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <SkeletonSummaryCard key={i} />
            ))}
          </div>
          <div className="space-y-6">
            <SkeletonCard />
            <SkeletonTable />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex items-center justify-between py-3 sm:py-4 md:py-5">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/mns.png.jpg"
                  alt="MNS Lab"
                  fill
                  className="object-cover rounded-lg"
                  priority
                  unoptimized
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.parentElement?.querySelector('.placeholder');
                    if (placeholder) {
                      (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="placeholder absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 rounded-lg flex items-center justify-center shadow-sm hidden">
                  <span className="text-blue-600 text-[10px] sm:text-xs md:text-sm font-semibold">Logo</span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 leading-tight tracking-tight">
                    MNS Lab Resources
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-tight mt-0.5 sm:mt-1">
                  Laboratory Information
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 text-sm font-medium">⚠️ {error}</p>
            </div>
          </div>
        )}

        {/* Department Info Section */}
        {department && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 sm:p-8 mb-8 border border-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Department Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Department Name</p>
                  <p className="text-base font-medium text-gray-900">MNS Agriculture Engineering, Multan</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Focal Person</p>
                  <p className="text-base text-gray-700">{department.focal_person_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Designation</p>
                  <p className="text-base text-gray-700">{department.designation || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Address</p>
                  <p className="text-base text-gray-700">{department.address || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Contact</p>
                  <div className="space-y-1">
                    <p className="text-base text-gray-700">📞 {department.telephone || "N/A"}</p>
                    <p className="text-base text-gray-700">✉️ {department.email || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Building Details</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{buildingDetails.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Farm Machinery</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{farmMachinery.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Lab Machinery</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{labMachinery.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Human Resources</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{humanResources.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H3v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables */}
        <div className="space-y-6">
          {/* Building Details Table */}
          {buildingDetails.length > 0 ? (
            <DataTable
              title="Building Details"
              data={buildingDetails}
              columns={buildingColumns}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Building Details</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Farm Machinery Table */}
          {farmMachinery.length > 0 ? (
            <DataTable
              title="Farm Machinery"
              data={farmMachinery}
              columns={farmMachineryColumns}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Farm Machinery</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Lab Machinery Table */}
          {labMachinery.length > 0 ? (
            <DataTable
              title="Lab Machinery"
              data={labMachinery}
              columns={labMachineryColumns}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Lab Machinery</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Human Resources Table */}
          {humanResources.length > 0 ? (
            <DataTable
              title="Human Resources"
              data={humanResources}
              columns={humanResourcesColumns}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Human Resources</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Hand Boring Plants Table */}
          {handBoringPlants.length > 0 ? (
            <DataTable
              title="Hand Boring Plants"
              data={handBoringPlants}
              columns={handBoringPlantsColumns}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Hand Boring Plants</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Power Drilling Rigs Table */}
          {powerDrillingRigs.length > 0 ? (
            <DataTable
              title="Power Drilling Rigs"
              data={powerDrillingRigs}
              columns={powerDrillingRigsColumns}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Power Drilling Rigs</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Electricity Resistivity Meters Table */}
          {electricityResistivityMeters.length > 0 ? (
            <DataTable
              title="Electricity Resistivity Meters"
              data={electricityResistivityMeters}
              columns={electricityResistivityMetersColumns}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Electricity Resistivity Meters</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
