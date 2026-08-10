import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/myReports.css";
import "../App.css";

function MyReports() {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const [selectedIssue, setSelectedIssue] = useState(null);
const navigate = useNavigate();

  const deleteReport = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this report?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("issues")
    .delete()
    .eq("id", id);

  if (error) {

    toast.error("Unable to delete report.");

    return;

  }

  setIssues(
    issues.filter((issue) => issue.id !== id)
  );

  toast.success("Report deleted successfully!");

};
useEffect(() => {
    const fetchIssues = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setIssues(data);
    };

    fetchIssues();
  }, []);
  const filteredIssues = issues.filter((issue) => {

  const matchesSearch =
    issue.title.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" || issue.status === filter;

  return matchesSearch && matchesFilter;

});

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardNavbar />

        <section className="dashboard-content">
<div className="reports-hero">

  <div>

    <span className="hero-badge">
      Student Reports
    </span>

    <h1>My Reports</h1>

    <p>
      View, monitor and track the progress of every issue you've reported.
    </p>

  </div>

  <div className="hero-count">

    <h2>{issues.length}</h2>

    <span>Total Reports</span>

  </div>

</div>
<div className="reports-toolbar">

  <input
    type="text"
    placeholder="🔍 Search reports..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-input"
  />

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="filter-select"
  >
    <option>All</option>
    <option>Pending</option>
    <option>In Progress</option>
    <option>Resolved</option>
  </select>

</div>
<div className="report-stats">

  <div className="mini-stat">
    <h3>{issues.length}</h3>
    <p>Total Reports</p>
  </div>

  <div className="mini-stat">
    <h3>
      {issues.filter(issue => issue.status === "Pending").length}
    </h3>
    <p>Pending</p>
  </div>

  <div className="mini-stat">
    <h3>
      {issues.filter(issue => issue.status === "In Progress").length}
    </h3>
    <p>In Progress</p>
  </div>

  <div className="mini-stat">
    <h3>
      {issues.filter(issue => issue.status === "Resolved").length}
    </h3>
    <p>Resolved</p>
  </div>

</div>
          {filteredIssues.length === 0 ? (

  <div className="empty-reports">

    <div className="empty-icon">📂</div>

    <h2>No Reports Yet</h2>

    <p>
      You haven't submitted any campus issues yet.
    </p>

  </div>

) : (

  <div className="reports-grid">

    {filteredIssues.map((issue) => (

      <div key={issue.id} className="report-card">

        <div className="report-top">

          <h3>{issue.title}</h3>

          <span className={`status-badge ${issue.status.toLowerCase().replace(/\s+/g, "-")}`}>
            {issue.status}
          </span>

        </div>

        <p className="report-description">
          {issue.description}
        </p>

        <div className="report-details">

          <span>📍 {issue.location}</span>

         <span
  className={`priority-badge ${issue.priority.toLowerCase()}`}
>
  ⚡ {issue.priority}
</span>

          <span>📂 {issue.category}</span>

          <span>
    📅 {new Date(issue.created_at).toLocaleDateString()}
  </span>

        </div>
        <div className="report-actions">

 <button
  className="edit-btn"
  onClick={() => navigate(`/edit-report/${issue.id}`)}
>
  ✏️ Edit
</button>

  <button
    className="delete-btn"
    onClick={() => deleteReport(issue.id)}
  >
    🗑 Delete
  </button>

</div>
        <div className="report-actions">

  <button
  className="view-btn"
  onClick={() => setSelectedIssue(issue)}
>
  View Details →
</button>

</div>

      </div>

    ))}

  </div>

)}
{selectedIssue && (

  <div
    className="modal-overlay"
    onClick={() => setSelectedIssue(null)}
  >

    <div
      className="report-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>{selectedIssue.title}</h2>

      <p>{selectedIssue.description}</p>

      <hr />

      <p><strong>📂 Category:</strong> {selectedIssue.category}</p>

      <p><strong>⚡ Priority:</strong> {selectedIssue.priority}</p>

      <p><strong>📍 Location:</strong> {selectedIssue.location}</p>
     {selectedIssue.evidence_url && (
  <div className="evidence-preview">
    <h3>📷 Evidence</h3>

    <img
      src={selectedIssue.evidence_url}
      alt="Issue evidence"
      className="evidence-thumbnail"
      onClick={() =>
        navigate(
          `/evidence?url=${encodeURIComponent(selectedIssue.evidence_url)}`
        )
      }
    />

    <p className="evidence-hint">
      Click image to view full size
    </p>
  </div>
)}

      <p><strong>🟢 Status:</strong> {selectedIssue.status}</p>

      <p>
        <strong>📅 Reported:</strong>{" "}
        {new Date(selectedIssue.created_at).toLocaleString()}
      </p>

      <button
        className="close-btn"
        onClick={() => setSelectedIssue(null)}
      >
        Close
      </button>

    </div>

  </div>

)}
        </section>

      </main>

    </div>
  );
}

export default MyReports;