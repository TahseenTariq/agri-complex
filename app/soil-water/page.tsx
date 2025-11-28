"use client";

import { useEffect } from 'react';
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

export default function SoilWaterPage() {
  const budgetData = [
    { name: 'Employee Expenses', value: 30 },
    { name: 'Operating Expenses', value: 30 },
    { name: 'Commodity Purchase', value: 50 },
    { name: 'Civil Work', value: 30 },
    { name: 'Repair & Maintenance', value: 3 },
  ];

  const yearlyBudgetData = [
    { year: '2025-26', amount: 0 },
    { year: '2026-27', amount: 51 },
    { year: '2027-28', amount: 51 },
    { year: '2028-29', amount: 41 },
  ];

  const staffData = [
    { name: 'Officers', value: 6 },
    { name: 'Support Staff', value: 19 },
  ];

  const equipmentData = [
    { name: 'Analytical', value: 5 },
    { name: 'Heating', value: 4 },
    { name: 'Separation', value: 3 },
    { name: 'Measurement', value: 3 },
    { name: 'Other', value: 2 },
  ];

  // Different color schemes for different pie charts
  const COLORS_BUDGET = ['#8b5cf6', '#f59e0b', '#f97316', '#14b8a6', '#3b82f6']; // Purple-Amber-Orange scheme
  const COLORS_STAFF = ['#10b981', '#ef4444', '#3b82f6', '#f97316']; // Green-Red comparison scheme
  const COLORS = COLORS_BUDGET; // Default for bar charts

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container mx-auto max-w-7xl">
        <header className="sw-header">
          <h1>Soil & Water Testing Laboratory for Research</h1>
          </header>

        {/* Focal Person */}
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3><i className="fas fa-user"></i> Focal Person</h3>
          <div className="focal-person">
            <p><strong>Name:</strong> Ms. Fatima Bibi</p>
            <p><strong>Designation:</strong> Principal Scientist</p>
            <div className="contact-info">
              <div className="contact-item"><i className="fas fa-phone"></i><span>061-4423568</span></div>
              <div className="contact-item"><i className="fas fa-envelope"></i><span>swt_mltn@yahoo.com</span></div>
            </div>
            <p><strong>Address:</strong> Soil & Water Testing Lab., Govt. Agricultural Farm, Old Shujabad Road, Multan</p>
            <p><strong>Coordinates:</strong> Latitude: 28.652145° Longitude: 70.694682°</p>
          </div>
        </div>

        {/* Project Overview */}
        <div className="section">
          <h2>Project Overview</h2>
          <div className="dashboard">
            <div className="card">
              <h3><i className="fas fa-bullseye"></i> Project Impact</h3>
              <div className="impact-box">
                <p>The successful implementation of this project will surely increase the performance and services of the laboratory for the farming community in the area and enhance their yields not only in quantity but quality as well.</p>
              </div>
            </div>
            <div className="card">
              <h3><i className="fas fa-tasks"></i> Key Outcomes</h3>
              <ul className="outcomes-list">
                <li>Ability to Analyze Soil, Plant, Water and fertilizer in less time</li>
                <li>Quality of work</li>
                <li>Farmer's satisfaction on in time advice about use of fertilizers</li>
                <li>In time fertilizer analysis to avoid fake/unfit fertilizer use</li>
                <li>Improved information about judicious use of brackish water</li>
              </ul>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-chart-line"></i> Project Outputs</h3>
            <div className="dashboard">
              <div className="card"><h4>Improved Yields</h4><p>Enhanced agricultural productivity at economical rates through precise soil and water analysis.</p></div>
              <div className="card"><h4>Resource Optimization</h4><p>Wise use of available resources through accurate testing and recommendations.</p></div>
              <div className="card"><h4>Stakeholder Trust</h4><p>Increased trust of stakeholders on the laboratory services and recommendations.</p></div>
              <div className="card"><h4>Water Efficiency</h4><p>Improving water use efficiency by using amendments to counter salinity and/or sodicity.</p></div>
            </div>
          </div>
        </div>

        {/* Budget Section */}
        <div className="section">
          <h2>Budget Summary (Rs. Million)</h2>
          <div className="dashboard">
            <div className="card">
              <h3><i className="fas fa-money-bill-wave"></i> Budget Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={budgetData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                    {budgetData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_BUDGET[index % COLORS_BUDGET.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3><i className="fas fa-calendar-alt"></i> Yearly Allocation</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={yearlyBudgetData.map((entry, index) => ({ ...entry, color: COLORS[index % COLORS.length] }))}>
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="amount" shape={(props: any) => {
                    const { x, y, width, height, payload } = props;
                    return <rect x={x} y={y} width={width} height={height} fill={payload.color || COLORS[0]} />;
                  }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3><i className="fas fa-chart-pie"></i> Budget Overview</h3>
              <div className="stats">
                <div className="stat-item">
                  <div className="stat-value">143.00</div>
                  <div className="stat-label">Total Budget (Million Rs.)</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">4</div>
                  <div className="stat-label">Years</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-table"></i> Detailed Budget Breakdown</h3>
            <div className="budget-table-container">
              <table className="data-table">
                <thead><tr><th>Code</th><th>Particulars</th><th>2025-26</th><th>2026-27</th><th>2027-28</th><th>2028-29</th><th>Total (Rs. Million)</th></tr></thead>
                <tbody>
                  <tr><td>A01</td><td>Total Employees Related Expenses</td><td>0.000</td><td>10.000</td><td>10.000</td><td>10.000</td><td><strong>30.00</strong></td></tr>
                  <tr><td>A03</td><td>Total Operating Expenses</td><td>0.000</td><td>10.000</td><td>10.000</td><td>10.000</td><td><strong>30.00</strong></td></tr>
                  <tr><td>A093</td><td>Commodity and Purchase</td><td>0.000</td><td>20.000</td><td>20.000</td><td>10.000</td><td><strong>50.00</strong></td></tr>
                  <tr><td>A12</td><td>Civil Work</td><td>0.000</td><td>10.000</td><td>10.000</td><td>10.000</td><td><strong>30.00</strong></td></tr>
                  <tr><td>A13</td><td>Repair and Maintenance</td><td>0.000</td><td>1.000</td><td>1.000</td><td>1.000</td><td><strong>3.00</strong></td></tr>
                  <tr style={{ fontWeight: 'bold', backgroundColor: '#f5e8d9' }}><td colSpan={2}>Total Estimate</td><td>0.000</td><td>51.000</td><td>51.000</td><td>41.000</td><td><strong>143.00</strong></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Human Resources */}
        <div className="section">
          <h2>Human Resources</h2>
          <div className="dashboard">
            <div className="card">
              <h3><i className="fas fa-users"></i> Staff Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={staffData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {staffData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_STAFF[index % COLORS_STAFF.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="stats">
                <div className="stat-item"><div className="stat-value">25</div><div className="stat-label">Total Staff</div></div>
                <div className="stat-item"><div className="stat-value">6</div><div className="stat-label">Officers</div></div>
              </div>
            </div>
            <div className="card">
              <h3><i className="fas fa-user-tie"></i> Officers</h3>
              <table className="data-table">
                <thead><tr><th>#</th><th>Officials</th><th>BPS</th><th>Posts</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td>Scientific Officer (Lab)</td><td>17</td><td>2</td></tr>
                  <tr><td>2</td><td>Law Officer</td><td>17</td><td>1</td></tr>
                  <tr><td>3</td><td>Quality & Technical Manager for ISO 17025</td><td>17</td><td>2</td></tr>
                  <tr><td>4</td><td>Instrument Technician</td><td>16</td><td>1</td></tr>
                  <tr style={{ fontWeight: 'bold', backgroundColor: '#f5e8d9' }}><td colSpan={3}>Total</td><td>6</td></tr>
                </tbody>
              </table>
            </div>
            <div className="card">
              <h3><i className="fas fa-user-friends"></i> Support Staff</h3>
              <table className="data-table">
                <thead><tr><th>#</th><th>Officials</th><th>BPS</th><th>Posts</th></tr></thead>
                <tbody>
                  <tr><td>1</td><td>Office Assistant</td><td>16</td><td>1</td></tr>
                  <tr><td>2</td><td>Instruments Engineer</td><td>16</td><td>1</td></tr>
                  <tr><td>3</td><td>Computer Operator</td><td>15</td><td>1</td></tr>
                  <tr><td>4</td><td>Senior Clerk</td><td>14</td><td>1</td></tr>
                  <tr><td>5</td><td>Junior Clerk</td><td>11</td><td>2</td></tr>
                  <tr><td>6</td><td>Accounts Clerk</td><td>11</td><td>1</td></tr>
                  <tr><td>7</td><td>Lab. Assistant</td><td>6</td><td>2</td></tr>
                  <tr><td>8</td><td>Lab. Attendant</td><td>1</td><td>4</td></tr>
                  <tr><td>9</td><td>Store Keeper</td><td>11</td><td>1</td></tr>
                  <tr><td>10</td><td>Vehicle Driver</td><td>4</td><td>2</td></tr>
                  <tr><td>11</td><td>Naib Qasid</td><td>1</td><td>1</td></tr>
                  <tr><td>12</td><td>Chowkidar</td><td>1</td><td>1</td></tr>
                  <tr><td>13</td><td>Sweeper</td><td>1</td><td>1</td></tr>
                  <tr style={{ fontWeight: 'bold', backgroundColor: '#f5e8d9' }}><td colSpan={3}>Total</td><td>19</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Equipment */}
        <div className="section">
          <h2>Equipment & Facilities</h2>
          <div className="dashboard">
            <div className="card">
              <h3><i className="fas fa-tools"></i> Equipment Summary</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={equipmentData.map((entry, index) => ({ ...entry, color: COLORS[index % COLORS.length] }))}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" shape={(props: any) => {
                    const { x, y, width, height, payload } = props;
                    return <rect x={x} y={y} width={width} height={height} fill={payload.color || COLORS[0]} />;
                  }} />
                </BarChart>
              </ResponsiveContainer>
              <div className="stats">
                <div className="stat-item"><div className="stat-value">17</div><div className="stat-label">Equipment Types</div></div>
                <div className="stat-item"><div className="stat-value">40+</div><div className="stat-label">Total Units</div></div>
              </div>
            </div>
            <div className="card">
              <h3><i className="fas fa-building"></i> Infrastructure Plan</h3>
              <ul className="outcomes-list">
                <li>Double story building with at least 6 labs (20x20 size)</li>
                <li>Sample room with storage facility for 12,000 samples</li>
                <li>Seminar room and establishment offices</li>
                <li>Residences for staff and boundary wall</li>
              </ul>
            </div>
            <div className="card">
              <h3><i className="fas fa-car"></i> Vehicles</h3>
              <p>Purchase of Hilux Double Cabin vehicle for field work and transportation.</p>
              <p>Repair of existing vehicles to strengthen the fleet.</p>
            </div>
          </div>
          <div className="card">
            <h3><i className="fas fa-flask"></i> Laboratory Equipment</h3>
            <div className="equipment-grid">
              {['Block Digesters', 'Centrifuge Machines', 'Electric Distillaries', 'Drying Oven', 'Furnace', 'Flame Photometer', 'Spectrophotometer', 'Analytical Balances', 'Reverse Osmosis Plant', 'N Distillation Unit'].map((item, idx) => (
                <div key={idx} className="equipment-item">
                  <h4>{item}</h4>
                  <div className="quantity">Quantity: {[2, 2, 3, 1, 1, 1, 1, 3, 1, 2][idx]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .sw-header {background:linear-gradient(135deg,#10b981,#22c55e,#84cc16);color:white;padding:25px;border-radius:8px;margin-bottom:25px;box-shadow:0 4px 12px rgba(16,185,129,0.3);}
        .sw-header h1{font-size:28px;margin-bottom:10px;}
        .subtitle{font-size:18px;opacity:0.9;}
        h2{font-size:22px;margin:30px 0 15px;color:#10b981;border-bottom:3px solid #10b981;padding-bottom:8px;}
        .section{margin-bottom:40px;}
        .dashboard{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:30px;}
        .card{background:white;border-radius:8px;padding:20px;box-shadow:0 4px 8px rgba(0,0,0,0.05);transition:transform 0.3s ease,box-shadow 0.3s ease;border-top:4px solid #10b981;}
        .card:hover{transform:translateY(-5px);box-shadow:0 6px 12px rgba(16,185,129,0.2);}
        .card h3{font-size:18px;margin-bottom:15px;color:#10b981;display:flex;align-items:center;font-weight:600;}
        .card h3 i{margin-right:10px;}
        .stats{display:flex;justify-content:space-between;margin-top:15px;}
        .stat-item{text-align:center;flex:1;}
        .stat-value{font-size:24px;font-weight:700;background:linear-gradient(135deg,#10b981,#22c55e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0;}
        .stat-label{font-size:14px;color:#666;}
        .focal-person{background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-left:4px solid #10b981;padding:15px;border-radius:6px;margin:15px 0;}
        .contact-info{display:flex;flex-wrap:wrap;gap:15px;margin-top:10px;}
        .contact-item{display:flex;align-items:center;margin-right:20px;}
        .contact-item i{margin-right:8px;color:#10b981;}
        .impact-box{background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-left:4px solid #10b981;padding:15px;border-radius:6px;margin:15px 0;}
        .outcomes-list{list-style-type:none;padding-left:0;}
        .outcomes-list li{padding:8px 0;border-bottom:1px solid #e0e0e0;display:flex;align-items:flex-start;}
        .outcomes-list li:before{content:"✓";color:#10b981;font-weight:bold;margin-right:10px;font-size:18px;background:#d1fae5;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .data-table{width:100%;border-collapse:collapse;margin-top:15px;}
        .data-table th{background:linear-gradient(135deg,#10b981,#22c55e);color:white;text-align:left;padding:10px 12px;font-weight:500;}
        .data-table td{padding:10px 12px;border-bottom:1px solid #e0e0e0;}
        .data-table tr:hover{background:linear-gradient(90deg,#d1fae5,transparent);}
        .data-table tr:nth-child(even){background-color:#f0fdf4;}
        .budget-table-container{max-height:500px;overflow-y:auto;margin-top:15px;border:1px solid #e0e0e0;border-radius:8px;}
        .equipment-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:15px;margin-top:15px;}
        .equipment-item{background:linear-gradient(135deg,#ecfdf5,#d1fae5);padding:15px;border-radius:6px;text-align:center;border-left:4px solid #10b981;}
        .equipment-item h4{color:#10b981;margin-bottom:8px;font-weight:600;}
        .quantity{display:inline-block;background:linear-gradient(135deg,#10b981,#22c55e);color:white;padding:4px 8px;border-radius:4px;font-size:14px;font-weight:500;margin-top:5px;}
        @media (max-width:768px){.dashboard{grid-template-columns:1fr;}.equipment-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

