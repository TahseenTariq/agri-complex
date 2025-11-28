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

  // Colors: Green and Red for comparison, then Blue, Brown, Yellow
  const COLORS = ['#22c55e', '#ef4444', '#3b82f6', '#a16207', '#eab308'];

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
        <h1>Entomological Research Sub Station Multan — Asset Register Dashboard</h1>
        <div className="muted">Focal Person: Dr. Asifa Hameed · Last verification snapshots included where available</div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
            <div className="text-end mt-2"><small className="muted">Showing sample entries — full register can be exported on request</small></div>
          </div>

          <div className="card-chart-section">
            <h6 className="mb-3">Verification Overview</h6>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={verifyData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {verifyData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
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

      <style jsx>{`
        .ento-topbar{background:linear-gradient(90deg,#0f172a,#1e3a8a);color:white;padding:20px 30px;}
        .ento-topbar h1{margin:0;font-size:22px;letter-spacing:0.2px;}
        .muted{color:#6b7280;font-size:14px;}
        .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:15px;margin-bottom:20px;}
        .card-stat{background:white;border-radius:12px;box-shadow:0 6px 20px rgba(2,6,23,0.08);padding:20px;}
        .stat{font-weight:700;font-size:28px;color:#0f172a;margin-top:8px;}
        .text-danger{color:#e74c3c;}
        .grid-layout{display:grid;grid-template-columns:2fr 1fr;gap:20px;}
        .card-table-section,.card-chart-section{background:white;border-radius:12px;box-shadow:0 6px 20px rgba(2,6,23,0.08);padding:20px;}
        .data-table{width:100%;border-collapse:collapse;margin-top:15px;}
        .data-table th{background:#eef2ff;color:#0f172a;padding:12px;text-align:left;font-weight:600;}
        .data-table td{padding:12px;border-bottom:1px solid #e0e0e0;}
        .data-table tr:hover{background-color:#f9fafb;}
        .table-container{max-height:600px;overflow-y:auto;}
        .card-list{background:#f9fafb;padding:15px;border-radius:8px;}
        .list-unstyled{list-style:none;padding:0;margin:0;}
        .list-unstyled li{padding:8px 0;border-bottom:1px solid #e0e0e0;display:flex;justify-content:space-between;}
        .float-end{float:right;}
        @media (max-width:768px){.grid-layout{grid-template-columns:1fr;}.stats-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}

