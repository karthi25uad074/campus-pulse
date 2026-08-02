import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
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

            <div>
              <p>Welcome 👋</p>

              <h1>Your Campus Dashboard</h1>

              <span>
                Stay updated and help make your campus better.
              </span>
            </div>

            <Link to="/report" className="report-btn">
              + Report an Issue
            </Link>

          </div>


          {/* EMPTY STAT CARDS */}

          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon blue">
                ◫
              </div>

              <div>
                <span>Total Reports</span>
                <strong>{totalReports}</strong>
              </div>

              <small>Your submitted reports</small>

            </div>


            <div className="stat-card">

              <div className="stat-icon orange">
                ◷
              </div>

              <div>
                <span>In Progress</span>
                <strong>{inProgressReports}</strong>
              </div>

              <small>Reports being handled</small>

            </div>


            <div className="stat-card">

              <div className="stat-icon green">
                ✓
              </div>

              <div>
                <span>Resolved</span>
                <strong>{resolvedReports}</strong>
              </div>

              <small>Successfully resolved</small>

            </div>


            <div className="stat-card">

              <div className="stat-icon purple">
                ★
              </div>

              <div>
                <span>Impact Score</span>
                <strong>{resolvedReports * 10}</strong>
              </div>

              <small>Your contribution</small>

            </div>

          </div>


          {/* RECENT REPORTS */}

          <section className="dashboard-section">

            <div className="section-top">

              <div>
                <h2>Recent Reports</h2>

                <p>
                  Your recently submitted campus issues.
                </p>
              </div>

              <a href="#reports">
                View all →
              </a>

            </div>


           {issues.length === 0 ? (
  <div className="empty-reports">
    <div className="empty-icon">+</div>

    <h3>No reports yet</h3>

    <p>You haven't reported any campus issues yet.</p>

    <Link to="/report" className="empty-report-btn">
      Report an Issue
    </Link>
  </div>
) : (
  <div key={issue.id} className="report-card">

  <h3>{issue.title}</h3>

  <p>{issue.description}</p>

  <p><strong>Category:</strong> {issue.category}</p>

  <p><strong>Priority:</strong> {issue.priority}</p>

  <p><strong>Location:</strong> {issue.location}</p>

  <div className="report-card-footer">

    <span className="report-status">
      {issue.status}
    </span>

  </div>

</div>
)}

          </section>


          {/* QUICK ACTIONS */}

          <section className="quick-section">

            <h2>Quick Actions</h2>

            <div className="quick-grid">

            <Link to="/report" className="quick-card">

            <div>＋</div>

            <section>
             <strong>Report an Issue</strong>

           <span>
                  Tell us about a campus problem.
           </span>
           </section>

        <b>→</b>

            </Link>


              <button className="quick-card">

                <div>▤</div>

                <section>
                  <strong>View My Reports</strong>

                  <span>
                    Track your submitted issues.
                  </span>
                </section>

                <b>→</b>

              </button>


              <button className="quick-card">

                <div>◯</div>

                <section>
                  <strong>Update Profile</strong>

                  <span>
                    Manage your account information.
                  </span>
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