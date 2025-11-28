"use client";

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

export default function MRIPage() {
  const hrData = [
    { name: 'Filled', value: 33 },
    { name: 'Vacant', value: 18 },
  ];

  const landData = [
    { name: 'Office', value: 9 },
    { name: 'Buildings', value: 23 },
    { name: 'Cultivated', value: 32 },
  ];

  const COLORS = ['#3498db', '#e74c3c', '#1a237e'];

  return (
    <div style={{ background: '#eef2f7', minHeight: '100vh' }}>
      <div className="mri-header">
        <h1>Mango Research Institute</h1>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="summary-grid mb-4">
          <div className="card-summary">
            <h3>Total Posts</h3>
            <h2>51</h2>
          </div>
          <div className="card-summary">
            <h3>Filled</h3>
            <h2 style={{ color: 'green' }}>33</h2>
          </div>
          <div className="card-summary">
            <h3>Vacant</h3>
            <h2 style={{ color: 'red' }}>18</h2>
          </div>
        </div>

        <h3 className="section-title mb-2">Land Resource</h3>
        <div className="card mb-4">
          <table className="data-table">
            <thead><tr><th>Office</th><th>Buildings</th><th>Cultivated</th><th>Total</th></tr></thead>
            <tbody><tr><td>9 Acre</td><td>23 Acre</td><td>32 Acre</td><td>64 Acre</td></tr></tbody>
          </table>
        </div>

        <h3 className="section-title">Building Details</h3>
        <div className="card mb-4">
          <table className="data-table">
            <thead><tr><th>Acres</th><th>Rooms</th><th>Men Washroom</th><th>Women Washroom</th></tr></thead>
            <tbody><tr><td>4</td><td>39</td><td>2</td><td>1</td></tr></tbody>
          </table>
        </div>

        <h3 className="section-title">Farm Machinery</h3>
        <div className="card mb-4">
          <table className="data-table">
            <thead><tr><th>Equipment</th><th>Qty</th></tr></thead>
            <tbody>
              <tr><td>Tractor</td><td>1</td></tr>
              <tr><td>Tractor Trolley</td><td>1</td></tr>
              <tr><td>Cultivator</td><td>1</td></tr>
              <tr><td>Rotavator</td><td>2</td></tr>
              <tr><td>Weed Slasher</td><td>1</td></tr>
              <tr><td>Air Blast Sprayer</td><td>1</td></tr>
              <tr><td>Nozel Sprayer</td><td>1</td></tr>
              <tr><td>Water Bowser</td><td>1</td></tr>
              <tr><td>Vehicles</td><td>4</td></tr>
            </tbody>
          </table>
        </div>

        <div className="charts-grid">
          <div className="card">
            <h4 className="text-center mb-3">Human Resource Status</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={hrData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {hrData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h4 className="text-center mb-3">Land Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={landData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1a237e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mri-header{background:#1a237e;color:#fff;padding:25px;text-align:center;font-size:30px;font-weight:600;}
        .summary-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;}
        .card-summary{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);padding:20px;text-align:center;}
        .card-summary h3{color:#1a237e;font-weight:600;margin-bottom:10px;font-size:18px;}
        .card-summary h2{font-size:32px;font-weight:700;margin:0;}
        .section-title{color:#1a237e;font-weight:600;font-size:22px;margin:20px 0 10px 0;}
        .card{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);padding:20px;}
        .data-table{width:100%;border-collapse:collapse;text-align:center;}
        .data-table th{background-color:#f8f9fa;color:#1a237e;padding:12px;font-weight:600;border:1px solid #dee2e6;}
        .data-table td{padding:12px;border:1px solid #dee2e6;}
        .data-table tr:nth-child(even){background-color:#f8f9fa;}
        .data-table tr:hover{background-color:#e9ecef;}
        .charts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:20px;margin-top:20px;}
        @media (max-width:768px){.summary-grid{grid-template-columns:1fr;}.charts-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

