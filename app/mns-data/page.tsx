"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState, useMemo, memo, Suspense } from "react";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
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

const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });

type PieDatum = { name: string; value: number };

interface GradientStop {
  start: string;
  end: string;
}

const chartPalettes: Record<string, GradientStop[]> = {
  buildings: [
    { start: "#2563EB", end: "#60A5FA" },
    { start: "#1E3A8A", end: "#3B82F6" },
    { start: "#0EA5E9", end: "#67E8F9" },
    { start: "#38BDF8", end: "#0EA5E9" },
    { start: "#1D4ED8", end: "#3B82F6" },
  ],
  farm: [
    { start: "#16A34A", end: "#4ADE80" },
    { start: "#22C55E", end: "#86EFAC" },
    { start: "#15803D", end: "#34D399" },
    { start: "#0F766E", end: "#14B8A6" },
    { start: "#14532D", end: "#22C55E" },
  ],
  lab: [
    { start: "#7C3AED", end: "#C4B5FD" },
    { start: "#8B5CF6", end: "#A855F7" },
    { start: "#6D28D9", end: "#A78BFA" },
    { start: "#9333EA", end: "#C084FC" },
    { start: "#5B21B6", end: "#7C3AED" },
  ],
  human: [
    { start: "#F97316", end: "#FDBA74" },
    { start: "#F97316", end: "#F59E0B" },
    { start: "#EA580C", end: "#FBBF24" },
    { start: "#C2410C", end: "#FB923C" },
    { start: "#F97316", end: "#FB923C" },
  ],
  hand: [
    { start: "#0EA5E9", end: "#67E8F9" },
    { start: "#0284C7", end: "#38BDF8" },
    { start: "#0369A1", end: "#0EA5E9" },
    { start: "#075985", end: "#38BDF8" },
    { start: "#0EA5E9", end: "#22D3EE" },
  ],
  power: [
    { start: "#F43F5E", end: "#FECDD3" },
    { start: "#E11D48", end: "#FDA4AF" },
    { start: "#BE123C", end: "#FB7185" },
    { start: "#9F1239", end: "#F43F5E" },
    { start: "#F43F5E", end: "#FB7185" },
  ],
  electricity: [
    { start: "#6366F1", end: "#A5B4FC" },
    { start: "#4F46E5", end: "#818CF8" },
    { start: "#4338CA", end: "#6366F1" },
    { start: "#312E81", end: "#4F46E5" },
    { start: "#6366F1", end: "#A855F7" },
  ],
};

const fallbackPalette: GradientStop[] = [
  { start: "#2563EB", end: "#60A5FA" },
  { start: "#22C55E", end: "#86EFAC" },
  { start: "#F97316", end: "#FDBA74" },
  { start: "#8B5CF6", end: "#C4B5FD" },
  { start: "#F43F5E", end: "#FDA4AF" },
  { start: "#0EA5E9", end: "#67E8F9" },
  { start: "#EC4899", end: "#F9A8D4" },
  { start: "#14B8A6", end: "#5EEAD4" },
];

const tooltipFormatter = (value: ValueType, name: NameType): [string, string] => [String(value ?? ""), String(name ?? "")];

const formatLabel = (name: string | undefined, percent: number | undefined) => {
  const safePercent = typeof percent === "number" ? percent * 100 : 0;
  const safeName = name ?? "";
  return `${safeName}: ${safePercent.toFixed(1)}%`;
};

const formatAbsoluteLabel = (
  name: string | undefined,
  value: number | undefined,
  formatter?: (value: number) => string
) => {
  const safeValue = typeof value === "number" && Number.isFinite(value) ? value : 0;
  const formattedValue = formatter ? formatter(safeValue) : safeValue.toString();
  const label = name ?? "";
  return `${label}: ${formattedValue}`;
};

const resolveGradient = (chartId: string, index: number): GradientStop => {
  const palette = chartPalettes[chartId] ?? fallbackPalette;
  return palette[index % palette.length];
};

interface PieVisualizationOptions {
  chartHeight?: number;
  titleClassName?: string;
  labelMode?: "percent" | "value";
  valueFormatter?: (value: number) => string;
}

