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

  const COLORS = ['#e67e22', '#f39c12', '#f7dc6f', '#fad7a0', '#fdebd0'];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-6xl">
        <header className="raedc-header">
          <h1>Regional Agricultural Economic Development Centre (RAEDC), Vehari</h1>
          <p className="subtitle">Specialized Training & Capacity Building Institution</p>
          <p className="established">Established in 1991</p>
        </header>

        <div className="dashboard">
          <div className="card">
            <h3><i className="fas fa-users"></i> Training Capacity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={capacityData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {capacityData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
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
              <BarChart data={budgetData}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value: any) => `PKR ${Number(value).toLocaleString()} Million`} />
                <Bar dataKey="value">
                  {budgetData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
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
        .raedc-header{background:linear-gradient(135deg,#e67e22,#f39c12);color:white;padding:25px;border-radius:8px;margin-bottom:25px;box-shadow:0 4px 12px rgba(0,0,0,0.1);}
        .raedc-header h1{font-size:28px;margin-bottom:10px;}
        .subtitle{font-size:18px;opacity:0.9;}
        .established{font-style:italic;margin-top:5px;font-size:16px;}
        h2{font-size:22px;margin-bottom:15px;color:#e67e22;border-bottom:2px solid #e0e0e0;padding-bottom:8px;}
        .dashboard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px;}
        .card{background:white;border-radius:8px;padding:20px;box-shadow:0 4px 8px rgba(0,0,0,0.05);transition:transform 0.3s ease,box-shadow 0.3s ease;}
        .card:hover{transform:translateY(-5px);box-shadow:0 6px 12px rgba(0,0,0,0.1);}
        .card h3{font-size:18px;margin-bottom:15px;color:#e67e22;display:flex;align-items:center;}
        .card h3 i{margin-right:10px;}
        .stats{display:flex;justify-content:space-between;margin-top:15px;}
        .stat-item{text-align:center;flex:1;}
        .stat-value{font-size:24px;font-weight:700;color:#e67e22;}
        .stat-label{font-size:14px;color:#666;}
        .beneficiaries-list{list-style-type:none;padding-left:0;}
        .beneficiaries-list li{padding:10px 0;border-bottom:1px solid #eee;display:flex;align-items:center;}
        .beneficiaries-list li:before{content:"✓";color:#e67e22;font-weight:bold;margin-right:10px;font-size:18px;}
        .budget-table{width:100%;border-collapse:collapse;margin-top:15px;}
        .budget-table th,.budget-table td{padding:12px 15px;text-align:center;border:1px solid #e0e0e0;}
        .budget-table th{background-color:#fef9e7;color:#e67e22;font-weight:500;}
        .budget-table tr:nth-child(even){background-color:#fef9e7;}
        .functions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:15px;margin-top:15px;}
        .function-item{background:#fef9e7;padding:15px;border-radius:6px;border-left:4px solid #e67e22;}
        .function-item h4{color:#e67e22;margin-bottom:8px;font-size:16px;}
        .facilities-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:15px;margin-top:15px;}
        .facility-item{background:#fef9e7;padding:15px;border-radius:6px;text-align:center;}
        .facility-icon{font-size:36px;color:#e67e22;margin-bottom:10px;}
        .facility-item h4{color:#e67e22;margin-bottom:8px;}
        .highlight-box{background:linear-gradient(135deg,#fef9e7,#fdebd0);border-left:4px solid #e67e22;padding:15px;border-radius:6px;margin:15px 0;}
        @media (max-width:768px){.dashboard{grid-template-columns:1fr;}.functions-grid,.facilities-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

