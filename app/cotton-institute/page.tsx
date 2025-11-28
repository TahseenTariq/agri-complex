"use client";

export default function CottonInstitutePage() {
  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh' }}>
      <div className="container mx-auto px-5 py-8 max-w-6xl">
        {/* Header */}
        <header className="cri-header">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-seedling"></i>
              <span>Cotton Research Institute</span>
            </div>
          </div>
          <h1>Cotton Research Institute - Data Summary</h1>
        </header>

        {/* Focal Person */}
        <div className="contact-card" style={{ marginBottom: '30px' }}>
          <div className="contact-icon">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="contact-info">
            <h3>Designated Focal Person</h3>
            <p><strong>Name:</strong> Dr. Muhammad Tauseef</p>
            <p><strong>Position:</strong> Senior Scientist (Agronomy)</p>
            <p><strong>Contact:</strong> +923340072357</p>
          </div>
      </div>

        {/* Land & Infrastructure Assets */}
        <section className="summary-section">
          <h2>
            <i className="fas fa-landmark"></i>
            Land & Infrastructure Assets
          </h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">24.6 acres</div>
              <div className="stat-label">Total Area</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">19.6 acres</div>
              <div className="stat-label">Cultivable Area</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">4 acres</div>
              <div className="stat-label">Building & Infrastructure</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">1 acre</div>
              <div className="stat-label">Roads & Pathways</div>
              </div>
            <div className="stat-card">
              <div className="stat-value">20</div>
              <div className="stat-label">Building Rooms</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">5</div>
              <div className="stat-label">Laboratories</div>
                </div>
              </div>
        </section>

        {/* Human Resource Assets */}
        <section className="summary-section">
          <h2>
            <i className="fas fa-users"></i>
            Human Resource Assets
          </h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">18</div>
              <div className="stat-label">Total Officers</div>
              </div>
            <div className="stat-card">
              <div className="stat-value">32</div>
              <div className="stat-label">Officials & Field Staff</div>
                </div>
            <div className="stat-card">
              <div className="stat-value">50</div>
              <div className="stat-label">Total Workforce</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">4</div>
              <div className="stat-label">Vacant Officer Positions</div>
                  </div>
                </div>
        </section>

        {/* Laboratory Equipment Analysis */}
        <section className="summary-section">
          <h2>
            <i className="fas fa-flask"></i>
            Laboratory Equipment Analysis
          </h2>
          <p className="mb-4"><strong>Total Equipment:</strong> 18 devices</p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">6</div>
              <div className="stat-label">Functional Equipment</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">12</div>
              <div className="stat-label">Non-Functional Equipment</div>
            </div>
          </div>

          <h3 className="mt-6 mb-4 text-lg font-semibold text-gray-800">Key Equipment Status</h3>
          <div className="overflow-x-auto">
            <table className="cri-table">
              <thead>
                <tr>
                  <th>Equipment</th>
                  <th>Department</th>
                  <th>Status</th>
                    </tr>
                  </thead>
              <tbody>
                <tr>
                  <td>Electrical Penetration Graph</td>
                  <td>Integrated Pest Management</td>
                  <td className="status-functional">Functional</td>
                </tr>
                <tr>
                  <td>Electrical Germinator</td>
                  <td>Integrated Pest Management</td>
                  <td className="status-functional">Functional</td>
                </tr>
                <tr>
                  <td>Spectrophotometer</td>
                  <td>Molecular Biology</td>
                  <td className="status-non-functional">Non-Functional</td>
                </tr>
                <tr>
                  <td>HPLC</td>
                  <td>Analytical Laboratory</td>
                  <td className="status-non-functional">Non-Functional</td>
                </tr>
                <tr>
                  <td>Atomic Absorption Spectroscopy</td>
                  <td>Analytical Laboratory</td>
                  <td className="status-non-functional">Non-Functional</td>
                </tr>
                <tr>
                  <td>Digital Droplet PCR</td>
                  <td>Molecular Biology</td>
                  <td className="status-non-functional">Non-Functional</td>
                </tr>
                <tr>
                  <td>High Volume Instrument (HVI)</td>
                  <td>Fiber Testing Laboratory</td>
                  <td className="status-functional">Functional</td>
                      </tr>
                  </tbody>
                </table>
              </div>

          <div className="insights">
            <h3>
              <i className="fas fa-lightbulb"></i>
              Key Insight
            </h3>
            <p>
              <strong>Primary Issue:</strong> 12 out of 18 laboratory devices are non-functional due to "chemicals procurement under process." This indicates a systemic issue where advanced analytical and molecular biology equipment is idle due to lack of essential consumables.
            </p>
            </div>
          </section>

        {/* Farm Machinery Analysis */}
        <section className="summary-section">
          <h2>
            <i className="fas fa-tractor"></i>
            Farm Machinery Analysis
          </h2>
          <p className="mb-4"><strong>Total Machinery:</strong> 22 pieces</p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">22</div>
              <div className="stat-label">All Functional</div>
            </div>
          </div>

          <h3 className="mt-6 mb-4 text-lg font-semibold text-gray-800">Selected Farm Machinery</h3>
          <div className="overflow-x-auto">
            <table className="cri-table">
              <thead>
                <tr>
                  <th>Equipment</th>
                  <th>Year</th>
                  <th>Location</th>
                  <th>Status</th>
                    </tr>
                  </thead>
              <tbody>
                <tr>
                  <td>Massey Ferguson-375</td>
                  <td>1999</td>
                  <td>CRI, Farm Shed</td>
                  <td className="status-functional">Functional</td>
                </tr>
                <tr>
                  <td>Massey Ferguson-240</td>
                  <td>1991</td>
                  <td>CRI, Farm Shed</td>
                  <td className="status-functional">Functional</td>
                </tr>
                <tr>
                  <td>Laser Land Leveler</td>
                  <td>2016</td>
                  <td>CRI, Farm Shed</td>
                  <td className="status-functional">Functional</td>
                </tr>
                <tr>
                  <td>Automatic Kharif Drill</td>
                  <td>2018</td>
                  <td>CRI, Farm Shed</td>
                  <td className="status-functional">Functional</td>
                </tr>
                <tr>
                  <td>Rotavator (42 blades)</td>
                  <td>2012</td>
                  <td>CRI, Farm Shed</td>
                  <td className="status-functional">Functional</td>
                      </tr>
                  </tbody>
                </table>
              </div>

          <div className="insights">
            <h3>
              <i className="fas fa-lightbulb"></i>
              Key Observation
            </h3>
            <p>The machinery fleet includes a mix of very old (e.g., Tractors from 1991 and 1999) and relatively modern equipment, all maintained in working condition.</p>
            </div>
          </section>
      </div>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <style jsx>{`
        .cri-header {
          background: linear-gradient(135deg, #2c7744, #5a9e6f);
          color: white;
          padding: 30px 20px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          display: flex;
          align-items: center;
        }
        .logo i {
          margin-right: 10px;
          font-size: 28px;
        }
        .cri-header h1 {
          font-size: 28px;
          margin: 20px 0 0 0;
          text-align: center;
          width: 100%;
        }
        .summary-section {
          background: white;
          border-radius: 10px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        .summary-section h2 {
          color: #475569;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 3px solid #475569;
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 600;
        }
        .summary-section h2 i {
          margin-right: 10px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        .stat-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          border-left: 4px solid #475569;
          transition: transform 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(71,85,105,0.2);
        }
        .stat-value {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg,#475569,#64748b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 10px 0;
        }
        .stat-label {
          color: #666;
          font-size: 14px;
        }
        .contact-card {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          border-radius: 8px;
          padding: 20px;
          display: flex;
          align-items: center;
          margin-top: 20px;
          border-left: 4px solid #475569;
        }
        .contact-icon {
          background: linear-gradient(135deg, #475569, #64748b);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          font-size: 20px;
          flex-shrink: 0;
        }
        .contact-info h3 {
          margin-bottom: 5px;
          color: #475569;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .contact-info p {
          color: #555;
          margin: 3px 0;
        }
        .cri-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .cri-table th {
          background: linear-gradient(135deg, #475569, #64748b);
          color: white;
          text-align: left;
          padding: 12px 15px;
          font-weight: 600;
        }
        .cri-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #eaeaea;
        }
        .cri-table tr:nth-child(even) {
          background-color: #f8fafc;
        }
        .cri-table tr:hover {
          background: linear-gradient(90deg, #f1f5f9, transparent);
        }
        .status-functional {
          color: #10b981;
          font-weight: bold;
        }
        .status-non-functional {
          color: #ef4444;
          font-weight: bold;
        }
        .insights {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          border-radius: 8px;
          padding: 20px;
          margin-top: 30px;
          border-left: 4px solid #475569;
        }
        .insights h3 {
          color: #475569;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .insights h3 i {
          margin-right: 10px;
        }
        .insights p {
          color: #333;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            text-align: center;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .contact-card {
            flex-direction: column;
            text-align: center;
          }
          .contact-icon {
            margin-right: 0;
            margin-bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
}
