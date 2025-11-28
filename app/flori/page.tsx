"use client";

import dynamic from 'next/dynamic';
import { Cell, Legend } from 'recharts';

const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false });
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });

export default function FloriculturePage() {
  const landData = [
    { name: 'Cultivated Area', value: 6.5 },
    { name: 'Non-Cultivated Area', value: 1.0 },
  ];

  const hrData = [
    { name: 'Asst. Horticulturist', value: 1 },
    { name: 'Asst. Research Officer', value: 1 },
    { name: 'Senior Clerk', value: 1 },
    { name: 'Budder', value: 2 },
    { name: 'Jeep Driver', value: 1 },
    { name: 'Tractor Driver', value: 1 },
    { name: 'Mali', value: 2 },
    { name: 'Beldars', value: 7 },
    { name: 'Chowkidar', value: 2 },
    { name: 'Naib Qasid', value: 1 },
    { name: 'Sweeper', value: 1 },
  ];

  // Pretty colors: Green, Red, Blue, Purple, Amber, Orange, Teal, Yellow
  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#f97316', '#14b8a6', '#eab308'];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-6xl">
        <header className="flori-header">
          <div className="header-info">
            <h1>Office of the Deputy Director Floriculture</h1>
            <p>Horticultural Research Sub-Station, for Floriculture and Landscaping, Old Shujabad Road, Multan</p>
            <p>Email: ahfloriculturemultan@gmail.com | Tel: +92-061-9330979</p>
          </div>
        </header>

        <div className="card focal-person">
          <h3><i className="fas fa-user-tie"></i> Focal Person Information</h3>
          <p><strong>Name:</strong> Dr. Muhammad Muzamil Ijaz</p>
          <p><strong>Designation:</strong> Assistant Research Officer</p>
          <div className="contact-info">
            <div className="contact-item"><i className="fas fa-phone"></i><span>03016984364</span></div>
            <div className="contact-item"><i className="fas fa-envelope"></i><span>muzamil.ijaz243@gmail.com</span></div>
          </div>
        </div>

        <div className="dashboard">
          <div className="card">
            <h3><i className="fas fa-tachometer-alt"></i> Land Resources</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={landData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {landData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="stats">
              <div className="stat-item"><div className="stat-value">7.50</div><div className="stat-label">Total Area (acres)</div></div>
              <div className="stat-item"><div className="stat-value">6.5</div><div className="stat-label">Cultivated Area (acres)</div></div>
              <div className="stat-item"><div className="stat-value">1.0</div><div className="stat-label">Non-Cultivated Area (acres)</div></div>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-building"></i> Building Details</h3>
            <div className="stats">
              <div className="stat-item"><div className="stat-value">3.5</div><div className="stat-label">Administrative Office (marlah)</div></div>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-tractor"></i> Farm Machinery</h3>
            <table className="data-table">
              <thead><tr><th>Equipment</th><th>Quantity</th></tr></thead>
              <tbody>
                <tr><td>Power Sprayer</td><td>1 unit</td></tr>
                <tr><td>Brush Cutter</td><td>1 unit</td></tr>
                <tr><td>Mini Rotavator</td><td>1 unit</td></tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <h3><i className="fas fa-flask"></i> Lab Equipment</h3>
            <table className="data-table">
              <thead><tr><th>Equipment</th><th>Quantity</th></tr></thead>
              <tbody>
                <tr><td>Digital Balance</td><td>1 unit</td></tr>
                <tr><td>Hydro Distillation Unit</td><td>1 unit</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3><i className="fas fa-users"></i> Human Resources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hrData.map((entry, index) => ({ ...entry, color: COLORS[index % COLORS.length] }))}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" shape={(props: any) => {
                const { x, y, width, height, payload } = props;
                return <rect x={x} y={y} width={width} height={height} fill={payload.color || COLORS[0]} />;
              }} />
            </BarChart>
          </ResponsiveContainer>
          <table className="data-table">
            <thead><tr><th>Sr. #</th><th>Name of Post</th><th>BPS</th><th>Sanctioned Strength</th><th>In Position</th><th>Vacant</th><th>Total</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Assistant Horticulturist</td><td>18</td><td>1</td><td>1</td><td>-</td><td>1</td></tr>
              <tr><td>2</td><td>Assistant Research Officer</td><td>17</td><td>1</td><td>1</td><td>-</td><td>1</td></tr>
              <tr><td>3</td><td>Senior Clerk</td><td>14</td><td>1</td><td>1</td><td>-</td><td>1</td></tr>
              <tr><td>4</td><td>Budder</td><td>8</td><td>2</td><td>2</td><td>-</td><td>2</td></tr>
              <tr><td>5</td><td>Jeep Driver</td><td>6</td><td>1</td><td>1</td><td>-</td><td>1</td></tr>
              <tr><td>6</td><td>Tractor Driver</td><td>8</td><td>1</td><td>1</td><td>-</td><td>1</td></tr>
              <tr><td>7</td><td>Mali</td><td>5</td><td>2</td><td>2</td><td>-</td><td>2</td></tr>
              <tr><td>8</td><td>Beldars</td><td>1,4,5</td><td>7</td><td>7</td><td>-</td><td>7</td></tr>
              <tr><td>9</td><td>Chowkidar</td><td>2,1</td><td>2</td><td>2</td><td>-</td><td>2</td></tr>
              <tr><td>10</td><td>Naib Qasid</td><td>5</td><td>1</td><td>1</td><td>-</td><td>1</td></tr>
              <tr><td>11</td><td>Sweeper</td><td>2</td><td>1</td><td>1</td><td>-</td><td>1</td></tr>
              <tr style={{ fontWeight: 'bold', backgroundColor: '#f1f8e9' }}><td colSpan={3}>TOTAL</td><td>20</td><td>20</td><td>-</td><td>20</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .flori-header{background:linear-gradient(135deg,#eab308,#facc15,#fbbf24);color:white;padding:20px;border-radius:8px;margin-bottom:25px;box-shadow:0 4px 12px rgba(234,179,8,0.3);}
        .flori-header h1{font-size:24px;margin-bottom:5px;}
        .dashboard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px;}
        .card{background:white;border-radius:8px;padding:20px;box-shadow:0 4px 8px rgba(0,0,0,0.05);transition:transform 0.3s ease,box-shadow 0.3s ease;border-top:4px solid #eab308;}
        .card:hover{transform:translateY(-5px);box-shadow:0 6px 12px rgba(234,179,8,0.2);}
        .card h3{font-size:18px;margin-bottom:15px;color:#eab308;display:flex;align-items:center;font-weight:600;}
        .card h3 i{margin-right:10px;}
        .stats{display:flex;justify-content:space-between;margin-top:15px;}
        .stat-item{text-align:center;flex:1;}
        .stat-value{font-size:24px;font-weight:700;background:linear-gradient(135deg,#eab308,#facc15);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0;}
        .stat-label{font-size:14px;color:#666;}
        .data-table{width:100%;border-collapse:collapse;margin-top:15px;}
        .data-table th{background:linear-gradient(135deg,#eab308,#facc15);color:white;text-align:left;padding:12px 15px;font-weight:500;}
        .data-table td{padding:12px 15px;border-bottom:1px solid #e0e0e0;}
        .data-table tr:hover{background:linear-gradient(90deg,#fef9c3,transparent);}
        .data-table tr:nth-child(even){background-color:#fefce8;}
        .focal-person{background:linear-gradient(135deg,#fef9c3,#fef3c7);border-left:4px solid #eab308;}
        .contact-info{display:flex;flex-wrap:wrap;gap:15px;margin-top:10px;}
        .contact-item{display:flex;align-items:center;margin-right:20px;}
        .contact-item i{margin-right:8px;color:#eab308;}
        @media (max-width:768px){.dashboard{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

