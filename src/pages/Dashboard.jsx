import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "../styles/dashboard.css";
import "../App.css";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const totalReports = issues.length;

const inProgressReports = issues.filter(
  (issue) => issue.status === "In Progress"
).length;

const resolvedReports = issues.filter(
  (issue) => issue.status === "Resolved"
).length;
const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
  greeting = "Good Morning";
} else if (hour < 17) {
  greeting = "Good Afternoon";
}
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
console.log(issues);
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardNavbar />

        <section className="dashboard-content">

          {/* WELCOME */}

          <div className="welcome-section">

  <div className="welcome-left">

    <span className="welcome-badge">
      Student Dashboard
    </span>

  <h1>{greeting}, Karthi 👋</h1>
    <p>
      Manage campus issues, track report progress and help improve your campus with CampusPulse.
    </p>

  </div>

  <div className="welcome-right">
    <Link to="/report" className="report-btn">
      + Report Issue
    </Link>
  </div>

</div>

          {/* EMPTY STAT CARDS */}

          <div className="stats-grid">

  <div className="stat-card">

    <div className="stat-top">
      <span className="stat-emoji">📄</span>
      <span>Total Reports</span>
    </div>

    <h2>{totalReports}</h2>

    <p>Your submitted reports</p>

  </div>

  <div className="stat-card">

    <div className="stat-top">
      <span className="stat-emoji">🟠</span>
      <span>In Progress</span>
    </div>

    <h2>{inProgressReports}</h2>

    <p>Reports currently under review</p>

  </div>

  <div className="stat-card">

    <div className="stat-top">
      <span className="stat-emoji">🟢</span>
      <span>Resolved</span>
    </div>

    <h2>{resolvedReports}</h2>

    <p>Successfully completed reports</p>

  </div>

  <div className="stat-card">

    <div className="stat-top">
      <span className="stat-emoji">⭐</span>
      <span>Impact Score</span>
    </div>

    <h2>{resolvedReports * 10}</h2>

    <p>Your contribution score</p>

  </div>

</div>

          {/* RECENT REPORTS */}

          <section className="dashboard-section">

           <div className="section-top">

  <div>
    <span className="section-label">
      REPORTS
    </span>

    <h2>
  📋 Recent Reports
</h2>

    <p>
      Here are your latest submitted campus issues.
    </p>

  </div>

  <Link to="/my-reports" className="view-all-btn">
    View All →
  </Link>

</div>


          {issues.length === 0 ? (
  <div className="empty-reports">

  <div className="empty-emoji">
    📭
  </div>

  <h3>No Reports Yet</h3>

  <p>
    You haven't reported any campus issues yet.
    Click below to create your first report.
  </p>

  <Link to="/report" className="empty-report-btn">
    + Report Issue
  </Link>

</div>
) : (
  <div className="reports-list">
    {issues.map((issue) => (
  <div key={issue.id} className="report-card">

    <div className="report-header">

      <div className="report-title">

        <h3>{issue.title}</h3>

        <p className="report-description">
          {issue.description}
        </p>

      </div>

      <span
  className={`status-badge ${
    issue.status === "Resolved"
      ? "status-resolved"
      : issue.status === "In Progress"
      ? "status-progress"
      : "status-pending"
  }`}
>
  {issue.status === "Resolved"
    ? "✅ Resolved"
    : issue.status === "In Progress"
    ? "🛠 In Progress"
    : "🟡 Pending"}
</span>

    </div>

    <div className="report-tags">

      <span className="tag">
        ⚡ {issue.category}
      </span>

      <span
  className={`priority-tag ${
    issue.priority === "Critical"
      ? "critical"
      : issue.priority === "High"
      ? "high"
      : issue.priority === "Medium"
      ? "medium"
      : "low"
  }`}
>
  🔥 {issue.priority}
</span>

      <span className="tag">
        📍 {issue.location}
      </span>

    </div>

    <div className="report-footer">

      <span className="report-date">
        🕒{new Date(issue.created_at).toLocaleString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})}
      </span>

      <button className="view-btn">
        View Details →
      </button>

    </div>

  </div>
))}
  </div>
)}

          </section>


          {/* QUICK ACTIONS */}

         <section className="quick-section">

  <h2>
  ⚡ Quick Actions
</h2>

  <div className="quick-grid">

    <Link to="/report" className="quick-card">

      <div className="quick-icon">📝</div>

      <section>
        <strong>Report an Issue</strong>
        <span>Create a new campus issue report.</span>
      </section>

      <b>→</b>

    </Link>

    <Link to="/my-reports" className="quick-card">

      <div className="quick-icon">📂</div>

      <section>
        <strong>My Reports</strong>
        <span>Track all your submitted reports.</span>
      </section>

      <b>→</b>

    </Link>

    <button className="quick-card">

      <div className="quick-icon">👤</div>

      <section>
        <strong>Profile</strong>
        <span>Manage your account settings.</span>
      </section>

      <b>→</b>

    </button>

  </div>

</section>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;