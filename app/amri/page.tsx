"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), { ssr: false });
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });

interface MachineryItem {
  name: string;
  qty: number;
  status: string;
}

export default function AMRIPage() {
  const router = useRouter();
  const [machineryData, setMachineryData] = useState<MachineryItem[]>([]);
  const [summary, setSummary] = useState({ total: 0, functional: 0, nonFunctional: 0 });

  useEffect(() => {
    const data: MachineryItem[] = [
      { name: "Disk Plow", qty: 1, status: "Functional" },
      { name: "Ditcher", qty: 1, status: "Functional" },
      { name: "Chisel Plow", qty: 1, status: "Functional" },
      { name: "Border Disk", qty: 1, status: "Functional" },
      { name: "Post Hole Digger", qty: 1, status: "Functional" },
      { name: "Fertilizer Spreader", qty: 1, status: "Functional" },
      { name: "Rice Transplanter", qty: 1, status: "Not Functional" },
      { name: "Sub Soiler", qty: 1, status: "Not Functional" },
      { name: "Rotary Slasher", qty: 1, status: "Not Functional" },
      { name: "Spring Tine Cultivator", qty: 1, status: "Not Functional" },
      { name: "Sugarcane set cutter", qty: 1, status: "Not Functional" },
      { name: "Self-Leveling boom sprayer", qty: 1, status: "Not Functional" }
    ];

    // Summary Calculations
    const total = data.length;
    const functional = data.filter(x => x.status === "Functional").length;
    const nonFunctional = total - functional;

    setMachineryData(data);
    setSummary({ total, functional, nonFunctional });
  }, []);

  const pieData = [
    { name: "Functional", value: summary.functional },
    { name: "Not Functional", value: summary.nonFunctional },
  ];

  // Chart.js default colors for pie chart
  const COLORS = ["#36A2EB", "#FF6384"];

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-center mb-8 text-3xl font-bold">AMRI Machinery Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-summary card-total">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#36A2EB' }}>{summary.total}</h2>
            <p>Total Machinery</p>
          </div>
          <div className="card-summary card-functional">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#4BC0C0' }}>{summary.functional}</h2>
            <p>Functional</p>
          </div>
          <div className="card-summary card-nonfunctional">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#FF6384' }}>{summary.nonFunctional}</h2>
            <p>Non-Functional</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Functional vs Non-Functional Chart */}
          <div className="card-chart">
            <h5 className="text-center chart-heading mb-4">Functional vs Non-Functional</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Machinery Types Chart */}
          <div className="card-chart">
            <h5 className="text-center chart-heading mb-4">Top Machinery Types</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={machineryData.map(x => ({ name: x.name.substring(0, 12), qty: x.qty }))}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qty" fill="#36A2EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Section */}
        <div className="card-table">
          <h5 className="text-xl font-bold mb-4 chart-heading">Complete Machinery List</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Machinery Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {machineryData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? "table-row-even hover:bg-gray-50" : "table-row-odd hover:bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.qty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === "Functional"
                            ? "status-functional"
                            : "status-nonfunctional"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-summary {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          padding: 24px;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card-summary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }
        .card-total {
          border-left: 4px solid #36A2EB;
        }
        .card-functional {
          border-left: 4px solid #4BC0C0;
        }
        .card-nonfunctional {
          border-left: 4px solid #FF6384;
        }
        .card-chart {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          padding: 24px;
        }
        .chart-heading {
          font-size: 1rem;
          font-weight: 600;
          color: #2c3e50;
          text-transform: none;
          letter-spacing: 0.3px;
        }
        .card-table {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          padding: 24px;
        }
        .table-header {
          background: #003f5c;
          color: white;
        }
        .table-row-even {
          background-color: #ffffff;
        }
        .table-row-odd {
          background-color: #f8f9fa;
        }
        .status-functional {
          background-color: #4BC0C0;
          color: white;
        }
        .status-nonfunctional {
          background-color: #FF6384;
          color: white;
        }
        h1, h2 {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
