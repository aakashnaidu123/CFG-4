import React, { useEffect, useState } from 'react';

// Example logo, update path as needed
const logoUrl = "/cry-logo.png";

const Navbar = ({ onNavigate, active }) => (
  <nav style={{
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(90deg,#007bff 0%,#00c6ff 100%)',
    padding: '0 32px',
    height: 64,
    color: '#fff',
    boxShadow: '0 2px 8px #0002'
  }}>
    <img src={logoUrl} alt="CRY Logo" style={{ height: 40, marginRight: 14 }} />
    <span style={{ fontWeight: 'bold', fontSize: 22, letterSpacing: 2, marginRight: 40 }}>NGO Dashboard</span>
    <button
      style={navBtnStyle(active === "deadlines")}
      onClick={() => onNavigate("deadlines")}
    >Deadlines</button>
    <button
      style={navBtnStyle(active === "dashboard")}
      onClick={() => onNavigate("dashboard")}
    >Dashboard</button>
    <button
      style={navBtnStyle(active === "documents")}
      onClick={() => onNavigate("documents")}
    >Documents</button>
    <button
      style={navBtnStyle(active === "reports")}
      onClick={() => onNavigate("reports")}
    >Reports</button>
    <div style={{ flex: 1 }} />
    <span style={{ fontSize: 16, opacity: 0.75 }}>Welcome, NGO Member</span>
  </nav>
);

const navBtnStyle = (active) => ({
  background: active ? '#fff' : 'transparent',
  color: active ? '#007bff' : '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 'bold',
  fontSize: 16,
  padding: '8px 18px',
  margin: '0 6px',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s'
});

const SectionCard = ({ title, children }) => (
  <div style={{
    background: '#fff',
    borderRadius: 14,
    padding: 24,
    marginBottom: 28,
    boxShadow: '0 2px 8px #007bff22',
    minHeight: 120
  }}>
    <h3 style={{ color: '#007bff', marginBottom: 10 }}>{title}</h3>
    {children}
  </div>
);

const Dashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [deadlines, setDeadlines] = useState([]);
  const [reports, setReports] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [ngoData, setNgoData] = useState({});

  // Fetch data from backend (update URLs as per your backend)
  useEffect(() => {
    if (active === "deadlines")
      fetch("/api/deadlines").then(r => r.json()).then(setDeadlines).catch(() => setDeadlines([]));
    if (active === "reports")
      fetch("/api/reports").then(r => r.json()).then(setReports).catch(() => setReports([]));
    if (active === "documents")
      fetch("/api/documents").then(r => r.json()).then(setDocuments).catch(() => setDocuments([]));
    if (active === "dashboard")
      fetch("/api/ngo-data").then(r => r.json()).then(setNgoData).catch(() => setNgoData({}));
  }, [active]);

  return (
    <div style={{ minHeight: '100vh', background: '#e8f0fe' }}>
      <Navbar onNavigate={setActive} active={active} />
      <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
        {active === "dashboard" && (
          <SectionCard title="NGO Overview">
            {ngoData && ngoData.name ? (
              <div>
                <p><strong>Name:</strong> {ngoData.name}</p>
                <p><strong>Email:</strong> {ngoData.email}</p>
                <p><strong>Role:</strong> {ngoData.role}</p>
                <p><strong>NGO Name:</strong> {ngoData.ngo_name}</p>
                {/* Add more fields as needed */}
              </div>
            ) : (
              <p>Loading NGO data...</p>
            )}
          </SectionCard>
        )}
        {active === "deadlines" && (
          <SectionCard title="Upcoming Deadlines">
            <ul>
              {deadlines.length > 0 ? deadlines.map((d, idx) => (
                <li key={idx}>
                  <strong>{d.title}</strong> - <span>{d.date}</span>
                </li>
              )) : <li>No deadlines found.</li>}
            </ul>
          </SectionCard>
        )}
        {active === "documents" && (
          <SectionCard title="Documents">
            <ul>
              {documents.length > 0 ? documents.map((doc, idx) => (
                <li key={idx}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
                </li>
              )) : <li>No documents available.</li>}
            </ul>
          </SectionCard>
        )}
        {active === "reports" && (
          <SectionCard title="Reports">
            <ul>
              {reports.length > 0 ? reports.map((rep, idx) => (
                <li key={idx}>
                  <strong>{rep.title}</strong> - <a href={rep.url} target="_blank" rel="noopener noreferrer">View</a>
                </li>
              )) : <li>No reports found.</li>}
            </ul>
          </SectionCard>
        )}
      </div>
    </div>
  );
};

export default Dashboard;