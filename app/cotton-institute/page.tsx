import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const [machineryData, setMachineryData] = useState([]);
  const [summary, setSummary] = useState({ total:0, functional:0, nonFunctional:0 });

  useEffect(() => {
    const data = [
      {name:"Disk Plow", qty:1, status:"Functional"},
      {name:"Ditcher", qty:1, status:"Functional"},
      {name:"Chisel Plow", qty:1, status:"Functional"},
      {name:"Border Disk", qty:1, status:"Functional"},
      {name:"Post Hole Digger", qty:1, status:"Functional"},
      {name:"Fertilizer Spreader", qty:1, status:"Functional"},
      {name:"Rice Transplanter", qty:1, status:"Not Functional"},
      {name:"Sub Soiler", qty:1, status:"Not Functional"},
      {name:"Rotary Slasher", qty:1, status:"Not Functional"},
      {name:"Spring Tine Cultivator", qty:1, status:"Not Functional"},
      {name:"Sugarcane set cutter", qty:1, status:"Not Functional"},
      {name:"Self-Leveling boom sprayer", qty:1, status:"Not Functional"}
    ];
    const total = data.length;
    const functional = data.filter(x=>x.status==="Functional").length;
    const nonFunctional = total - functional;

    setMachineryData(data);
    setSummary({ total, functional, nonFunctional });
  }, []);

  const statusData = {
    labels: ['Functional','Not Functional'],
    datasets: [{ data: [summary.functional, summary.nonFunctional], backgroundColor: ['#2ecc71','#e74c3c'] }]
  };

  const topItemsData = {
    labels: machineryData.map(x => x.name.substring(0,12)),
    datasets: [{ label: 'Qty', data: machineryData.map(x => x.qty), backgroundColor: '#3498db' }]
  };

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      {/* Navbar */}
      <div className="nav-header">
        <span style={{ fontWeight:600 }}>Agriculture Complex Multan</span>
        <a href="/">Home</a>
      </div>

      <div className="container py-4">
        <h1 className="text-center mb-4">AMRI Machinery Dashboard</h1>

        {/* Summary Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card p-3 text-center">
              <h2>{summary.total}</h2>
              <p>Total Machinery</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 text-center">
              <h2>{summary.functional}</h2>
              <p>Functional</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 text-center">
              <h2>{summary.nonFunctional}</h2>
              <p>Non-Functional</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card p-3">
              <h5 className="text-center">Functional vs Non-Functional</h5>
              <Pie data={statusData} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3">
              <h5 className="text-center">Top Machinery Types</h5>
              <Bar data={topItemsData} />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="card p-4 mb-4">
          <h5>Complete Machinery List</h5>
          <table className="table table-striped table-bordered mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Machinery Name</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {machineryData.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .nav-header {
          background:#2c3e50;
          color:#fff;
          padding:12px 20px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          box-shadow:0 2px 4px rgba(0,0,0,0.1);
          position:sticky;
          top:0;
          z-index:1000;
        }
        .nav-header a {
          color:#fff;
          text-decoration:none;
          padding:8px 16px;
          background:#3498db;
          border-radius:4px;
          transition:background 0.3s;
          font-weight:500;
        }
        .nav-header a:hover { background:#2980b9; }
        .card { border-radius:15px; box-shadow:0 4px 10px rgba(0,0,0,0.1); }
        h1,h2 { font-weight:700; }
        .table thead { background:#003f5c; color:white; }
      `}</style>
    </div>
  );
}
