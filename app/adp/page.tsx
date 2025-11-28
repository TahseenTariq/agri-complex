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

export default function AdpPage() {
  // Stock data
  const stockData = [
    { id: 1, name: "Tractor 8076 ML", quantity: 1, entry: "1/1" },
    { id: 2, name: "Trolley", quantity: 1, entry: "1/49" },
    { id: 3, name: "Boom Machine", quantity: 1, entry: "1/63" },
    { id: 4, name: "Cotton Ridger with Weeder", quantity: 1, entry: "1/79" },
    { id: 5, name: "Rotavator Plow", quantity: 2, entry: "1/99" },
    { id: 6, name: "Cultivator", quantity: 1, entry: "1/115" },
    { id: 7, name: "Blade", quantity: 2, entry: "1/137" },
    { id: 8, name: "Rabi Drill Automatic", quantity: 1, entry: "1/151" },
    { id: 9, name: "Tractor 375 Massay", quantity: 1, entry: "1/159" },
    { id: 10, name: "Ridger", quantity: 1, entry: "1/169" },
    { id: 11, name: "Disc Harrow", quantity: 1, entry: "1/175" },
    { id: 12, name: "Water Tank 5000 LTR", quantity: 1, entry: "1/181" },
    { id: 13, name: "Blade Plow", quantity: 1, entry: "1/187" },
    { id: 14, name: "Ridger", quantity: 1, entry: "1/189" },
    { id: 15, name: "Border Disc", quantity: 1, entry: "1/191" },
    { id: 16, name: "Dicher", quantity: 1, entry: "1/193" },
    { id: 17, name: "Tunnel 100 * 27 Feet", quantity: 7, entry: "1/197" }
  ];

  // Staff data
  const staffData = [
    { post: "Assistant Director (Farm)", bps: "18", sanctioned: 1, filled: 1, vacant: 0 },
    { post: "Farm Manager/AO", bps: "17", sanctioned: 1, filled: 1, vacant: 0 },
    { post: "Senior Clerk", bps: "14", sanctioned: 1, filled: 1, vacant: 0 },
    { post: "Field Investigator", bps: "14", sanctioned: 1, filled: 1, vacant: 0 },
    { post: "Senior Field Assistant", bps: "12", sanctioned: 2, filled: 0, vacant: 2 },
    { post: "Field Assistant", bps: "11", sanctioned: 3, filled: 2, vacant: 1 },
    { post: "Junior Clerk", bps: "11", sanctioned: 1, filled: 0, vacant: 1 },
    { post: "Tractor Driver", bps: "06", sanctioned: 1, filled: 1, vacant: 0 },
    { post: "Carpenter", bps: "01", sanctioned: 1, filled: 0, vacant: 1 },
    { post: "Tube Well Operator", bps: "07", sanctioned: 2, filled: 1, vacant: 1 },
    { post: "Greaser", bps: "01", sanctioned: 1, filled: 0, vacant: 1 },
    { post: "Naib Qasid", bps: "02", sanctioned: 1, filled: 1, vacant: 0 },
    { post: "Chowkidar", bps: "03&05", sanctioned: 2, filled: 1, vacant: 1 },
    { post: "Field Man", bps: "03", sanctioned: 1, filled: 0, vacant: 1 },
    { post: "Water Man", bps: "01", sanctioned: 1, filled: 0, vacant: 1 },
    { post: "Tractor Cleaner", bps: "01", sanctioned: 1, filled: 0, vacant: 1 },
    { post: "Beldar", bps: "01", sanctioned: 22, filled: 14, vacant: 8 },
    { post: "Mali", bps: "01", sanctioned: 1, filled: 0, vacant: 1 }
  ];

  // Pretty colors: Green, Red, Blue, Purple, Amber, Orange, Teal, Yellow
  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#f97316', '#14b8a6', '#eab308'];
  const COLORS_VACANCY = ['#10b981', '#ef4444']; // Green and Red for comparison

  // Calculate totals
  const totalStockItems = stockData.length;
  const totalSanctioned = staffData.reduce((sum, item) => sum + item.sanctioned, 0);
  const totalFilled = staffData.reduce((sum, item) => sum + item.filled, 0);
  const totalVacant = staffData.reduce((sum, item) => sum + item.vacant, 0);

  // Chart data
  const stockChartData = stockData.map((item, index) => ({
    name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
    qty: item.quantity,
    color: COLORS[index % COLORS.length]
  }));

  const staffPieData = [
    { name: 'Filled Positions', value: totalFilled },
    { name: 'Vacant Positions', value: totalVacant },
  ];

  return (
    <div style={{ background: '#f9f9f9', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-7xl">
        <div style={{ textAlign: 'center', marginBottom: '30px', background: 'linear-gradient(135deg,#14b8a6,#06b6d4,#0ea5e9)', color: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(20,184,166,0.3)' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '5px', fontWeight: '600' }}>
            Office of Assistant Director Agriculture (Farm)
          </h1>
          <p style={{ fontSize: '16px', opacity: '0.95' }}>Govt. Agriculture Station Multan</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Stock Items</div>
            <div className="stat-value">{totalStockItems}</div>
            <div>Available in Store</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Sanctioned Posts</div>
            <div className="stat-value">{totalSanctioned}</div>
            <div>Total Positions</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Filled Posts</div>
            <div className="stat-value">{totalFilled}</div>
            <div>Currently Occupied</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Vacant Posts</div>
            <div className="stat-value">{totalVacant}</div>
            <div>To be Filled</div>
          </div>
        </div>

        {/* Store Stock Inventory Section */}
        <h2 className="section-title">Store Stock Inventory</h2>
        <div className="dashboard">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Equipment & Machinery</h2>
              <div className="card-icon">
                <i className="fas fa-tools"></i>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Store Entry</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity} {item.quantity === 1 ? 'Unit' : 'Units'}</td>
                      <td>{item.entry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Stock Distribution</h2>
              <div className="card-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockChartData}>
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="qty" shape={(props: any) => {
                    const { x, y, width, height, payload } = props;
                    return <rect x={x} y={y} width={width} height={height} fill={payload.color || COLORS[0]} />;
                  }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Staff Vacancy Position Section */}
        <h2 className="section-title">Staff Vacancy Position</h2>
        <div className="dashboard">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Position Details</h2>
              <div className="card-icon">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Post</th>
                    <th>BPS</th>
                    <th>Sanctioned</th>
                    <th>Filled</th>
                    <th>Vacant</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.post}</td>
                      <td>{item.bps}</td>
                      <td>{item.sanctioned}</td>
                      <td>{item.filled}</td>
                      <td>
                        <span className={`badge ${item.vacant === 0 ? 'badge-success' : item.vacant < 2 ? 'badge-warning' : 'badge-danger'}`}>
                          {item.vacant}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Staff Position Overview</h2>
              <div className="card-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={staffPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => <text style={{ fontSize: '10px' }}>{`${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}</text>}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {staffPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_VACANCY[index % COLORS_VACANCY.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg,#14b8a6,#06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 10px 0;
        }
        
        .stat-label {
          color: #666666;
          font-size: 14px;
        }
        
        .section-title {
          font-size: 24px;
          color: #14b8a6;
          margin: 30px 0 15px;
          padding-bottom: 10px;
          border-bottom: 3px solid #14b8a6;
        }
        
        .dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 30px;
        }
        
        .card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-top: 4px solid #14b8a6;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(20,184,166,0.2);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #E0E0E0;
        }
        
        .card-title {
          font-size: 20px;
          color: #14b8a6;
          font-weight: 600;
        }
        
        .card-icon {
          background: linear-gradient(135deg,#e0f2fe,#bae6fd);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #14b8a6;
        }
        
        .table-container {
          max-height: 500px;
          overflow-y: auto;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th {
          background: linear-gradient(135deg,#14b8a6,#06b6d4);
          color: white;
          text-align: left;
          padding: 12px 15px;
          font-weight: 600;
          position: sticky;
          top: 0;
        }
        
        tr:nth-child(even) {
          background-color: #f0fdfa;
        }
        
        tr:hover {
          background: linear-gradient(90deg,#e0f2fe,transparent);
        }
        
        td {
          padding: 12px 15px;
          border-bottom: 1px solid #E0E0E0;
        }
        
        tr:last-child td {
          border-bottom: none;
        }
        
        tr:hover {
          background-color: #f5f5f5;
        }
        
        .chart-container {
          height: 300px;
          margin-top: 20px;
        }
        
        .badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .badge-success {
          background-color: #E8F5E9;
          color: #1B5E20;
        }
        
        .badge-warning {
          background-color: #FFF8E1;
          color: #FF8F00;
        }
        
        .badge-danger {
          background-color: #FFEBEE;
          color: #C62828;
        }
        
        @media (max-width: 992px) {
          .dashboard {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

