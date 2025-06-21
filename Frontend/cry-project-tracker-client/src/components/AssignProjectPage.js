import React, { useEffect, useState } from "react";

// Example API URLs (update as per your backend routes)
const PROJECTS_API = "http://localhost:5000/api/projects";
const USERS_API = "http://localhost:5000/api/users"; // Should return both frontliners and NGO partners
const CREATE_PROJECT_API = "http://localhost:5000/api/projects";

// Main Page Component
const AssignProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [frontliners, setFrontliners] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [form, setForm] = useState({
    name: "",
    cycle: "January",
    frontliner_id: "",
    ngo_partner_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Fetch users (frontliners, NGO partners) and projects
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch users
        const usersRes = await fetch(USERS_API);
        const users = await usersRes.json();
        setFrontliners(users.filter((u) => u.role === "cry_frontliner"));
        setNgos(users.filter((u) => u.role === "ngo_partner"));

        // Fetch projects
        const projRes = await fetch(PROJECTS_API);
        const projs = await projRes.json();
        setProjects(projs);
      } catch (e) {
        setError("Failed to load data from server.");
      }
    }
    fetchData();
  }, [msg]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Assign project handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");
    try {
      const res = await fetch(CREATE_PROJECT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to assign project.");
      } else {
        setMsg("Project assigned and tasks created successfully!");
        setForm({
          name: "",
          cycle: "January",
          frontliner_id: "",
          ngo_partner_id: "",
        });
      }
    } catch (err) {
      setError("Error assigning project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#e8f0fe", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "32px auto", padding: 24 }}>
        <h2 style={{ color: "#007bff", marginBottom: 16 }}>Assign Project to NGO</h2>
        {msg && <div style={{ color: "green", marginBottom: 12 }}>{msg}</div>}
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 12px #007bff22",
            marginBottom: 32,
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "end",
          }}
        >
          <div style={{ flex: 1 }}>
            <label>
              Project Name<br />
              <input
                type="text"
                name="name"
                value={form.name}
                required
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16,
                  marginTop: 4,
                }}
              />
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <label>
              Cycle<br />
              <select
                name="cycle"
                value={form.cycle}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                <option value="January">January</option>
                <option value="July">July</option>
              </select>
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <label>
              Assign Frontliner<br />
              <select
                name="frontliner_id"
                value={form.frontliner_id}
                required
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                <option value="">Select frontliner</option>
                {frontliners.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <label>
              Assign NGO<br />
              <select
                name="ngo_partner_id"
                value={form.ngo_partner_id}
                required
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                <option value="">Select NGO</option>
                {ngos.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.ngo_name
                      ? `${user.ngo_name} (${user.name})`
                      : user.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 28px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(90deg,#007bff 0%,#00c6ff 100%)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Assigning..." : "Assign Project"}
          </button>
        </form>

        <h3 style={{ color: "#007bff", marginBottom: 12 }}>
          Projects Assigned to NGOs
        </h3>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px #007bff22",
            padding: 24,
            overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7fafc" }}>
                <th style={thStyle}>Project</th>
                <th style={thStyle}>Cycle</th>
                <th style={thStyle}>Frontliner</th>
                <th style={thStyle}>NGO</th>
                <th style={thStyle}>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 24 }}>
                    No projects found.
                  </td>
                </tr>
              )}
              {projects.map((proj) => (
                <tr key={proj.id}>
                  <td style={tdStyle}>{proj.name}</td>
                  <td style={tdStyle}>{proj.cycle}</td>
                  <td style={tdStyle}>
                    {proj.Frontliner
                      ? `${proj.Frontliner.name} (${proj.Frontliner.email})`
                      : "N/A"}
                  </td>
                  <td style={tdStyle}>
                    {proj.NgoPartner
                      ? proj.NgoPartner.ngo_name
                        ? `${proj.NgoPartner.ngo_name} (${proj.NgoPartner.name})`
                        : proj.NgoPartner.name
                      : "N/A"}
                  </td>
                  <td style={tdStyle}>
                    {proj.Tasks && proj.Tasks.length > 0 ? (
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {proj.Tasks.slice(0, 3).map((task) => (
                          <li key={task.id}>
                            <span style={{ fontWeight: 500 }}>{task.name}</span>
                            <span style={{ color: "#666", marginLeft: 8 }}>
                              ({task.due_date})
                            </span>
                          </li>
                        ))}
                        {proj.Tasks.length > 3 && (
                          <li style={{ color: "#007bff" }}>
                            ...and {proj.Tasks.length - 3} more
                          </li>
                        )}
                      </ul>
                    ) : (
                      "No tasks"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  textAlign: "left",
  padding: "12px 8px",
  color: "#007bff",
  fontWeight: "bold",
  fontSize: 16,
  borderBottom: "2px solid #e3e3e3",
};

const tdStyle = {
  padding: "11px 8px",
  borderBottom: "1px solid #f0f0f0",
  fontSize: 15,
};

export default AssignProjectPage;