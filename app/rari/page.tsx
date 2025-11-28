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

export default function RARIPage() {
  const staffData = [
    { name: 'Scientific Officers', value: 24 },
    { name: 'Researchers', value: 15 },
    { name: 'Technical Staff', value: 20 },
    { name: 'Administrative', value: 10 },
    { name: 'Support Workers', value: 15 },
  ];

  const researchData = [
    { name: 'Crop Varieties', value: 90 },
    { name: 'Production Tech', value: 85 },
    { name: 'Water Management', value: 80 },
    { name: 'Soil Conservation', value: 75 },
    { name: 'Plant Protection', value: 85 },
  ];

  // Pretty colors: Green, Red, Blue, Purple, Amber, Orange, Teal, Yellow
  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#f97316', '#14b8a6', '#eab308'];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-6xl">
        <header className="rari-header">
          <h1>Regional Agricultural Research Institute (RARI), Bahawalpur</h1>
          <p className="subtitle">Agricultural Research and Varietal Development for Southern Punjab</p>
        </header>

        <div className="dashboard">
          <div className="card">
            <h3><i className="fas fa-users"></i> Human Resources</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={staffData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {staffData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="stats">
              <div className="stat-item"><div className="stat-value">24+</div><div className="stat-label">Scientific Officers</div></div>
              <div className="stat-item"><div className="stat-value">Multiple</div><div className="stat-label">Senior Posts Vacant</div></div>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-seedling"></i> Research Focus Areas</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={researchData.map((entry, index) => ({ ...entry, color: COLORS[index % COLORS.length] }))}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: any) => `${value}%`} />
                <Bar dataKey="value" shape={(props: any) => {
                  const { x, y, width, height, payload } = props;
                  return <rect x={x} y={y} width={width} height={height} fill={payload.color || COLORS[0]} />;
                }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3><i className="fas fa-chart-line"></i> Key Outputs</h3>
            <ul className="outputs-list">
              <li>Development and release of crop varieties (wheat, cotton, field crops)</li>
              <li>Technology dissemination through seminars and print material</li>
              <li>Digital outreach and field demonstrations</li>
              <li>Contribution to regional crop improvement</li>
              <li>Productivity enhancement initiatives</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h3><i className="fas fa-tasks"></i> Main Functions</h3>
          <div className="functions-grid">
            {[
              { title: 'Education & Training', desc: 'Agricultural education, training, and research including pre-service and in-service training at Agriculture Training Institutes.' },
              { title: 'Research & Development', desc: 'Adaptive research, operation of research farms, and development of improved agricultural techniques.' },
              { title: 'Water Management', desc: 'Enhancement of agricultural and water management techniques through research and training.' },
              { title: 'Plant Protection', desc: 'Safeguarding against insects and pests, prevention of plant diseases, and quality control of pesticides.' },
              { title: 'Soil Management', desc: 'Initiatives focused on soil fertility, soil conservation, and comprehensive soil surveys.' },
              { title: 'Mechanization', desc: 'Advancements in agricultural machinery, land reclamation, and agricultural engineering research.' },
              { title: 'Information Dissemination', desc: 'Dissemination of agricultural information through publications, media campaigns, and farmer gatherings.' },
              { title: 'Policy & Planning', desc: 'Economic planning, policy formulation, and coordination of research efforts across multiple sectors.' },
            ].map((item, idx) => (
              <div key={idx} className="function-item">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3><i className="fas fa-leaf"></i> Plant Protection Activities</h3>
          <div className="functions-grid">
            {[
              { title: 'Pesticide Standardization', desc: 'Standardization of local and imported pesticides to ensure quality and effectiveness.' },
              { title: 'Plant Quarantine', desc: 'Implementation of plant quarantine measures to prevent the spread of diseases and pests.' },
              { title: 'Pest Management', desc: 'Pest scouting, surveys, warnings, and research on plant protection methods.' },
              { title: 'Training & Capacity Building', desc: 'Training programs for pesticide dealers, farmers, and extension workers in plant protection.' },
            ].map((item, idx) => (
              <div key={idx} className="function-item">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="highlight-box">
          <h3><i className="fas fa-bullseye"></i> Institutional Mandate</h3>
          <p>RARI Bahawalpur operates under the Agriculture Department of South Punjab and plays a central role in agricultural research and varietal development suited to the climatic conditions of Southern Punjab. The institute is responsible for developing crop varieties, improving production technologies, and supporting farmers through field-based advisory services.</p>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .rari-header{background:linear-gradient(135deg,#a855f7,#c084fc,#8b5cf6);color:white;padding:25px;border-radius:8px;margin-bottom:25px;box-shadow:0 4px 12px rgba(168,85,247,0.3);}
        .rari-header h1{font-size:28px;margin-bottom:10px;}
        .subtitle{font-size:18px;opacity:0.9;}
        .dashboard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px;}
        .card{background:white;border-radius:8px;padding:20px;box-shadow:0 4px 8px rgba(0,0,0,0.05);transition:transform 0.3s ease,box-shadow 0.3s ease;border-top:4px solid #a855f7;}
        .card:hover{transform:translateY(-5px);box-shadow:0 6px 12px rgba(168,85,247,0.2);}
        .card h3{font-size:18px;margin-bottom:15px;color:#a855f7;display:flex;align-items:center;font-weight:600;}
        .card h3 i{margin-right:10px;}
        .stats{display:flex;justify-content:space-between;margin-top:15px;}
        .stat-item{text-align:center;flex:1;}
        .stat-value{font-size:24px;font-weight:700;background:linear-gradient(135deg,#a855f7,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .stat-label{font-size:14px;color:#666;}
        .outputs-list{list-style-type:none;padding-left:0;}
        .outputs-list li{padding:8px 0;border-bottom:1px solid #eee;display:flex;align-items:flex-start;}
        .outputs-list li:before{content:"•";color:#a855f7;font-weight:bold;margin-right:10px;font-size:20px;}
        .functions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:15px;margin-top:15px;}
        .function-item{background:linear-gradient(135deg,#faf5ff,#f3e8ff);padding:15px;border-radius:6px;border-left:4px solid #a855f7;transition:transform 0.2s ease;}
        .function-item:hover{transform:translateX(5px);}
        .function-item h4{color:#a855f7;margin-bottom:8px;font-size:16px;font-weight:600;}
        .highlight-box{background:linear-gradient(135deg,#faf5ff,#f3e8ff);border-left:4px solid #a855f7;padding:15px;border-radius:6px;margin:15px 0;}
        @media (max-width:768px){.dashboard{grid-template-columns:1fr;}.functions-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

