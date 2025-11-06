"use client";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState, useMemo, Suspense, memo } from "react";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import Image from "next/image";
import dynamic from "next/dynamic";

const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });

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

const SkeletonCard = memo(() => (
  <div className="panel-card-soft rounded-xl shadow-lg p-6 sm:p-8 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-4/6" />
    </div>
  </div>
));
SkeletonCard.displayName = "SkeletonCard";

const SkeletonSummaryCard = memo(() => (
  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg p-6 border-l-4 border-gray-300 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-24" />
        <div className="h-8 bg-gray-300 rounded w-16" />
      </div>
      <div className="w-12 h-12 bg-gray-300 rounded-full" />
    </div>
  </div>
));
SkeletonSummaryCard.displayName = "SkeletonSummaryCard";

const TableSkeleton = memo(() => (
  <div className="panel-card-soft rounded-xl shadow-lg p-6 sm:p-8 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-48 mb-6" />
    <div className="space-y-3">
      <div className="h-12 bg-gray-200 rounded" />
      <div className="h-12 bg-gray-200 rounded" />
      <div className="h-12 bg-gray-200 rounded" />
      <div className="h-12 bg-gray-200 rounded" />
    </div>
  </div>
));
TableSkeleton.displayName = "TableSkeleton";

const ChartSkeleton = memo(() => (
  <div className="bg-gray-100/70 rounded-2xl border border-gray-200 p-6 animate-pulse">
    <div className="h-5 w-40 bg-gray-200 rounded mx-auto mb-5" />
    <div className="mx-auto bg-gray-200 rounded-full" style={{ width: 220, height: 220 }} />
  </div>
));
ChartSkeleton.displayName = "ChartSkeleton";

const baseGradients = [
  { start: "#2563EB", end: "#60A5FA" },
  { start: "#22C55E", end: "#86EFAC" },
  { start: "#F97316", end: "#FDBA74" },
  { start: "#8B5CF6", end: "#C4B5FD" },
  { start: "#F43F5E", end: "#FDA4AF" },
  { start: "#0EA5E9", end: "#67E8F9" },
  { start: "#EC4899", end: "#F9A8D4" },
  { start: "#14B8A6", end: "#5EEAD4" },
  { start: "#F59E0B", end: "#FCD34D" },
  { start: "#6366F1", end: "#A5B4FC" },
];

const resolveGradient = (name: string | undefined, index: number) => {
  return baseGradients[index % baseGradients.length];
};

const tooltipFormatter = (value: ValueType, name: NameType): [string, string] => [String(value ?? ""), String(name ?? "")];

const formatLabel = (name: string | undefined, percent?: number) => {
  const safeName = name ?? "";
  const safePercent = typeof percent === "number" ? (percent * 100).toFixed(0) : "";
  return safePercent ? `${safeName} ${safePercent}%` : safeName;
};

type PieDatum = { name: string; value: number };

