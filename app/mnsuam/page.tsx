"use client";

import { useState } from 'react';
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

export default function MNSUAMPage() {
  const [activeTab, setActiveTab] = useState('labs');

  const labsData = [
    { name: 'Seed & Plant Testing', value: 3 },
    { name: 'Sample Storage', value: 3 },
    { name: 'NGS Lab', value: 6 },
    { name: 'GC-MS Lab', value: 4 },
    { name: 'Food Processing', value: 12 },
    { name: 'Insect Taxonomy', value: 18 },
    { name: 'Tissue Culture', value: 8 },
    { name: 'DNA Analysis', value: 15 },
    { name: 'Gene Cloning', value: 25 },
    { name: 'Analytical Lab', value: 6 },
    { name: 'Diagnostic Lab', value: 11 },
    { name: 'Microbiology Lab', value: 12 },
  ];

  const equipmentStatusData = [
    { name: 'Functional', value: 85 },
    { name: 'Non-Functional', value: 15 },
  ];

  const commonEquipmentData = [
    { name: 'Microscope', value: 15 },
    { name: 'Balance', value: 12 },
    { name: 'pH Meter', value: 8 },
    { name: 'Incubator', value: 7 },
    { name: 'Oven', value: 6 },
    { name: 'Centrifuge', value: 5 },
  ];

  const agronomyData = [
    { name: 'Balances', value: 6 },
    { name: 'Measurement', value: 5 },
    { name: 'Analysis', value: 6 },
    { name: 'Incubation', value: 3 },
    { name: 'Other', value: 2 },
  ];

  const facilitiesData = [
    { name: 'Small (<30)', value: 4 },
    { name: 'Medium (30-50)', value: 4 },
    { name: 'Large (50-100)', value: 2 },
    { name: 'Very Large (>100)', value: 2 },
  ];

  // Colors: Green, Red, Blue, Brown, Yellow
  const COLORS = ['#22c55e', '#ef4444', '#3b82f6', '#a16207', '#eab308'];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-7xl">
        <header className="mnsuam-header">
          <h1>MNSUAM Laboratory & Facilities</h1>
          <p className="subtitle">Comprehensive Overview of Laboratories, Equipment, and Facilities</p>
        </header>

        <div className="tabs">
          <button className={`tab ${activeTab === 'labs' ? 'active' : ''}`} onClick={() => setActiveTab('labs')}>Laboratory Equipment</button>
          <button className={`tab ${activeTab === 'agronomy' ? 'active' : ''}`} onClick={() => setActiveTab('agronomy')}>Agronomy Equipment</button>
          <button className={`tab ${activeTab === 'facilities' ? 'active' : ''}`} onClick={() => setActiveTab('facilities')}>University Facilities</button>
        </div>

        {activeTab === 'labs' && (
          <div>
            <h2>Laboratory Equipment Overview</h2>
            <div className="dashboard">
              <div className="card">
                <h3><i className="fas fa-flask"></i> Labs Summary</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={labsData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                      {labsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="stats">
                  <div className="stat-item"><div className="stat-value">12</div><div className="stat-label">Total Labs</div></div>
                  <div className="stat-item"><div className="stat-value">100+</div><div className="stat-label">Equipment Types</div></div>
                </div>
              </div>
              <div className="card">
                <h3><i className="fas fa-tools"></i> Equipment Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={equipmentStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                      {equipmentStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="card">
                <h3><i className="fas fa-microscope"></i> Most Common Equipment</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={commonEquipmentData.map((entry, index) => ({ ...entry, color: COLORS[index % COLORS.length] }))}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" shape={(props: any) => {
                      const { x, y, width, height, payload } = props;
                      return <rect x={x} y={y} width={width} height={height} fill={payload.color || COLORS[0]} />;
                    }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card">
              <h3><i className="fas fa-list"></i> Laboratory Equipment Details</h3>
              <div className="lab-table-container">
                <table className="data-table">
                  <thead><tr><th>Sr. No.</th><th>Laboratory Name</th><th>Laboratory In charge</th><th>Equipments</th><th>Quantity</th><th>Non-Functional</th></tr></thead>
                  <tbody>
                    <tr><td>1</td><td>Seed and Plant Testing Lab</td><td>Dr. Muhammad Amir Bakhtavar</td><td>Seed Germinators</td><td>4</td><td className="non-functional">1. Seed Germinators</td></tr>
                    <tr><td></td><td></td><td></td><td>Hybridization oven</td><td>2</td><td></td></tr>
                    <tr><td></td><td></td><td></td><td>Shaking Incubator</td><td>2</td><td></td></tr>
                    <tr><td>2</td><td>Sample Storage Lab</td><td>Mr. Muhammad Waseem</td><td>-80 °C Freezer</td><td>3</td><td className="non-functional">1. -80 °C Freezer</td></tr>
                    <tr><td></td><td></td><td></td><td>-40 °C Freezer</td><td>2</td><td className="non-functional">2. -40 °C Freezer</td></tr>
                    <tr><td></td><td></td><td></td><td>-20 °C Freezer</td><td>1</td><td className="non-functional">3. -20 °C Freezer</td></tr>
                    <tr><td>3</td><td>NGS Lab</td><td>Dr. Zulqurnain Khan</td><td>NGS system</td><td>1</td><td className="non-functional">1. -80 °C Freezer</td></tr>
                    <tr><td></td><td></td><td></td><td>qPCR</td><td>1</td><td></td></tr>
                    <tr><td></td><td></td><td></td><td>Electroporator</td><td>1</td><td></td></tr>
                    <tr><td></td><td></td><td></td><td>Analytical Balance</td><td>1</td><td></td></tr>
                    <tr><td></td><td></td><td></td><td>Vortex machine</td><td>1</td><td></td></tr>
                    <tr><td>4</td><td>GC-MS Lab</td><td>Dr. Asif Farooq</td><td>GC-MS</td><td>1</td><td></td></tr>
                    <tr><td></td><td></td><td></td><td>FTIR</td><td>1</td><td></td></tr>
                    <tr><td></td><td></td><td></td><td>Magnetic hot plate</td><td>1</td><td></td></tr>
                    <tr><td></td><td></td><td></td><td>Vacuum filtration apparatus</td><td>1</td><td></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agronomy' && (
          <div>
            <h2>Agronomy Laboratory Equipment</h2>
            <div className="dashboard">
              <div className="card">
                <h3><i className="fas fa-tractor"></i> Equipment Summary</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={agronomyData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                      {agronomyData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="stats">
                  <div className="stat-item"><div className="stat-value">22</div><div className="stat-label">Equipment Types</div></div>
                  <div className="stat-item"><div className="stat-value">30+</div><div className="stat-label">Total Units</div></div>
                </div>
              </div>
              <div className="card">
                <h3><i className="fas fa-user-tie"></i> Focal Persons</h3>
                <div className="focal-person">
                  <p><strong>Dr. Mahmood Alam</strong></p>
                  <p>Directorate of University Farms</p>
                  <p>Email: <a href="mailto:mahmood.alam@mnsuam.edu.pk">mahmood.alam@mnsuam.edu.pk</a></p>
                </div>
                <div className="focal-person">
                  <p><strong>Dr. Nabeel Ahmad Ikram</strong></p>
                  <p>Agronomy Department</p>
                  <p>Email: <a href="mailto:nabeel.ahmad@mnsuam.edu.pk">nabeel.ahmad@mnsuam.edu.pk</a></p>
                </div>
              </div>
            </div>
            <div className="card">
              <h3><i className="fas fa-list"></i> Agronomy Equipment List</h3>
              <table className="data-table">
                <thead><tr><th>Sr. No.</th><th>Name of Equipment</th><th>Quantity</th></tr></thead>
                <tbody>
                  {['ANALYTICAL BALANCE', 'DIGITAL BALANCE', 'TOP LOADING BALANCE', 'LEAF AREA METER', 'FLAME PHOTOMETER', 'SPAD', 'PH METER', 'EC METER', 'AUTOCLAVE', 'COOLING INCUBATOR', 'OVEN', 'TRINOCULAR MICROSCOPE', 'HOT PLATE & MAGNETIC STIRRER', 'MOISTURE METER', 'WATER DISTILATION UNIT', 'WATER BATH', 'MINI CENTRIFUGE MACHINE', 'SPECTROPHOTOMETER', 'SEED GRINDER', 'KJELDAHL APPARATUS', 'DIGITAL VERNIER CALIPER', 'AQUARIUM PUMP'].map((item, idx) => (
                    <tr key={idx}><td>{idx + 1}</td><td>{item}</td><td>{[1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2][idx]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div>
            <h2>University Facilities for South Punjab Regional Agriculture Forum</h2>
            <div className="dashboard">
              <div className="card">
                <h3><i className="fas fa-building"></i> Facilities Summary</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={facilitiesData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                      {facilitiesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="stats">
                  <div className="stat-item"><div className="stat-value">12</div><div className="stat-label">Total Facilities</div></div>
                  <div className="stat-item"><div className="stat-value">600+</div><div className="stat-label">Total Capacity</div></div>
                </div>
              </div>
            </div>
            <div className="card">
              <h3><i className="fas fa-list"></i> Facility Details</h3>
              <div className="facilities-grid">
                {[
                  { name: 'Syndicate Hall', location: 'Admin Block', capacity: '50 persons' },
                  { name: 'Committee Room', location: 'Admin Block', capacity: '20 persons' },
                  { name: 'Lecture Hall 110', location: 'Academic Block', capacity: '150 persons' },
                  { name: 'Lecture Hall 132', location: 'Academic Block', capacity: '96 persons' },
                  { name: 'Computer Lab', location: 'Academic Block (5 Labs)', capacity: 'Multiple capacities' },
                  { name: 'Training Hall', location: 'S.T.I. Library', capacity: '40-80 persons' },
                  { name: 'Meeting Room', location: 'Genome Centre / UNESCO Chair', capacity: '15 persons' },
                  { name: 'Sybrid Hall', location: 'Graduate Block / A Block', capacity: '30 persons' },
                  { name: 'Executive Hall-I', location: 'Graduate Block / A Block', capacity: '35 persons' },
                  { name: 'Lecture Hall', location: 'Graduate Block / A Block', capacity: '35 persons' },
                  { name: 'ORIC Meeting Hall', location: 'Graduate Block / A Block', capacity: '30 persons' },
                  { name: 'QEC Meeting Hall', location: 'Graduate Block / A Block', capacity: '12 persons' },
                ].map((facility, idx) => (
                  <div key={idx} className="facility-item">
                    <h4>{facility.name}</h4>
                    <p>{facility.location}</p>
                    <div className="capacity">Capacity: {facility.capacity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .mnsuam-header{background:linear-gradient(135deg,#2c3e50,#3498db);color:white;padding:25px;border-radius:8px;margin-bottom:25px;box-shadow:0 4px 12px rgba(0,0,0,0.1);text-align:center;}
        .mnsuam-header h1{font-size:28px;margin-bottom:10px;}
        .subtitle{font-size:18px;opacity:0.9;}
        h2{font-size:22px;margin-bottom:15px;color:#2c3e50;border-bottom:2px solid #e0e0e0;padding-bottom:8px;}
        .tabs{display:flex;background:white;border-radius:8px;margin-bottom:20px;box-shadow:0 4px 8px rgba(0,0,0,0.05);overflow:hidden;}
        .tab{flex:1;padding:15px 20px;text-align:center;cursor:pointer;transition:all 0.3s ease;border-bottom:3px solid transparent;font-weight:500;background:none;border:none;color:#2c3e50;}
        .tab.active{background:#3498db;color:white;border-bottom:3px solid #2c3e50;}
        .tab:hover:not(.active){background:#f8f9fa;}
        .dashboard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px;}
        .card{background:white;border-radius:8px;padding:20px;box-shadow:0 4px 8px rgba(0,0,0,0.05);transition:transform 0.3s ease,box-shadow 0.3s ease;}
        .card:hover{transform:translateY(-5px);box-shadow:0 6px 12px rgba(0,0,0,0.1);}
        .card h3{font-size:18px;margin-bottom:15px;color:#3498db;display:flex;align-items:center;}
        .card h3 i{margin-right:10px;}
        .stats{display:flex;justify-content:space-between;margin-top:15px;}
        .stat-item{text-align:center;flex:1;}
        .stat-value{font-size:24px;font-weight:700;color:#3498db;}
        .stat-label{font-size:14px;color:#666;}
        .data-table{width:100%;border-collapse:collapse;margin-top:15px;font-size:14px;}
        .data-table th{background-color:#e8f4fc;color:#2c3e50;font-weight:500;padding:10px 12px;text-align:left;border-bottom:1px solid #e0e0e0;position:sticky;top:0;}
        .data-table td{padding:10px 12px;text-align:left;border-bottom:1px solid #e0e0e0;}
        .data-table tr:hover{background-color:#f9f9f9;}
        .lab-table-container{max-height:500px;overflow-y:auto;margin-top:15px;border:1px solid #e0e0e0;border-radius:8px;}
        .non-functional{color:#e74c3c;font-weight:500;}
        .focal-person{background:linear-gradient(135deg,#e8f4fc,#d1ebff);border-left:4px solid #3498db;padding:15px;border-radius:6px;margin:15px 0;}
        .facilities-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:15px;margin-top:15px;}
        .facility-item{background:#f8f9fa;padding:15px;border-radius:6px;border-left:4px solid #3498db;}
        .facility-item h4{color:#2c3e50;margin-bottom:8px;font-size:16px;}
        .capacity{display:inline-block;background:#3498db;color:white;padding:4px 8px;border-radius:4px;font-size:14px;font-weight:500;margin-top:5px;}
        @media (max-width:768px){.dashboard{grid-template-columns:1fr;}.tabs{flex-direction:column;}.facilities-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

