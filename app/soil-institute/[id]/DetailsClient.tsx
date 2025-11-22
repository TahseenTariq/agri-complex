"use client";
import { useMemo } from "react";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import type { PieLabelRenderProps } from "recharts/types/polar/Pie";
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

// Institute data mapping
const instituteData: Record<number, { name: string; image: string }> = {
  1: { name: "Agriculture Engineering Field Wing", image: "/agri.jpg.png" },
  2: { name: "Soil & Water Research Institute", image: "/soil.png.jpg" },
  3: { name: "Cotton Research Institute", image: "/cotton.jpg.png" },
  4: { name: "Horticulture Research Institute", image: "/hort.jpg.jpg" },
  5: { name: "Floriculture Research Institute", image: "/flori.jpg.jpg" },
  6: { name: "Mango Research Institute", image: "/mango.jpg.jpg" },
  7: { name: "Pesticides Quality Control Lab", image: "/lab.jpg.jpg" },
  8: { name: "MNS University Of Agriculture", image: "/mns.png.jpg" },
  9: { name: "Agricultural Extension", image: "/ext.jpg.jpg" },
  10: { name: "Agricultural Mechanization Research Institute", image: "/amri.jpg.jpeg" },
};

// Static dummy data - simple hardcoded values
const getDummyData = (id: number) => {
  const institute = instituteData[id] || { name: "Unknown Institute", image: "/cotton.jpg.png" };
  
  const department: Department = {
    id: `dept-${id}`,
    department_name: institute.name,
    focal_person_name: "Dr. Muhammad Ali Khan",
    designation: "Director",
    address: "123 Agricultural Complex, Multan, South Punjab",
    telephone: "061-1234-5678",
    email: `info@${institute.name.toLowerCase().replace(/\s+/g, '-')}.gov.pk`,
  };

  const land: LandBuilding = {
    total_area: 250,
    area_under_cultivation: 150,
    area_under_buildings: 40,
    area_under_roads: 20,
    building_rooms: 45,
    laboratories: 8,
  };

  const hr: HumanResource = {
    total_officers: 25,
    officials_and_field_staff: 50,
    vacant_for_officers: 5,
  };

  const labEquipment: LabEquipment[] = [
    { id: `lab-${id}-1`, serial_no: 1, equipment_name: "Microscope", model_specification: "Model 2020-A", department: "Main Laboratory", quantity: 2, status: "Functional" },
    { id: `lab-${id}-2`, serial_no: 2, equipment_name: "Spectrophotometer", model_specification: "Model 2019-B", department: "Main Laboratory", quantity: 1, status: "Functional" },
    { id: `lab-${id}-3`, serial_no: 3, equipment_name: "Centrifuge", model_specification: "Model 2021-C", department: "Main Laboratory", quantity: 3, status: "Functional" },
    { id: `lab-${id}-4`, serial_no: 4, equipment_name: "PCR Machine", model_specification: "Model 2022-D", department: "Main Laboratory", quantity: 1, status: "Non-Functional" },
    { id: `lab-${id}-5`, serial_no: 5, equipment_name: "Incubator", model_specification: "Model 2020-E", department: "Main Laboratory", quantity: 2, status: "Functional" },
  ];

  const farmMachinery: FarmMachinery[] = [
    { id: `farm-${id}-1`, serial_no: 1, machine_name: "Tractor", model_year: 2020, location: "Field A", quantity: 2, status: "Functional" },
    { id: `farm-${id}-2`, serial_no: 2, machine_name: "Harvester", model_year: 2019, location: "Field B", quantity: 1, status: "Functional" },
    { id: `farm-${id}-3`, serial_no: 3, machine_name: "Plow", model_year: 2021, location: "Field C", quantity: 3, status: "Functional" },
    { id: `farm-${id}-4`, serial_no: 4, machine_name: "Irrigation Pump", model_year: 2018, location: "Main Compound", quantity: 2, status: "Non-Functional" },
  ];

  return { department, land, hr, labEquipment, farmMachinery, institute };
};

const RADIAN = Math.PI / 180;

const renderValueLabel = (props: PieLabelRenderProps) => {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, value = 0, name } = props;
  const numericCx = typeof cx === "number" ? cx : Number(cx ?? 0);
  const numericCy = typeof cy === "number" ? cy : Number(cy ?? 0);
  const numericMidAngle = typeof midAngle === "number" ? midAngle : Number(midAngle ?? 0);
  const numericInnerRadius = typeof innerRadius === "number" ? innerRadius : Number(innerRadius ?? 0);
  const numericOuterRadius = typeof outerRadius === "number" ? outerRadius : Number(outerRadius ?? 0);
  const numericValue = typeof value === "number" ? value : Number(value ?? 0);
  const label = formatLabel(name, Number.isFinite(numericValue) ? numericValue : undefined);
  if (!label) return null;
  const radius = numericInnerRadius + (numericOuterRadius - numericInnerRadius) * 1.08;
  const x = numericCx + radius * Math.cos(-numericMidAngle * RADIAN);
  const y = numericCy + radius * Math.sin(-numericMidAngle * RADIAN);
  const isRightSide = x > numericCx;
  const textOffset = isRightSide ? 28 : -28;
  return (
    <text x={x + textOffset} y={y} fill="#2a0f21" fontSize={16} fontWeight={700} textAnchor={isRightSide ? "start" : "end"} dominantBaseline="middle">
      {label}
    </text>
  );
};