const renderPieVisualization = (
  title: string,
  data: PieDatum[],
  gradientPrefix: string,
  emptyMessage: string,
  options?: { chartHeight?: number }
) => {
  const chartHeight = options?.chartHeight ?? 320;
  return (
  <div className="bg-gradient-to-br from-emerald-50 via-indigo-50 to-cyan-50 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">{title}</h3>
    {data.length > 0 ? (
      <>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <defs>
              {data.map((slice, index) => {
                const { start, end } = resolveGradient(slice.name, index);
                const gradientId = `${gradientPrefix}-grad-${index}`;
                return (
                  <linearGradient key={gradientId} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={start} stopOpacity={0.95} />
                    <stop offset="55%" stopColor={start} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={end} stopOpacity={0.65} />
                  </linearGradient>
                );
              })}
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={130}
              innerRadius={60}
              dataKey="value"
              paddingAngle={2}
              stroke="white"
              strokeWidth={3}
              label={({ name, percent }: { name?: string; percent?: number }) =>
                formatLabel(name, typeof percent === "number" ? percent : undefined)
              }
            >
              {data.map((slice, index) => (
                <Cell
                  key={`${gradientPrefix}-slice-${slice.name}`}
                  fill={`url(#${gradientPrefix}-grad-${index})`}
                  style={{
                    filter: "drop-shadow(0 8px 16px rgba(15, 23, 42, 0.18))",
                    transition: "transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease",
                  }}
                  onMouseEnter={(event) => {
                    const target = event.currentTarget as SVGElement;
                    target.style.transform = "scale(1.05)";
                    target.style.filter = "drop-shadow(0 16px 26px rgba(15, 23, 42, 0.28))";
                    target.style.opacity = "0.95";
                  }}
                  onMouseLeave={(event) => {
                    const target = event.currentTarget as SVGElement;
                    target.style.transform = "scale(1)";
                    target.style.filter = "drop-shadow(0 8px 16px rgba(15, 23, 42, 0.18))";
                    target.style.opacity = "1";
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                borderRadius: "14px",
                boxShadow: "0 18px 28px -16px rgba(15, 23, 42, 0.45)",
                padding: "14px 18px",
              }}
              labelStyle={{ fontWeight: 600, color: "#1f2937" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-gray-600">
          {data.map((slice, index) => {
            const { start, end } = resolveGradient(slice.name, index);
            return (
              <div key={`${gradientPrefix}-legend-${slice.name}`} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${start} 0%, ${end} 100%)` }}
                />
                <span className="font-medium">{slice.name}</span>
              </div>
            );
          })}
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center h-40 rounded-xl bg-white/60 border border-white/60 text-sm text-gray-500">
        {emptyMessage}
      </div>
    )}
  </div>
  );
};

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
          supabase.from("cri_land_building").select("*").eq("department_id", dept.id).single(),
          supabase.from("cri_human_resource").select("*").eq("department_id", dept.id).single(),
          supabase.from("cri_lab_equipment").select("*").eq("department_id", dept.id),
          supabase.from("cri_farm_machinery").select("*").eq("department_id", dept.id),
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

  const summaryStats = useMemo(() => {
    const totalLabEquipment = labEquipment.length;
    const totalFarmMachinery = farmMachinery.length;
    const functionalLabEquipment = labEquipment.filter((item) => item.status?.toLowerCase() === "functional").length;
    const functionalFarmMachinery = farmMachinery.filter((item) => item.status?.toLowerCase() === "functional").length;

    return {
      totalLabEquipment,
      functionalLabEquipment,
      nonFunctionalLabEquipment: totalLabEquipment - functionalLabEquipment,
      totalFarmMachinery,
      functionalFarmMachinery,
      nonFunctionalFarmMachinery: totalFarmMachinery - functionalFarmMachinery,
    };
  }, [labEquipment, farmMachinery]);

  const landChartData = useMemo<PieDatum[]>(() => {
    if (!land) return [];
    const cultivation = Number(land.area_under_cultivation) || 0;
    const buildings = Number(land.area_under_buildings) || 0;
    const roads = Number(land.area_under_roads) || 0;
    const total = Number(land.total_area) || 0;
    const other = Math.max(total - (cultivation + buildings + roads), 0);
    return [
      { name: "Cultivation", value: cultivation },
      { name: "Buildings", value: buildings },
      { name: "Roads", value: roads },
      { name: "Other", value: other },
    ].filter((slice) => slice.value > 0);
  }, [land]);

  const hrChartData = useMemo<PieDatum[]>(() => {
    if (!hr) return [];
    return [
      { name: "Officers", value: Number(hr.total_officers) || 0 },
      { name: "Field Staff", value: Number(hr.officials_and_field_staff) || 0 },
      { name: "Vacant", value: Number(hr.vacant_for_officers) || 0 },
    ].filter((slice) => slice.value > 0);
  }, [hr]);

  const labChartData = useMemo<PieDatum[]>(() => [
    { name: "Functional", value: summaryStats.functionalLabEquipment },
    { name: "Non-Functional", value: summaryStats.nonFunctionalLabEquipment },
  ].filter((slice) => slice.value > 0), [summaryStats.functionalLabEquipment, summaryStats.nonFunctionalLabEquipment]);

  const farmChartData = useMemo<PieDatum[]>(() => [
    { name: "Functional", value: summaryStats.functionalFarmMachinery },
    { name: "Non-Functional", value: summaryStats.nonFunctionalFarmMachinery },
  ].filter((slice) => slice.value > 0), [summaryStats.functionalFarmMachinery, summaryStats.nonFunctionalFarmMachinery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-app-surface">
        <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 h-[1.3in]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-full">
            <div className="flex items-center gap-4 h-full">
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[0, 1, 2, 3].map((item) => (
              <SkeletonSummaryCard key={`summary-skeleton-${item}`} />
            ))}
          </div>
          <div className="space-y-6">
            {[0, 1, 2].map((item) => (
              <SkeletonCard key={`card-skeleton-${item}`} />
            ))}
            <TableSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-surface">
      <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 h-[1.3in]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-full">
          <div className="flex items-center gap-4 h-full">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <Image src="/cotton.jpg.png" alt="Cotton Research Institute" fill className="object-cover" priority unoptimized />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                {department?.department_name || "Cotton Research Institute"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">Dashboard &amp; Analytics</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {hr && (
            <article className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Total Officers</p>
                  <p className="text-3xl font-bold text-gray-900">{hr.total_officers || 0}</p>
                </div>
                <div className="bg-blue-500 rounded-full p-3 shadow-inner">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </article>
          )}

          <article className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">Lab Equipment</p>
                <p className="text-3xl font-bold text-gray-900">{summaryStats.totalLabEquipment}</p>
                <p className="text-xs text-gray-600">{summaryStats.functionalLabEquipment} functional</p>
              </div>
              <div className="bg-green-500 rounded-full p-3 shadow-inner">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </article>

          <article className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">Farm Machinery</p>
                <p className="text-3xl font-bold text-gray-900">{summaryStats.totalFarmMachinery}</p>
                <p className="text-xs text-gray-600">{summaryStats.functionalFarmMachinery} functional</p>
              </div>
              <div className="bg-purple-500 rounded-full p-3 shadow-inner">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </article>

          {land && (
            <article className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Total Area</p>
                  <p className="text-3xl font-bold text-gray-900">{land.total_area || 0}</p>
                  <p className="text-xs text-gray-600">acres</p>
                </div>
                <div className="bg-orange-500 rounded-full p-3 shadow-inner">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
            </article>
          )}
        </section>

        {department && (
          <section className="panel-card rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8">
            <header className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
              <div className="bg-blue-100 rounded-lg p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Department Information</h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Department Name</p>
                  <p className="text-sm sm:text-base font-medium text-gray-900">{department.department_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Focal Person</p>
                  <p className="text-sm sm:text-base text-gray-700">{department.focal_person_name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Designation</p>
                  <p className="text-sm sm:text-base text-gray-700">{department.designation || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Address</p>
                  <p className="text-sm sm:text-base text-gray-700">{department.address || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Telephone</p>
                  <p className="text-sm sm:text-base text-gray-700">{department.telephone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                  <p className="text-sm sm:text-base text-gray-700">{department.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {land && (
          <section className="panel-card rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8">
            <header className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
              <div className="bg-green-100 rounded-lg p-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Land Resources &amp; Buildings</h2>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600">Total Area</p>
                    <p className="text-2xl font-bold text-gray-900">{land.total_area || "N/A"}</p>
                    <p className="text-xs text-gray-500">acres</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-600">Cultivation</p>
                    <p className="text-2xl font-bold text-gray-900">{land.area_under_cultivation || "N/A"}</p>
                    <p className="text-xs text-gray-500">acres</p>
                  </div>
                  <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                    <p className="text-sm text-gray-600">Buildings</p>
                    <p className="text-2xl font-bold text-gray-900">{land.area_under_buildings || "N/A"}</p>
                    <p className="text-xs text-gray-500">acres</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-600">Roads</p>
                    <p className="text-2xl font-bold text-gray-900">{land.area_under_roads || "N/A"}</p>
                    <p className="text-xs text-gray-500">acres</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-600">Building Rooms</p>
                    <p className="text-2xl font-bold text-gray-900">{land.building_rooms || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-sm text-gray-600">Laboratories</p>
                    <p className="text-2xl font-bold text-gray-900">{land.laboratories || "N/A"}</p>
                  </div>
                </div>
              </div>
              <Suspense fallback={<ChartSkeleton />}>
                {renderPieVisualization("Area Distribution", landChartData, "land", "Area data not available.")}
              </Suspense>
            </div>
          </section>
        )}

        {hr && (
          <section className="panel-card rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8">
            <header className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
              <div className="bg-blue-100 rounded-lg p-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Human Resources</h2>
            </header>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Officers</p>
                  <p className="text-3xl font-bold text-gray-900">{hr.total_officers || 0}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 text-center">
                  <p className="text-sm text-gray-600 mb-2">Field Staff</p>
                  <p className="text-3xl font-bold text-gray-900">{hr.officials_and_field_staff || 0}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 text-center">
                  <p className="text-sm text-gray-600 mb-2">Vacant</p>
                  <p className="text-3xl font-bold text-gray-900">{hr.vacant_for_officers || 0}</p>
                </div>
              </div>
              <Suspense fallback={<ChartSkeleton />}>
                {renderPieVisualization("HR Resource Breakdown", hrChartData, "hr", "No HR data available.", { chartHeight: 260 })}
              </Suspense>
            </div>
          </section>
        )}

        {labEquipment && labEquipment.length > 0 && (
          <section className="panel-card rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8">
            <header className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
              <div className="bg-emerald-100 rounded-lg p-2">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Laboratory Equipment</h2>
            </header>
            <div className="mb-6">
              <Suspense fallback={<ChartSkeleton />}>
                {renderPieVisualization("Equipment Status", labChartData, "lab", "No equipment status data.", { chartHeight: 260 })}
              </Suspense>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Serial No</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Equipment Name</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider hidden sm:table-cell">Model/Specification</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider hidden md:table-cell">Department</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-surface divide-y divide-gray-200">
                    {labEquipment.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-[11px] sm:text-xs md:text-sm text-gray-900">{item.serial_no ?? "N/A"}</td>
                        <td className="px-4 py-3 text-[11px] sm:text-xs md:text-sm text-gray-900">{item.equipment_name || "N/A"}</td>
                        <td className="px-4 py-3 text-[11px] sm:text-xs md:text-sm text-gray-600 hidden sm:table-cell">{item.model_specification || "N/A"}</td>
                        <td className="px-4 py-3 text-[11px] sm:text-xs md:text-sm text-gray-600 hidden md:table-cell">{item.department || "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-[11px] sm:text-xs md:text-sm text-gray-900">{item.quantity ?? "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-3 py-1.5 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${
                              item.status?.toLowerCase() === "functional"
                                ? "bg-green-500 text-white"
                                : item.status?.toLowerCase() === "non-functional"
                                ? "bg-red-500 text-white"
                                : "bg-gray-300 text-gray-700"
                            }`}
                          >
                            {item.status || "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {farmMachinery && farmMachinery.length > 0 && (
          <section className="panel-card rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8">
            <header className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
              <div className="bg-purple-100 rounded-lg p-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Farm Machinery</h2>
            </header>
            <div className="mb-6">
              <Suspense fallback={<ChartSkeleton />}>
                {renderPieVisualization("Machinery Status", farmChartData, "farm", "No machinery status data.", { chartHeight: 260 })}
              </Suspense>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Serial No</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Machine Name</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider hidden sm:table-cell">Model Year</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider hidden md:table-cell">Location</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-surface divide-y divide-gray-200">
                    {farmMachinery.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-[11px] sm:text-xs md:text-sm text-gray-900">{item.serial_no ?? "N/A"}</td>
                        <td className="px-4 py-3 text-[11px] sm:text-xs md:text-sm text-gray-900">{item.machine_name || "N/A"}</td>
                        <td className="px-4 py-3 text-[11px] sm:text-xs md:text-sm text-gray-600 hidden sm:table-cell">{item.model_year ?? "N/A"}</td>
                        <td className="px-4 py-3 text-[11px] sm:text-xs md:text-sm text-gray-600 hidden md:table-cell">{item.location || "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-[11px] sm:text-xs md:text-sm text-gray-900">{item.quantity ?? "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-3 py-1.5 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${
                              item.status?.toLowerCase() === "functional"
                                ? "bg-green-500 text-white"
                                : item.status?.toLowerCase() === "non-functional"
                                ? "bg-red-500 text-white"
                                : "bg-gray-300 text-gray-700"
                            }`}
                          >
                            {item.status || "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {!department && !land && !hr && (!labEquipment || labEquipment.length === 0) && (!farmMachinery || farmMachinery.length === 0) && (
          <div className="panel-card rounded-xl shadow-lg p-8 text-center text-gray-600">No data available at this time.</div>
        )}
      </main>
    </div>
  );
}

