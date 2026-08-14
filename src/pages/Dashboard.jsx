import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../App.css";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [profile, setProfile] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const totalReports = issues.length;

const inProgressReports = issues.filter(
  (issue) => issue.status === "In Progress"
).length;

const resolvedReports = issues.filter(
  (issue) => issue.status === "Resolved"
).length;
const contributionPoints =
  (totalReports * 10) + (resolvedReports * 20);
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
    const { data: profileData, error: profileError } = await supabase
  .from("profiles")
  .select("points, reports_count, badge")
  .eq("id", user.id)
  .single();

if (profileError) {
  console.log("Profile error:", profileError);
} else {
  setProfile(profileData);
}
    const name =
  user.user_metadata?.full_name ||
  user.user_metadata?.name ||
  user.email?.split("@")[0] ||
  "Student";

setUserName(name);

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

  <h1>{greeting}, {userName} 👋</h1>
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

  <div className="stat-card contribution-stat">

  <div className="stat-top">
    <span className="stat-emoji">🏆</span>
    <span>Contribution Points</span>
  </div>

  <h2>{contributionPoints}</h2>

<p>{totalReports} reports submitted</p>

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

          </section>
          {/* BADGES */}

<div className="badges-section">

  <div className="badges-title">
    <span>🏅</span>
    <h2>Your Badges</h2>
  </div>

  <div className="badges-grid">

    {issues.length >= 1 && (
      <div className="badge-card">
        <span>🥇</span>
        <strong>First Reporter</strong>
        <small>Submitted your first report</small>
      </div>
    )}

    {issues.length >= 5 && (
      <div className="badge-card">
        <span>🏆</span>
        <strong>Campus Helper</strong>
        <small>Submitted 5 reports</small>
      </div>
    )}

    {resolvedReports >= 3 && (
      <div className="badge-card">
        <span>🟢</span>
        <strong>Issue Solver</strong>
        <small>Resolved 3 reports</small>
      </div>
    )}

    {resolvedReports * 10 >= 100 && (
      <div className="badge-card">
        <span>⭐</span>
        <strong>Campus Champion</strong>
        <small>Reached 100 points</small>
      </div>
    )}

    {issues.length === 0 && (
      <p className="no-badges">
        Submit your first report to unlock your first badge! 🚀
      </p>
    )}

  </div>

</div>

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

    <Link to="/profile" className="quick-card">

  <div className="quick-icon">👤</div>

  <section>
    <strong>Profile</strong>
    <span>Manage your account settings.</span>
  </section>

  <b>→</b>

</Link>
<Link to="/leaderboard" className="quick-card">

  <div className="quick-icon">🏆</div>

  <section>
    <strong>Leaderboard</strong>
    <span>See the top CampusPulse contributors.</span>
  </section>

  <b>→</b>

</Link>

  </div>

</section>

        </section>

{selectedIssue && (
  <div
    className="issue-modal-overlay"
    onClick={() => setSelectedIssue(null)}
  >
    <div
      className="issue-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="issue-modal-header">
        <h2>{selectedIssue.title}</h2>

        <button
          className="modal-close"
          onClick={() => setSelectedIssue(null)}
        >
          ✕
        </button>
      </div>

      <div className="issue-modal-content">

        <p>
          <strong>Description</strong>
          <br />
          {selectedIssue.description}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {selectedIssue.category}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {selectedIssue.priority}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedIssue.status}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {selectedIssue.location}
        </p>

        <p>
          <strong>Submitted:</strong>{" "}
          {new Date(selectedIssue.created_at).toLocaleString("en-IN")}
        </p>

      </div>
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
        className="modal-close-btn"
        onClick={() => setSelectedIssue(null)}
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

export default Dashboard;