const tooltipFormatter = (value: ValueType, name: NameType): [string, string] => [String(value ?? ""), String(name ?? "")];
const formatLabel = (name: string | undefined, absolute?: number) => {
  const safeName = name ?? "";
  const safeValue = typeof absolute === "number" && Number.isFinite(absolute) ? absolute : undefined;
  return typeof safeValue === "number" ? `${safeName} ${safeValue}` : safeName;
};

type PieDatum = { name: string; value: number };
const colorPalette = ["#2563EB", "#11a9ff", "#14B8A6", "#22C55E"];
const getSliceColor = (index: number) => colorPalette[index % colorPalette.length];

const renderPieVisualization = (title: string, data: PieDatum[], gradientPrefix: string, emptyMessage: string, options?: { chartHeight?: number }) => {
  const chartHeight = options?.chartHeight ?? 320;
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-indigo-50 to-cyan-50 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">{title}</h3>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={110} innerRadius={40} dataKey="value" paddingAngle={2} stroke="white" strokeWidth={3} labelLine label={renderValueLabel}>
                {data.map((slice, index) => {
                  const fillColor = getSliceColor(index);
                  return (
                    <Cell
                      key={`${gradientPrefix}-slice-${slice.name}`}
                      fill={fillColor}
                      style={{ filter: "drop-shadow(0 8px 16px rgba(22, 67, 174, 0.18))", transition: "transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease" }}
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
                  );
                })}
              </Pie>
              <Tooltip formatter={tooltipFormatter} contentStyle={{ backgroundColor: "#ffffff", border: "1px solid rgba(148, 163, 184, 0.25)", borderRadius: "14px", boxShadow: "0 18px 28px -16px rgba(15, 23, 42, 0.45)", padding: "14px 18px" }} labelStyle={{ fontWeight: 600, color: "#1f2937" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-gray-600">
            {data.map((slice, index) => {
              const fillColor = getSliceColor(index);
              return (
                <div key={`${gradientPrefix}-legend-${slice.name}`} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: fillColor }} />
                  <span className="font-medium">{slice.name}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-40 rounded-xl bg-white/60 border border-white/60 text-sm text-gray-500">{emptyMessage}</div>
      )}
    </div>
  );
};

export default function DetailsClient({ id }: { id: number }) {
  // Ensure id is valid, default to 1 if invalid
  const validId = (isNaN(id) || id < 1 || id > 10) ? 1 : id;
  const { department, land, hr, labEquipment, farmMachinery, institute } = getDummyData(validId);

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
    return [{ name: "Cultivation", value: cultivation }, { name: "Buildings", value: buildings }, { name: "Roads", value: roads }, { name: "Other", value: other }].filter((slice) => slice.value > 0);
  }, [land]);

  const hrChartData = useMemo<PieDatum[]>(() => {
    if (!hr) return [];
    return [{ name: "Officers", value: Number(hr.total_officers) || 0 }, { name: "Field Staff", value: Number(hr.officials_and_field_staff) || 0 }, { name: "Vacant", value: Number(hr.vacant_for_officers) || 0 }].filter((slice) => slice.value > 0);
  }, [hr]);

  const labChartData = useMemo<PieDatum[]>(() => [{ name: "Functional", value: summaryStats.functionalLabEquipment }, { name: "Non-Functional", value: summaryStats.nonFunctionalLabEquipment }].filter((slice) => slice.value > 0), [summaryStats.functionalLabEquipment, summaryStats.nonFunctionalLabEquipment]);

  const farmChartData = useMemo<PieDatum[]>(() => [{ name: "Functional", value: summaryStats.functionalFarmMachinery }, { name: "Non-Functional", value: summaryStats.nonFunctionalFarmMachinery }].filter((slice) => slice.value > 0), [summaryStats.functionalFarmMachinery, summaryStats.nonFunctionalFarmMachinery]);

  return (
    <div className="min-h-screen bg-app-surface">
      <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 min-h-[3.5rem] sm:min-h-[1.3in]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-start gap-0 sm:gap-3 h-full text-left">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105">
              <Image src={institute.image} alt={institute.name} fill className="object-cover" priority unoptimized />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h1 className="text-lg sm:text-xl md:text-3xl lg:text-2xl font-semibold text-gray-900 leading-tight">{department.department_name}</h1>
              <p className="text-[11px] sm:text-sm text-gray-600 mt-.5">Dashboard &amp; Analytics</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
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
        </section>

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
            {renderPieVisualization("Area Distribution", landChartData, "land", "Area data not available.")}
          </div>
        </section>

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
            {renderPieVisualization("HR Resource Breakdown", hrChartData, "hr", "No HR data available.", { chartHeight: 260 })}
          </div>
        </section>

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
            <div className="mb-6">{renderPieVisualization("Equipment Status", labChartData, "lab", "No equipment status data.", { chartHeight: 260 })}</div>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Serial No</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider">Equipment Name</th>
                      <th className="px-4 py-3 text-left text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 uppercase tracking-wider hidden sm:table-cell">Model/Specification</th>
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
                        <td className="px-4 py-3 whitespace-nowrap text-[11px] sm:text-xs md:text-sm text-gray-900">{item.quantity ?? "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-3 py-1.5 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${item.status?.toLowerCase() === "functional" ? "bg-green-500 text-white" : item.status?.toLowerCase() === "non-functional" ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"}`}>{item.status || "N/A"}</span>
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
            <div className="mb-6">{renderPieVisualization("Machinery Status", farmChartData, "farm", "No machinery status data.", { chartHeight: 260 })}</div>
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
                          <span className={`px-3 py-1.5 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${item.status?.toLowerCase() === "functional" ? "bg-green-500 text-white" : item.status?.toLowerCase() === "non-functional" ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"}`}>{item.status || "N/A"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

