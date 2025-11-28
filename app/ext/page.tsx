"use client";

import { useState } from 'react';
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

export default function ExtPage() {
  const [filter, setFilter] = useState('all');

  const buildingStatusData = [
    { name: 'Utilized', value: 2 },
    { name: 'Un-used', value: 1 },
    { name: 'Other', value: 1 },
  ];

  const staffData = [
    { name: 'Senior Staff', sanctioned: 25, filled: 24 },
    { name: 'Junior Staff', sanctioned: 127, filled: 89 },
  ];

  const vacancyData = [
    { name: 'Filled Positions', value: 113 },
    { name: 'Vacant Positions', value: 39 },
  ];

  const vacancyRows = [
    { sNo: 1, post: 'CAO/DGA(Ext)', bs: 20, sanctioned: 0, filled: 0, vacant: 0 },
    { sNo: 7, post: 'PAO/DDA(Ext)', bs: 19, sanctioned: 1, filled: 1, vacant: 0 },
    { sNo: 12, post: 'PAO/ADA (Ext)', bs: 19, sanctioned: 3, filled: 3, vacant: 0 },
    { sNo: 15, post: 'SAO/SAOs', bs: 18, sanctioned: 9, filled: 9, vacant: 0 },
    { sNo: 27, post: 'Superintendent', bs: 17, sanctioned: 1, filled: 0, vacant: 1 },
    { sNo: 31, post: 'Field Inspector (Ext)', bs: 16, sanctioned: 1, filled: 0, vacant: 1 },
    { sNo: 32, post: 'Stenographer', bs: 14, sanctioned: 1, filled: 0, vacant: 1 },
    { sNo: 33, post: 'Senior Clerk', bs: 14, sanctioned: 5, filled: 4, vacant: 1 },
    { sNo: 35, post: 'Field Investigator (Ext)', bs: 14, sanctioned: 12, filled: 11, vacant: 1 },
    { sNo: 37, post: 'Senior Field Assistant (Ext)', bs: 12, sanctioned: 26, filled: 14, vacant: 12 },
    { sNo: 38, post: 'Field Assistant (Ext)', bs: 11, sanctioned: 40, filled: 34, vacant: 6 },
    { sNo: 39, post: 'Junior Clerk', bs: 11, sanctioned: 12, filled: 9, vacant: 3 },
    { sNo: 58, post: 'Budder', bs: 5, sanctioned: 3, filled: 0, vacant: 3 },
    { sNo: 61, post: 'Vehicle Driver', bs: 5, sanctioned: 6, filled: 2, vacant: 4 },
    { sNo: 66, post: 'Daftri', bs: 2, sanctioned: 1, filled: 0, vacant: 1 },
    { sNo: 69, post: 'Naib Qasid', bs: 1, sanctioned: 6, filled: 3, vacant: 3 },
    { sNo: 70, post: 'Chowkidar', bs: 1, sanctioned: 4, filled: 3, vacant: 1 },
    { sNo: 74, post: 'Cleaner', bs: 1, sanctioned: 1, filled: 0, vacant: 1 },
    { sNo: 75, post: 'Beldar', bs: 1, sanctioned: 108, filled: 79, vacant: 29 },
    { sNo: 76, post: 'Field Man', bs: 1, sanctioned: 1, filled: 0, vacant: 1 },
    { sNo: 77, post: 'Water Man', bs: 1, sanctioned: 2, filled: 0, vacant: 2 },
    { sNo: 81, post: 'Sweeper', bs: 1, sanctioned: 4, filled: 3, vacant: 1 },
  ];

  const filteredRows = vacancyRows.filter(row => {
    if (filter === 'vacant') return row.vacant > 0;
    if (filter === 'filled') return row.filled > 0;
    return true;
  });

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-7xl">
        <header className="ext-header">
          <h1>Agriculture Extension Wing</h1>
          <p className="subtitle">Building Details & Vacancy Position</p>
        </header>

        <div className="summary-cards">
          <div className="summary-card"><div className="value">4</div><div className="label">Total Buildings</div></div>
          <div className="summary-card"><div className="value">390,741</div><div className="label">Total Area (Sq. Feet)</div></div>
          <div className="summary-card"><div className="value">152</div><div className="label">Sanctioned Posts</div></div>
          <div className="summary-card"><div className="value">113</div><div className="label">Filled Posts</div></div>
          <div className="summary-card"><div className="value">39</div><div className="label">Vacant Posts</div></div>
        </div>

        <div className="dashboard">
          <div className="card">
            <h3><i className="fas fa-building"></i> Building Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={buildingStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {buildingStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#27ae60', '#e74c3c', '#f39c12'][index]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3><i className="fas fa-users"></i> Staff Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={staffData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sanctioned" fill="#3498db" name="Sanctioned" />
                <Bar dataKey="filled" fill="#27ae60" name="Filled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3><i className="fas fa-chart-pie"></i> Vacancy Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={vacancyData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {vacancyData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#27ae60', '#e74c3c'][index]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3><i className="fas fa-map-marked-alt"></i> Building Details</h3>
          <div className="building-table-container">
            <table className="data-table">
              <thead><tr><th>Sr.No</th><th>Name of Institute/Station</th><th>Location</th><th>Area (Sq. Feet)</th><th>Present Status</th><th>Remarks</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Office of the Deputy Director Agriculture (Ext.) Multan<br/>(Office Area + Residence Colony+ Rest House)</td><td>Old Shujabad Road Agriculture Complex Multan</td><td>288,585</td><td><span className="status-utilized">Utilized</span></td><td>Agriculture Department (Ext) Wing</td></tr>
                <tr><td>2</td><td>SAO/EADA</td><td>Dera Adda Behind Telephone Exchange Multan</td><td>13,056</td><td><span className="status-unused">Un-used</span></td><td>Dismantled from Building Department</td></tr>
                <tr><td>3</td><td>Office of the Assistant Director Agriculture (Ext.) Shujabad</td><td>Old Multan Road Near Boys High School Shujabad</td><td>89,100</td><td><span className="status-utilized">Utilized</span></td><td>Agriculture Department</td></tr>
                <tr><td>4</td><td>Office of the Assistant Director Agriculture (Ext.) Jalalpur Pirwala</td><td>Shujabad Road, Near Virtual University, Jalalpur Pirwala</td><td>-</td><td>-</td><td>Temporarily Adjusted in Health Department Building</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3><i className="fas fa-user-friends"></i> Vacancy Position</h3>
          <div className="filters">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Posts</button>
            <button className={`filter-btn ${filter === 'vacant' ? 'active' : ''}`} onClick={() => setFilter('vacant')}>Vacant Only</button>
            <button className={`filter-btn ${filter === 'filled' ? 'active' : ''}`} onClick={() => setFilter('filled')}>Filled Only</button>
          </div>
          <div className="vacancy-table-container">
            <table className="data-table">
              <thead><tr><th>S.No.</th><th>Name of Post</th><th>B.S</th><th>Sanctioned</th><th>Filled</th><th>Vacant</th></tr></thead>
              <tbody>
                {filteredRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.sNo}</td><td>{row.post}</td><td>{row.bs}</td><td>{row.sanctioned}</td><td>{row.filled}</td><td>{row.vacant}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ fontWeight: 'bold', backgroundColor: '#e8f5e9' }}>
                  <td colSpan={3}>GRAND TOTAL</td><td>152</td><td>113</td><td>39</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .ext-header{background:linear-gradient(135deg,#27ae60,#2ecc71);color:white;padding:25px;border-radius:8px;margin-bottom:25px;box-shadow:0 4px 12px rgba(0,0,0,0.1);text-align:center;}
        .ext-header h1{font-size:28px;margin-bottom:10px;}
        .subtitle{font-size:18px;opacity:0.9;}
        h2{font-size:22px;margin-bottom:15px;color:#27ae60;border-bottom:2px solid #e0e0e0;padding-bottom:8px;}
        .summary-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin-bottom:20px;}
        .summary-card{background:white;border-radius:8px;padding:15px;text-align:center;box-shadow:0 4px 8px rgba(0,0,0,0.05);}
        .summary-card .value{font-size:24px;font-weight:700;color:#27ae60;margin-bottom:5px;}
        .summary-card .label{font-size:14px;color:#666;}
        .dashboard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px;}
        .card{background:white;border-radius:8px;padding:20px;box-shadow:0 4px 8px rgba(0,0,0,0.05);transition:transform 0.3s ease,box-shadow 0.3s ease;}
        .card:hover{transform:translateY(-5px);box-shadow:0 6px 12px rgba(0,0,0,0.1);}
        .card h3{font-size:18px;margin-bottom:15px;color:#27ae60;display:flex;align-items:center;}
        .card h3 i{margin-right:10px;}
        .data-table{width:100%;border-collapse:collapse;margin-top:15px;font-size:14px;}
        .data-table th{background-color:#e8f5e9;color:#27ae60;font-weight:500;padding:10px 12px;text-align:left;border-bottom:1px solid #e0e0e0;position:sticky;top:0;}
        .data-table td{padding:10px 12px;text-align:left;border-bottom:1px solid #e0e0e0;}
        .data-table tr:hover{background-color:#f9f9f9;}
        .status-utilized{background-color:#e8f5e9;color:#27ae60;padding:4px 8px;border-radius:4px;font-weight:500;}
        .status-unused{background-color:#ffebee;color:#e53935;padding:4px 8px;border-radius:4px;font-weight:500;}
        .building-table-container,.vacancy-table-container{max-height:500px;overflow-y:auto;margin-top:15px;border:1px solid #e0e0e0;border-radius:8px;}
        .filters{display:flex;gap:15px;margin-bottom:20px;flex-wrap:wrap;}
        .filter-btn{background:#e8f5e9;border:1px solid #27ae60;color:#27ae60;padding:8px 16px;border-radius:4px;cursor:pointer;transition:all 0.3s ease;}
        .filter-btn.active{background:#27ae60;color:white;}
        @media (max-width:768px){.dashboard{grid-template-columns:1fr;}.summary-cards{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

