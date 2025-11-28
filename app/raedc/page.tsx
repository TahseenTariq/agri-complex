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

export default function RAEDCPage() {
  const capacityData = [
    { name: 'Computer Lab', value: 35 },
    { name: 'Auditorium', value: 300 },
    { name: 'Training Halls', value: 100 },
    { name: 'Library', value: 50 },
    { name: 'Demo Farm', value: 25 },
  ];

  const budgetData = [
    { name: 'Development Allocation', value: 64549.145 },
    { name: 'Development Expenditure', value: 36758.311 },
    { name: 'Non-Dev Allocation', value: 28770.73 },
    { name: 'Non-Dev Expenditure', value: 25497.23 },
  ];

  // Pretty colors: Green, Red, Blue, Purple, Amber, Orange, Teal, Yellow
  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#f97316', '#14b8a6', '#eab308'];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-6xl">
        <header className="raedc-header">
          <h1>Regional Agricultural Economic Development Centre (RAEDC), Vehari</h1>
          <p className="subtitle">Specialized Training & Capacity Building Institution</p>
          <p className="established">Established in 1991</p>
        </header>

        <div className="land-info-card">
          <div className="land-icon">
            <i className="fas fa-map-marked-alt"></i>
          </div>
          <div className="land-content">
            <h3>Total Land Area</h3>
            <div className="land-value">48 Acres</div>
            <p>Available for training, demonstrations, and agricultural activities</p>
          </div>
        </div>

        <div className="dashboard">
          <div className="card">
            <h3><i className="fas fa-users"></i> Training Capacity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={capacityData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {capacityData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="stats">
              <div className="stat-item"><div className="stat-value">30-35</div><div className="stat-label">Computer Lab</div></div>
              <div className="stat-item"><div className="stat-value">300</div><div className="stat-label">Auditorium</div></div>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-money-bill-wave"></i> Budget Overview 2024-25</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={budgetData.map((entry, index) => ({ ...entry, color: COLORS[index % COLORS.length] }))}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value: any) => `PKR ${Number(value).toLocaleString()} Million`} />
                <Bar dataKey="value" shape={(props: any) => {
                  const { x, y, width, height, payload } = props;
                  return <rect x={x} y={y} width={width} height={height} fill={payload.color || COLORS[0]} />;
                }} />
              </BarChart>
            </ResponsiveContainer>
            <div className="stats">
              <div className="stat-item"><div className="stat-value">64,549</div><div className="stat-label">Development (PKR)</div></div>
              <div className="stat-item"><div className="stat-value">28,771</div><div className="stat-label">Non-Dev (PKR)</div></div>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-user-graduate"></i> Target Beneficiaries</h3>
            <ul className="beneficiaries-list">
              <li>Farmers (both male and female)</li>
              <li>Agricultural officers & field assistants</li>
              <li>New departmental recruits</li>
              <li>Rural and urban women</li>
              <li>Private applicants for ICT courses</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h3><i className="fas fa-money-bill"></i> Budget Details 2024-25 (PKR in Million)</h3>
          <table className="budget-table">
            <thead>
              <tr><th>Year</th><th colSpan={2}>Development</th><th colSpan={2}>Non-Development</th></tr>
              <tr><th></th><th>Allocation</th><th>Expenditure</th><th>Allocation</th><th>Expenditure</th></tr>
            </thead>
            <tbody>
              <tr><td>2024-25</td><td>64,549.145</td><td>36,758.311</td><td>28,770.73</td><td>25,497.23</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3><i className="fas fa-tasks"></i> Main Functions</h3>
          <div className="functions-grid">
            {[
              { title: 'Policy & Planning', desc: 'Legislation, policy formulation and sectoral planning for agricultural development.' },
              { title: 'Extension Services', desc: 'Promotion of modern agriculture technologies through demonstrations and farmer gatherings.' },
              { title: 'Input Monitoring', desc: 'Monitoring of agriculture inputs like fertilizers, pesticides and irrigation through field extension staff.' },
              { title: 'Training & Research', desc: 'Training and research on Floriculture Seed Farms and Green Belts development.' },
              { title: 'Market Intelligence', desc: 'Market information and intelligence system for all Market Committees.' },
              { title: 'Water Management', desc: 'Water management operations, planning, research and coordination.' },
              { title: 'Seed Production', desc: 'Production, multiplication and marketing of certified seed through Punjab Seed Corporation.' },
              { title: 'Research Coordination', desc: 'Coordination of research activities across Agriculture, Livestock, Irrigation and other sectors.' },
            ].map((item, idx) => (
              <div key={idx} className="function-item">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3><i className="fas fa-building"></i> Training Facilities</h3>
          <div className="facilities-grid">
            {[
              { icon: 'chalkboard-teacher', name: 'Training Halls', desc: 'Equipped with multimedia for effective learning' },
              { icon: 'desktop', name: 'Computer Lab', desc: 'Capacity for 30-35 participants with modern equipment' },
              { icon: 'book', name: 'Library', desc: 'Agriculture and training resources for research' },
              { icon: 'theater-masks', name: 'Auditorium', desc: 'Large capacity for 300 participants for major events' },
              { icon: 'tractor', name: 'Demonstration Farm', desc: 'Hands-on training and technology demonstrations' },
            ].map((facility, idx) => (
              <div key={idx} className="facility-item">
                <div className="facility-icon"><i className={`fas fa-${facility.icon}`}></i></div>
                <h4>{facility.name}</h4>
                <p>{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="highlight-box">
          <h3><i className="fas fa-bullseye"></i> Institutional Mandate</h3>
          <p>RAEDC Vehari functions under the Agriculture Department Punjab as a specialized training and capacity-building institution for farmers, agriculture field staff, women beneficiaries, and departmental officers. Established in 1991, it plays an essential role in strengthening human capital and improving agricultural skills throughout the region.</p>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .raedc-header{background:linear-gradient(135deg,#3b82f6,#8b5cf6,#a855f7);color:white;padding:25px;border-radius:12px;margin-bottom:25px;box-shadow:0 8px 24px rgba(59,130,246,0.3);}
        .raedc-header h1{font-size:28px;margin-bottom:10px;font-weight:600;}
        .subtitle{font-size:18px;opacity:0.95;}
        .established{font-style:italic;margin-top:5px;font-size:16px;opacity:0.9;}
        h2{font-size:22px;margin-bottom:15px;color:#3b82f6;border-bottom:3px solid #3b82f6;padding-bottom:8px;}
        .dashboard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px;}
        .card{background:white;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.08);transition:transform 0.3s ease,box-shadow 0.3s ease;border-top:4px solid #3b82f6;}
        .card:hover{transform:translateY(-8px);box-shadow:0 12px 24px rgba(59,130,246,0.2);}
        .card h3{font-size:18px;margin-bottom:15px;color:#3b82f6;display:flex;align-items:center;font-weight:600;}
        .card h3 i{margin-right:10px;color:#8b5cf6;}
        .stats{display:flex;justify-content:space-between;margin-top:15px;gap:10px;}
        .stat-item{text-align:center;flex:1;background:linear-gradient(135deg,#e0e7ff,#f3e8ff);padding:12px;border-radius:8px;}
        .stat-value{font-size:24px;font-weight:700;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .stat-label{font-size:14px;color:#64748b;font-weight:500;margin-top:5px;}
        .beneficiaries-list{list-style-type:none;padding-left:0;}
        .beneficiaries-list li{padding:12px 0;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;transition:padding-left 0.2s ease;}
        .beneficiaries-list li:hover{padding-left:8px;background:linear-gradient(90deg,#e0e7ff,transparent);border-radius:4px;margin:0 -10px;padding-left:10px;padding-right:10px;}
        .beneficiaries-list li:before{content:"✓";color:#10b981;font-weight:bold;margin-right:12px;font-size:18px;background:#d1fae5;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .budget-table{width:100%;border-collapse:collapse;margin-top:15px;border-radius:8px;overflow:hidden;}
        .budget-table th,.budget-table td{padding:12px 15px;text-align:center;border:1px solid #e2e8f0;}
        .budget-table th{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:white;font-weight:600;}
        .budget-table tr:nth-child(even){background-color:#f8fafc;}
        .budget-table tr:hover{background-color:#e0e7ff;}
        .functions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:15px;margin-top:15px;}
        .function-item{background:linear-gradient(135deg,#f0f9ff,#f5f3ff);padding:18px;border-radius:10px;border-left:4px solid #3b82f6;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .function-item:hover{transform:translateX(5px);box-shadow:0 4px 12px rgba(59,130,246,0.15);}
        .function-item h4{color:#3b82f6;margin-bottom:8px;font-size:16px;font-weight:600;}
        .function-item p{color:#475569;line-height:1.6;}
        .facilities-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:15px;margin-top:15px;}
        .facility-item{background:linear-gradient(135deg,#ffffff,#f8fafc);padding:20px;border-radius:10px;text-align:center;border:2px solid #e0e7ff;transition:all 0.3s ease;}
        .facility-item:hover{border-color:#3b82f6;box-shadow:0 8px 16px rgba(59,130,246,0.15);transform:translateY(-4px);}
        .facility-icon{font-size:40px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px;}
        .facility-item h4{color:#3b82f6;margin-bottom:8px;font-weight:600;}
        .facility-item p{color:#64748b;line-height:1.5;}
        .highlight-box{background:linear-gradient(135deg,#dbeafe,#e0e7ff);border-left:5px solid #3b82f6;padding:20px;border-radius:10px;margin:15px 0;box-shadow:0 4px 12px rgba(59,130,246,0.1);}
        .highlight-box h3{color:#3b82f6;margin-bottom:12px;font-weight:600;}
        .highlight-box p{color:#475569;line-height:1.7;}
        .land-info-card{background:linear-gradient(135deg,#3b82f6,#8b5cf6,#a855f7);color:white;padding:30px;border-radius:12px;margin-bottom:25px;box-shadow:0 8px 24px rgba(59,130,246,0.3);display:flex;align-items:center;gap:25px;}
        .land-icon{font-size:56px;opacity:0.95;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.2));}
        .land-content{flex:1;}
        .land-content h3{font-size:22px;margin-bottom:12px;opacity:0.95;font-weight:600;}
        .land-value{font-size:42px;font-weight:700;margin-bottom:10px;text-shadow:0 2px 4px rgba(0,0,0,0.2);}
        .land-content p{font-size:15px;opacity:0.9;margin:0;line-height:1.6;}
        @media (max-width:768px){
          .dashboard{grid-template-columns:1fr;}
          .functions-grid,.facilities-grid{grid-template-columns:1fr;}
          .land-info-card{flex-direction:column;text-align:center;padding:25px;}
          .land-icon{font-size:48px;}
          .land-value{font-size:36px;}
        }
      `}</style>
    </div>
  );
}

