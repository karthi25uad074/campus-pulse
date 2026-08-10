import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminDashboard() {

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const navigate = useNavigate();
const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {

    const fetchReports = async () => {

      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }
      console.log("Reports:", data);

      setReports(data);

    };

    fetchReports();

  }, []);
  const filteredReports = reports.filter((report) => {

  const matchesSearch =
    report.title.toLowerCase().includes(search.toLowerCase()) ||
    report.category.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" || report.status === filter;

  return matchesSearch && matchesFilter;

});
const chartData = [
  {
    name: "Pending",
    value: reports.filter(
      report => report.status === "Pending"
    ).length
  },
  {
    name: "In Progress",
    value: reports.filter(
      report => report.status === "In Progress"
    ).length
  },
  {
    name: "Resolved",
    value: reports.filter(
      report => report.status === "Resolved"
    ).length
  }
];
const updateStatus = async (id, status) => {

  const { error } = await supabase
    .from("issues")
    .update({ status })
    .eq("id", id);

  if (error) {
    toast.error("Failed to update status");
    console.log("Update error:",error);
    return;
  }

  setReports((prev) =>
    prev.map((report) =>
      report.id === id
        ? { ...report, status }
        : report
    )
  );

  toast.success(`Status updated to ${status}`);
};
const deleteReport = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this report?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("issues")
    .delete()
    .eq("id", id);

  if (error) {
     toast.error("Failed to delete report");
    console.log(error);
    return;
  }

  setReports((prev) =>
    prev.filter((report) => report.id !== id)
  );

};
  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardNavbar />

        <section className="dashboard-content">

         <div className="admin-header">

  <div>

    <h1>Admin Dashboard</h1>

    <p>
      Monitor and manage all campus reports.
    </p>

  </div>

  <div className="admin-badge">
    Administrator
  </div>

</div>

          <div className="stats-grid">

            <div className="stat-card">
              <h2>{reports.length}</h2>
              <p>Total Reports</p>
            </div>

            <div className="stat-card">
              <h2>
                {reports.filter(r => r.status === "Pending").length}
              </h2>
              <p>Pending</p>
            </div>

            <div className="stat-card">
              <h2>
                {reports.filter(r => r.status === "In Progress").length}
              </h2>
              <p>In Progress</p>
            </div>

            <div className="stat-card">
              <h2>
                {reports.filter(r => r.status === "Resolved").length}
              </h2>
              <p>Resolved</p>
            </div>

          </div>
          <div className="analytics-chart">

  <div className="chart-header">
    <h2>Report Status Overview</h2>
    <p>Current status of all submitted reports</p>
  </div>

  <div className="chart-container">

    <PieChart width={350} height={300}>

      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >

        <Cell fill="#f59e0b" />
        <Cell fill="#3b82f6" />
        <Cell fill="#22c55e" />

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </div>

</div>
          <div className="admin-toolbar">

  <input
    type="text"
    placeholder="🔍 Search by title or category..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="admin-search"
  />

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="admin-filter"
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>

</div>
          <div className="admin-table">

  <div className="table-header">

    <h2>All Reports</h2>

    <span>{reports.length} Reports</span>

  </div>

  <table>

    <thead>

      <tr>

        <th>Title</th>

        <th>Category</th>

        <th>Priority</th>

        <th>Status</th>

        <th>Location</th>

        <th>Actions</th>

      </tr>

    </thead>

    <tbody>

     {filteredReports.map((report) => (

        <tr key={report.id}>

          <td>{report.title}</td>

          <td>{report.category}</td>

          <td>{report.priority}</td>

          <td>

  <select
    value={report.status}
    onChange={(e) =>
      updateStatus(report.id, e.target.value)
    }
    className="status-select"
  >

    <option value="Pending">
      Pending
    </option>

    <option value="In Progress">
      In Progress
    </option>

    <option value="Resolved">
      Resolved
    </option>
    

  </select>
<button
  className="delete-btn"
  onClick={() => deleteReport(report.id)}
>
  🗑 Delete
</button>
</td>

          <td>{report.location}</td>

          <td>

           <button
  className="view-action"
  onClick={() => setSelectedReport(report)}
>
  👁 View
</button>
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

{selectedReport && (
  <div className="modal-overlay">
    <div className="report-modal">

      <h2>{selectedReport.title}</h2>

      <p>
        <strong>Description:</strong><br />
        {selectedReport.description}
      </p>

      <p>
        <strong>Category:</strong> {selectedReport.category}
      </p>

      <p>
        <strong>Priority:</strong> {selectedReport.priority}
      </p>

      <p>
        <strong>Status:</strong> {selectedReport.status}
      </p>

      <p>
        <strong>Location:</strong> {selectedReport.location}
      </p>
      {selectedIssue.evidence_url && (
  <div className="evidence-preview">
    <h3>📷 Evidence</h3>

    <img
      src={selectedIssue.evidence_url}
      alt="Issue evidence"
      className="evidence-thumbnail"
      onClick={() =>
        navigate(
          `/evidence?url=${encodeURIComponent(
            selectedIssue.evidence_url
          )}`
        )
      }
    />

    <p className="evidence-hint">
      Click image to view full size
    </p>
  </div>
)}
      <button
        className="close-modal"
        onClick={() => setSelectedReport(null)}
      >
        Close
      </button>

    </div>
  </div>
)}
{selectedReport && (
  <div className="modal-overlay">

    <div className="report-modal">

      <div className="modal-header">
        <h2>{selectedReport.title}</h2>

        <button
          className="modal-close"
          onClick={() => setSelectedReport(null)}
        >
          ✕
        </button>
      </div>

      <div className="modal-content">

        <p>
          <strong>Description</strong>
          <br />
          {selectedReport.description}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {selectedReport.category}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {selectedReport.priority}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedReport.status}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {selectedReport.location}
        </p>

      </div>

      <button
        className="close-modal"
        onClick={() => setSelectedReport(null)}
      >
        Close
      </button>

    </div>

  </div>
)}
       </section>

 {selectedReport && (
  <div className="modal-overlay">

    <div className="report-modal">

      <div className="modal-header">
        <h2>{selectedReport.title}</h2>

        <button
          className="modal-close"
          onClick={() => setSelectedReport(null)}
        >
          ✕
        </button>
      </div>

      <div className="modal-content">

        <p>
          <strong>Description</strong>
          <br />
          {selectedReport.description}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {selectedReport.category}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {selectedReport.priority}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedReport.status}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {selectedReport.location}
        </p>

      </div>

      <button
        className="close-modal"
        onClick={() => setSelectedReport(null)}
      >
        Close
      </button>

    </div>

  </div>
)}
     </main>

    </div>

  );
}

export default AdminDashboard;
