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

export default function PestPage() {
  const equipmentData = [
    { name: 'HPLC', value: 3 },
    { name: 'GC', value: 2 },
    { name: 'Analytical Balance', value: 1 },
    { name: 'Spectrophotometer', value: 2 },
    { name: 'EC Meter', value: 1 },
    { name: 'Thermo Hygrometer', value: 4 },
    { name: 'pH meter', value: 1 },
  ];

  const hrData = [
    { name: 'Filled Positions', value: 11 },
    { name: 'Vacant Positions', value: 12 },
  ];

  const COLORS = ['#3498db', '#e74c3c', '#1a5276', '#2980b9', '#5dade2', '#85c1e9', '#aed6f1'];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-6xl">
        <header className="pest-header">
          <h1>Pesticide Quality Control Laboratory, Multan</h1>
          <p>Digital Asset Management System</p>
        </header>

        <div className="dashboard">
          <div className="card">
            <h3><i className="fas fa-landmark"></i> Land Resources</h3>
            <div className="stats">
              <div className="stat-item"><div className="stat-value">Nil</div><div className="stat-label">Land Area</div></div>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-building"></i> Building Details</h3>
            <div className="building-list">
              {['Chief Scientist Office', 'Establishment Office', 'ISO Cell', 'General Lab', 'HPLC Lab-1', 'HPLC Lab-2', 'GC Lab', 'Sample Processing', 'Chemical Lab', 'Balance Room', 'Sample Store Room', 'Sample Receiving Room'].map((item, idx) => (
                <div key={idx} className="building-item">{item}</div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-vial"></i> Laboratory Equipment</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={equipmentData}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {equipmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3><i className="fas fa-tools"></i> Laboratory Equipment Details</h3>
          <table className="data-table">
            <thead><tr><th>Name of Instrument</th><th>Quantity</th></tr></thead>
            <tbody>
              <tr><td>HPLC</td><td>3</td></tr>
              <tr><td>GC</td><td>2</td></tr>
              <tr><td>Analytical Balance</td><td>1</td></tr>
              <tr><td>Spectrophotometer</td><td>2</td></tr>
              <tr><td>EC Meter</td><td>1</td></tr>
              <tr><td>Thermo Hygrometer</td><td>4</td></tr>
              <tr><td>pH meter</td><td>1</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3><i className="fas fa-users"></i> Human Resources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={hrData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                {hrData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <table className="data-table">
            <thead><tr><th>Post Description</th><th>BPS</th><th>Sanctioned</th><th>Filled</th><th>Vacant</th></tr></thead>
            <tbody>
              <tr><td>Chief Scientist</td><td>20</td><td>01</td><td>01</td><td>-</td></tr>
              <tr><td>Principal Scientist</td><td>19</td><td>01</td><td>-</td><td>01</td></tr>
              <tr><td>Senior Scientist</td><td>18</td><td>02</td><td>02</td><td>-</td></tr>
              <tr><td>Scientific Officer</td><td>17</td><td>02</td><td>-</td><td>02</td></tr>
              <tr><td>Stenographer</td><td>16</td><td>01</td><td>-</td><td>01</td></tr>
              <tr><td>Research Assistant</td><td>15</td><td>02</td><td>-</td><td>02</td></tr>
              <tr><td>Senior Clerk</td><td>14</td><td>01</td><td>01</td><td>-</td></tr>
              <tr><td>Junior Clerk</td><td>11</td><td>01</td><td>01</td><td>-</td></tr>
              <tr><td>Instrument Technician</td><td>11</td><td>01</td><td>-</td><td>01</td></tr>
              <tr><td>Lab. Technician</td><td>11</td><td>01</td><td>-</td><td>01</td></tr>
              <tr><td>Lab. Assistant</td><td>06</td><td>04</td><td>-</td><td>04</td></tr>
              <tr><td>Driver</td><td>04</td><td>01</td><td>01</td><td>-</td></tr>
              <tr><td>Lab. Attendant</td><td>01</td><td>01</td><td>01</td><td>-</td></tr>
              <tr><td>Naib Qasid</td><td>01</td><td>01</td><td>01</td><td>-</td></tr>
              <tr><td>Chowkidar</td><td>01</td><td>02</td><td>02</td><td>-</td></tr>
              <tr><td>Sweeper</td><td>01</td><td>01</td><td>01</td><td>-</td></tr>
              <tr style={{ fontWeight: 'bold', backgroundColor: '#e8f4fc' }}><td colSpan={2}>GRAND TOTAL</td><td>23</td><td>11</td><td>12</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card focal-person">
          <h3><i className="fas fa-user-tie"></i> Focal Person Information</h3>
          <p><strong>Name:</strong> Dr. Subhan Danish</p>
          <p><strong>Designation:</strong> Senior Scientist</p>
          <div className="contact-info">
            <div className="contact-item"><i className="fas fa-phone"></i><span>0304 7996951</span></div>
            <div className="contact-item"><i className="fas fa-envelope"></i><span>sd96850@gmail.com</span></div>
          </div>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .pest-header{background:linear-gradient(135deg,#1a5276,#3498db);color:white;padding:20px;border-radius:8px;margin-bottom:25px;box-shadow:0 4px 12px rgba(0,0,0,0.1);text-align:center;}
        .pest-header h1{font-size:28px;margin-bottom:10px;}
        .dashboard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px;}
        .card{background:white;border-radius:8px;padding:20px;box-shadow:0 4px 8px rgba(0,0,0,0.05);transition:transform 0.3s ease,box-shadow 0.3s ease;}
        .card:hover{transform:translateY(-5px);box-shadow:0 6px 12px rgba(0,0,0,0.1);}
        .card h3{font-size:18px;margin-bottom:15px;color:#1a5276;display:flex;align-items:center;}
        .card h3 i{margin-right:10px;}
        .stats{display:flex;justify-content:space-between;margin-top:15px;}
        .stat-item{text-align:center;flex:1;}
        .stat-value{font-size:24px;font-weight:700;color:#1a5276;margin:10px 0;}
        .stat-label{font-size:14px;color:#666;}
        .building-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-top:15px;}
        .building-item{background-color:#f0f8ff;padding:10px;border-radius:4px;font-size:14px;}
        .data-table{width:100%;border-collapse:collapse;margin-top:15px;}
        .data-table th{background-color:#e8f4fc;color:#1a5276;text-align:left;padding:12px 15px;font-weight:500;}
        .data-table td{padding:12px 15px;border-bottom:1px solid #e0e0e0;}
        .data-table tr:hover{background-color:#f9f9f9;}
        .focal-person{background:linear-gradient(135deg,#e8f4fc,#d1ebff);border-left:4px solid #1a5276;}
        .contact-info{display:flex;flex-wrap:wrap;gap:15px;margin-top:10px;}
        .contact-item{display:flex;align-items:center;margin-right:20px;}
        .contact-item i{margin-right:8px;color:#1a5276;}
        @media (max-width:768px){.dashboard{grid-template-columns:1fr;}.building-list{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

