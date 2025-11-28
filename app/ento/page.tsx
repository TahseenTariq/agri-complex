"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Cell, Legend } from 'recharts';

const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });

export default function EntoPage() {
  const total = 92;
  const verified = 48;
  const unverified = total - verified;

  const verifyData = [
    { name: 'Verified', value: verified },
    { name: 'Unverified', value: unverified },
  ];

  // Pretty colors: Green, Red, Blue, Purple, Amber, Orange, Teal, Yellow
  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#f97316', '#14b8a6', '#eab308'];

  const assetData = [
    { sNo: 1, name: 'Varnish', qty: '4 kg', dateReceived: '26.05.1997', lastVerification: '26.08.1999' },
    { sNo: 2, name: 'Enamel', qty: '3 buckets', dateReceived: '26.05.1997', lastVerification: '26.08.1999' },
    { sNo: 3, name: 'Chak matte special', qty: '6 Kg', dateReceived: '02.06.1997', lastVerification: '26.08.1999' },
    { sNo: 4, name: 'Zinc', qty: '3 Kg', dateReceived: '02.06.1997', lastVerification: '26.08.1999' },
    { sNo: 5, name: 'Plaster of Paris', qty: '5 Kg', dateReceived: '02.06.1997', lastVerification: '26.08.1999' },
    { sNo: 6, name: 'Distember', qty: '4', dateReceived: '02.06.1997', lastVerification: '26.08.1999' },
    { sNo: 7, name: 'Sheet BKA light', qty: '7', dateReceived: '29.05.1997', lastVerification: '01.09.2016' },
    { sNo: 8, name: 'Wooden board 6x6', qty: '7', dateReceived: '29.05.1997', lastVerification: '01.09.2016' },
    { sNo: 9, name: 'Pipe plastic 3/4 inch', qty: '12', dateReceived: '29.05.1997', lastVerification: '01.09.2016' },
    { sNo: 10, name: 'Electric wire', qty: '20 meter', dateReceived: '19.05.1997', lastVerification: '26.08.1999' },
    { sNo: 11, name: 'Petri-Dishes 40 ml', qty: '200', dateReceived: '05.09.1997', lastVerification: '01.09.2016' },
    { sNo: 12, name: 'Light microscope', qty: '1', dateReceived: '29.03.1998', lastVerification: '01.09.2016' },
    { sNo: 13, name: 'Generator', qty: '1', dateReceived: '25.02.1998', lastVerification: '01.09.2016' },
    { sNo: 14, name: 'Incubator TV 100', qty: '1', dateReceived: '28.02.1997', lastVerification: '11.04.2018' },
    { sNo: 15, name: 'Swift Stereo SM 80', qty: '1', dateReceived: '28.02.1997', lastVerification: '11.04.2018' },
    { sNo: 16, name: 'Air conditioner cooling Deluxe', qty: '1', dateReceived: '28.02.1997', lastVerification: '13.10.2020' },
    { sNo: 17, name: 'Refrigerator 2 in one', qty: '1', dateReceived: '22.04.2014', lastVerification: '13.10.2020' },
    { sNo: 18, name: 'Photographs - Pink bollworm', qty: '1', dateReceived: '30.06.1979', lastVerification: '—' },
    { sNo: 19, name: 'Printer LaserJet M26-A', qty: '1', dateReceived: '11.02.2021', lastVerification: '04.09.2024' },
    { sNo: 20, name: 'Motor cycle FDG-10-1006', qty: '1', dateReceived: '24.04.2014', lastVerification: '04.09.2024' },
  ];

  return (
    <div style={{ background: '#f7fafc', minHeight: '100vh' }}>
      <div className="ento-topbar">
        <h1>Entomological Research Sub Station Multan</h1>
        <div className="muted">Focal Person: Dr. Asifa Hameed</div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-building"></i>
          </div>
          <div className="info-content">
            <h3>Institutional Overview</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Officers</div>
                <div className="info-value">3</div>
              </div>
              <div className="info-item">
                <div className="info-label">Officials</div>
                <div className="info-value">2</div>
              </div>
              <div className="info-item">
                <div className="info-label">Land Area</div>
                <div className="info-value">3.5 Acre</div>
              </div>
              <div className="info-item">
                <div className="info-label">Rooms Occupied</div>
                <div className="info-value">5</div>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-grid mb-4">
          <div className="card-stat">
            <div className="muted">Total Register Entries</div>
            <div className="stat">{total}</div>
          </div>
          <div className="card-stat">
            <div className="muted">Items Verified (latest snapshot)</div>
            <div className="stat">{verified}</div>
          </div>
          <div className="card-stat">
            <div className="muted">Unverified / Missing</div>
            <div className="stat text-danger">{unverified}</div>
          </div>
        </div>

        <div className="grid-layout">
          <div className="card-table-section">
            <h5>Asset Register (sample / searchable)</h5>
            <div className="table-container">
              <table className="data-table">
                <thead><tr><th>#</th><th>Name</th><th>Qty</th><th>Date Received</th><th>Last Verification</th></tr></thead>
                <tbody>
                  {assetData.map((item) => (
                    <tr key={item.sNo}>
                      <td>{item.sNo}</td><td>{item.name}</td><td>{item.qty}</td><td>{item.dateReceived}</td><td>{item.lastVerification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-chart-section">
            <h6 className="mb-3">Verification Overview</h6>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={verifyData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {verifyData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="card-list mt-4">
              <h6 className="mb-3">Item Types (sample)</h6>
              <ul className="list-unstyled">
                <li>Microscopes & Lab Tools <span className="muted float-end">~12</span></li>
                <li>Sprayers & Field Tools <span className="muted float-end">~10</span></li>
                <li>Office Equipment <span className="muted float-end">~8</span></li>
                <li>Storage & Glassware <span className="muted float-end">~20</span></li>
                <li>Misc / Consumables <span className="muted float-end">~42</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style jsx>{`
        .ento-topbar{background:linear-gradient(135deg,#10b981,#14b8a6,#06b6d4);color:white;padding:25px 30px;box-shadow:0 4px 12px rgba(16,185,129,0.3);}
        .ento-topbar h1{margin:0;font-size:24px;letter-spacing:0.2px;font-weight:600;}
        .ento-topbar .muted{color:rgba(255,255,255,0.9);font-size:14px;margin-top:8px;}
        .muted{color:#64748b;font-size:14px;}
        .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-bottom:20px;}
        .card-stat{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);padding:22px;border-top:4px solid #10b981;transition:transform 0.3s ease,box-shadow 0.3s ease;}
        .card-stat:hover{transform:translateY(-5px);box-shadow:0 8px 20px rgba(16,185,129,0.2);}
        .card-stat:nth-child(2){border-top-color:#14b8a6;}
        .card-stat:nth-child(3){border-top-color:#f97316;}
        .stat{font-weight:700;font-size:32px;background:linear-gradient(135deg,#10b981,#14b8a6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-top:10px;}
        .card-stat:nth-child(2) .stat{background:linear-gradient(135deg,#14b8a6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .text-danger{color:#f97316;background:linear-gradient(135deg,#f97316,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .grid-layout{display:grid;grid-template-columns:2fr 1fr;gap:20px;}
        .card-table-section,.card-chart-section{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);padding:22px;border-top:4px solid #10b981;transition:box-shadow 0.3s ease;}
        .card-table-section:hover,.card-chart-section:hover{box-shadow:0 8px 20px rgba(16,185,129,0.15);}
        .card-table-section h5,.card-chart-section h6{color:#10b981;font-weight:600;margin-bottom:15px;}
        .data-table{width:100%;border-collapse:collapse;margin-top:15px;}
        .data-table th{background:linear-gradient(135deg,#10b981,#14b8a6);color:white;padding:14px;text-align:left;font-weight:600;font-size:14px;}
        .data-table td{padding:14px;border-bottom:1px solid #e2e8f0;color:#475569;}
        .data-table tr:hover{background:linear-gradient(90deg,#d1fae5,transparent);}
        .data-table tr:nth-child(even){background-color:#f0fdf4;}
        .data-table tr:nth-child(even):hover{background:linear-gradient(90deg,#d1fae5,#f0fdf4);}
        .table-container{max-height:600px;overflow-y:auto;border-radius:8px;}
        .card-list{background:linear-gradient(135deg,#ecfdf5,#d1fae5);padding:18px;border-radius:10px;border-left:4px solid #10b981;}
        .list-unstyled{list-style:none;padding:0;margin:0;}
        .list-unstyled li{padding:12px 0;border-bottom:1px solid #d1fae5;display:flex;justify-content:space-between;align-items:center;transition:padding-left 0.2s ease;color:#475569;font-weight:500;}
        .list-unstyled li:hover{padding-left:8px;color:#10b981;}
        .list-unstyled li:last-child{border-bottom:none;}
        .float-end{float:right;color:#14b8a6;font-weight:600;}
        .info-card{background:linear-gradient(135deg,#10b981,#14b8a6,#06b6d4);color:white;padding:30px;border-radius:12px;margin-bottom:25px;box-shadow:0 8px 24px rgba(16,185,129,0.3);display:flex;align-items:center;gap:25px;}
        .info-icon{font-size:56px;opacity:0.95;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.2));}
        .info-content{flex:1;}
        .info-content h3{font-size:24px;margin-bottom:20px;opacity:0.95;font-weight:600;}
        .info-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
        .info-item{background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);padding:18px;border-radius:12px;text-align:center;border:2px solid rgba(255,255,255,0.3);transition:transform 0.2s ease,background 0.2s ease;}
        .info-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.25);}
        .info-label{font-size:14px;opacity:0.95;margin-bottom:10px;font-weight:500;}
        .info-value{font-size:32px;font-weight:700;text-shadow:0 2px 4px rgba(0,0,0,0.2);}
        @media (max-width:768px){
          .grid-layout{grid-template-columns:1fr;}
          .stats-grid{grid-template-columns:1fr;}
          .info-card{flex-direction:column;text-align:center;padding:25px;}
          .info-icon{font-size:48px;}
          .info-grid{grid-template-columns:repeat(2,1fr);gap:15px;}
        }
        @media (max-width:480px){
          .info-grid{grid-template-columns:1fr;}
          .ento-topbar{padding:20px;}
          .ento-topbar h1{font-size:20px;}
        }
      `}</style>
    </div>
  );
}