const renderPieVisualization = (
  title: string,
  data: PieDatum[],
  chartId: string,
  emptyMessage: string,
  options?: PieVisualizationOptions
) => {
  const chartHeight = options?.chartHeight ?? 320;
  const titleClassName = options?.titleClassName ?? "text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center";
  const labelMode = options?.labelMode ?? "percent";
  const valueFormatterOption = options?.valueFormatter;

  const tooltipFormatterWithMode = (value: ValueType, name: NameType): [string, string] => {
    if (labelMode === "value") {
      const numericValue =
        typeof value === "number"
          ? value
          : Array.isArray(value)
          ? Number(value[0])
          : Number(value ?? 0);
      const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
      const formatted = valueFormatterOption ? valueFormatterOption(safeValue) : safeValue.toString();
      return [formatted, String(name ?? "")];
    }
    return tooltipFormatter(value, name);
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <h3 className={titleClassName}>{title}</h3>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <defs>
                {data.map((slice, index) => {
                  const { start, end } = resolveGradient(chartId, index);
                  return (
                    <linearGradient key={`${chartId}-grad-${index}`} id={`${chartId}-grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={start} stopOpacity={0.95} />
                      <stop offset="60%" stopColor={start} stopOpacity={0.82} />
                      <stop offset="100%" stopColor={end} stopOpacity={0.68} />
                    </linearGradient>
                  );
                })}
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={58}
                dataKey="value"
                paddingAngle={2}
                stroke="white"
                strokeWidth={3}
                label={({ name, percent, value }: { name?: string; percent?: number; value?: number }) =>
                  labelMode === "value"
                    ? formatAbsoluteLabel(name, value, valueFormatterOption)
                    : formatLabel(name, percent)
                }
                labelLine={false}
              >
                {data.map((slice, index) => (
                  <Cell
                    key={`${chartId}-slice-${slice.name}-${index}`}
                    fill={`url(#${chartId}-grad-${index})`}
                    style={{
                      filter: "drop-shadow(0 12px 16px rgba(15, 23, 42, 0.18))",
                      transition: "transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease",
                    }}
                    onMouseEnter={(event) => {
                      const target = event.currentTarget as SVGElement;
                      target.style.transform = "scale(1.05)";
                      target.style.filter = "drop-shadow(0 20px 28px rgba(15, 23, 42, 0.28))";
                      target.style.opacity = "0.95";
                    }}
                    onMouseLeave={(event) => {
                      const target = event.currentTarget as SVGElement;
                      target.style.transform = "scale(1)";
                      target.style.filter = "drop-shadow(0 12px 16px rgba(15, 23, 42, 0.18))";
                      target.style.opacity = "1";
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={tooltipFormatterWithMode}
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
              const { start, end } = resolveGradient(chartId, index);
              return (
                <div key={`${chartId}-legend-${slice.name}-${index}`} className="flex items-center gap-2">
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
        <div className="flex items-center justify-center h-40 rounded-xl bg-white/70 border border-white/60 text-sm text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

// Skeleton Components
const SkeletonCard = memo(() => (
  <div className="panel-card-soft rounded-xl shadow-lg p-6 sm:p-8 animate-pulse">
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
  <div className="panel-card-soft rounded-xl shadow-lg p-6 animate-pulse overflow-hidden">
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

const ChartSkeleton = memo(() => (
  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border border-slate-200 p-6 animate-pulse">
    <div className="h-5 w-40 bg-gray-200 rounded mx-auto mb-6"></div>
    <div className="mx-auto bg-gray-200 rounded-full" style={{ width: 220, height: 220 }}></div>
  </div>
));
ChartSkeleton.displayName = "ChartSkeleton";

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
      <div className="panel-card rounded-xl shadow-lg p-6 sm:p-8">
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
    <div className="panel-card rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 pb-2 border-b border-gray-200 flex-wrap">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>{title}</span> <span className="text-xs sm:text-sm md:text-base font-normal text-gray-500">({data.length} records)</span>
      </h3>
      <div className="overflow-x-auto -mx-4 sm:-mx-6 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <div className="overflow-y-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px]">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gradient-to-r from-gray-700 to-gray-800 sticky top-0 z-10">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-[10px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-wider border-b border-gray-600"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="table-surface divide-y divide-gray-200">
                  {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      {columns.map((col) => (
                        <td key={col.key} className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-[10px] sm:text-xs md:text-sm text-gray-900">
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

type ValueSummary = {
  values: string[];
  uniqueValues: string[];
  validCount: number;
};

const derivePieData = (
  records: any[],
  preferredKeys: string[] = []
): PieDatum[] => {
  if (!records || records.length === 0) return [];

  const rows = records.filter((row) => row && typeof row === "object");
  if (rows.length === 0) return [];

  const skipKeys = new Set(["id", "created_at", "updated_at", "department_id", "_sr_no"]);
  const lowerPreferred = preferredKeys.map((key) => key.toLowerCase());

  const collectUniqueValues = (key: string): ValueSummary => {
    const values: string[] = rows
      .map((row) => row[key])
      .map((value) => {
        if (value === null || value === undefined || value === "") {
          return "Unknown";
        }
        if (typeof value === "number") {
          return value.toString();
        }
        return String(value).trim() || "Unknown";
      });

    const uniqueValues = Array.from(new Set(values));
    const validCount = values.filter((val) => val !== "Unknown").length;

    return { values, uniqueValues, validCount };
  };

  const candidateKeys = Array.from(
    new Set(
      rows.flatMap((row) =>
        Object.keys(row || {})
          .map((key) => key.trim())
          .filter((key) => key && !skipKeys.has(key.toLowerCase()) && key.toLowerCase() !== "serial_no")
      )
    )
  );

  let chosenKey: string | null = null;
  let chosenDetails: ValueSummary | null = null;
  let bestScore = -Infinity;

  candidateKeys.forEach((key) => {
    const { values, uniqueValues, validCount } = collectUniqueValues(key);
    if (values.length === 0) return;

    const uniqueCount = uniqueValues.length;
    if (uniqueCount === 0) return;

    const keyLower = key.toLowerCase();
    const preferredIndex = lowerPreferred.indexOf(keyLower);

    const isPreferred = preferredIndex !== -1;
    const isCategoricalRange = uniqueCount <= 8;
    const diversityScore = Math.min(uniqueCount, 10);

    let score = diversityScore;
    if (isPreferred) score += 50 - preferredIndex * 2;
    if (isCategoricalRange) score += 15;
    if (validCount / values.length > 0.4) score += 10;

    if (score > bestScore) {
      bestScore = score;
      chosenKey = key;
      chosenDetails = { values, uniqueValues, validCount };
    }
  });

  if (!chosenKey) {
    return [{ name: "Total Records", value: rows.length }];
  }

  if (!chosenDetails) {
    return [{ name: "Total Records", value: rows.length }];
  }

  const detailValues = (chosenDetails as ValueSummary).values;

  const counts = detailValues.reduce<Record<string, number>>((acc: Record<string, number>, value: string) => {
    const label = formatColumnName(value);
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});

  const entries: PieDatum[] = Object.entries(counts)
    .map(([name, value]) => ({ name, value: Number(value) }))
    .sort((a, b) => b.value - a.value);

  if (entries.length <= 8) {
    return entries;
  }

  const topEntries = entries.slice(0, 7);
  const otherTotal = entries.slice(7).reduce((sum, entry) => sum + entry.value, 0);
  return [...topEntries, { name: "Other", value: otherTotal }];
};

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

  const buildingPieData = useMemo(() => derivePieData(buildingDetails, [
    "status",
    "building_type",
    "type",
    "category",
    "condition",
    "usage",
  ]), [buildingDetails]);

  const farmMachineryPieData = useMemo(() => derivePieData(farmMachinery, [
    "status",
    "condition",
    "machine_type",
    "category",
    "location",
  ]), [farmMachinery]);

  const labMachineryPieData = useMemo(() => derivePieData(labMachinery, [
    "status",
    "equipment_type",
    "condition",
    "category",
    "department",
  ]), [labMachinery]);

  const humanResourcesPieData = useMemo(() => derivePieData(humanResources, [
    "designation",
    "status",
    "role",
    "employment_type",
    "category",
  ]), [humanResources]);

  const handBoringPlantsPieData = useMemo(() => derivePieData(handBoringPlants, [
    "status",
    "type",
    "category",
    "condition",
    "location",
  ]), [handBoringPlants]);

  const powerDrillingRigsPieData = useMemo(() => derivePieData(powerDrillingRigs, [
    "status",
    "type",
    "category",
    "condition",
    "location",
  ]), [powerDrillingRigs]);

  const electricityResistivityMetersPieData = useMemo(() => derivePieData(electricityResistivityMeters, [
    "status",
    "type",
    "category",
    "condition",
    "location",
  ]), [electricityResistivityMeters]);


  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-app-surface">
        <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 min-h-[3rem] sm:min-h-[1.3in]">
      <div className="max-w-7xl mx-auto px-3 py-1 sm:px-6 md:px-8 lg:px-10 sm:py-0 h-full">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-2 sm:gap-4 md:gap-5 flex-shrink-0">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex-shrink-0 bg-gray-200 rounded-lg animate-pulse"></div>
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
    <div className="min-h-screen bg-app-surface">
      {/* Header Section */}
      <header className="bg-white shadow-lg rounded-b-xl sticky top-0 z-50 min-h-[3rem] sm:min-h-[1.3in]">
        <div className="max-w-7xl mx-auto px-3 py-1 sm:px-6 md:px-8 lg:px-10 sm:py-0 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-5 flex-shrink-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/agri.jpg.png"
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
                <h1 className="text-base sm:text-lg md:text-xl lg:text-4xl font-medium text-gray-800 leading-tight tracking-tight">
                    Agriculture Engineering
                </h1>
                <p className="text-xs sm:text-xs md:text-sm text-gray-600 leading-tight mt-0.5">
                  Resources Information
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
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
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M10.343 3.94c.09-.54.56-.94 1.11-.94h1.094c.55 0 1.02.4 1.11.94l.149.894a1.125 1.125 0 001.64.79l.805-.46a1.125 1.125 0 011.45.372l.548.95c.275.476.18 1.08-.223 1.45l-.67.62c-.4.37-.45.98-.11 1.42l.53.69c.33.43.38 1.03.12 1.5l-.51.88c-.26.46-.78.7-1.29.59l-.936-.21c-.53-.12-1.07.16-1.25.68l-.29.86c-.17.52-.66.86-1.2.86h-1.094c-.55 0-1.02-.34-1.11-.86l-.149-.894a1.125 1.125 0 00-1.64-.79l-.805.46a1.125 1.125 0 01-1.45-.372l-.548-.95c-.275-.476-.18-1.08.223-1.45l.67-.62c.4-.37.45-.98.11-1.42l-.53-.69a1.125 1.125 0 01-.12-1.5l.51-.88c.26-.46.78-.7 1.29-.59l.936.21c.53.12 1.07-.16 1.25-.68l.29-.86z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
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

        {/* Department Info Section */}
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
              <div className="space-y-2.5">
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

        {/* Data Tables */}
        <div className="space-y-4 sm:space-y-6">
          {/* Building Details Table */}
          {buildingDetails.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              <Suspense fallback={<ChartSkeleton />}>
                {renderPieVisualization("Building Details Breakdown", buildingPieData, "buildings", "No breakdown data available.", { chartHeight: 260 })}
              </Suspense>
              <DataTable
                title="Building Details"
                data={buildingDetails}
                columns={buildingColumns}
              />
            </div>
          ) : (
            <div className="panel-card rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Building Details</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Farm Machinery Table */}
          {farmMachinery.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              <Suspense fallback={<ChartSkeleton />}>
                {renderPieVisualization("Farm Machinery Status", farmMachineryPieData, "farm", "No breakdown data available.", { chartHeight: 260 })}
              </Suspense>
              <DataTable
                title="Farm Machinery"
                data={farmMachinery}
                columns={farmMachineryColumns}
              />
            </div>
          ) : (
            <div className="panel-card rounded-xl shadow-lg p-6 sm:p-8">
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
            <div className="panel-card rounded-xl shadow-lg p-6 sm:p-8">
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
            <div className="panel-card rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Human Resources</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Hand Boring Plants Table */}
          {handBoringPlants.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              <Suspense fallback={<ChartSkeleton />}>
                {renderPieVisualization("Hand Boring Plants Overview", handBoringPlantsPieData, "hand", "No breakdown data available.", { chartHeight: 260 })}
              </Suspense>
              <DataTable
                title="Hand Boring Plants"
                data={handBoringPlants}
                columns={handBoringPlantsColumns}
              />
            </div>
          ) : (
            <div className="panel-card rounded-xl shadow-lg p-6 sm:p-8">
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
            <div className="panel-card rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Power Drilling Rigs</h3>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          )}

          {/* Electricity Resistivity Meters Table */}
          {electricityResistivityMeters.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              <Suspense fallback={<ChartSkeleton />}>
                {renderPieVisualization("Electricity Resistivity Meters", electricityResistivityMetersPieData, "electricity", "No breakdown data available.", { chartHeight: 260 })}
              </Suspense>
              <DataTable
                title="Electricity Resistivity Meters"
                data={electricityResistivityMeters}
                columns={electricityResistivityMetersColumns}
              />
            </div>
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
