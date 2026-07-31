import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../App.css";

function Dashboard() {
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
                <strong>—</strong>
              </div>

              <small>Your submitted reports</small>

            </div>


            <div className="stat-card">

              <div className="stat-icon orange">
                ◷
              </div>

              <div>
                <span>In Progress</span>
                <strong>—</strong>
              </div>

              <small>Reports being handled</small>

            </div>


            <div className="stat-card">

              <div className="stat-icon green">
                ✓
              </div>

              <div>
                <span>Resolved</span>
                <strong>—</strong>
              </div>

              <small>Successfully resolved</small>

            </div>


            <div className="stat-card">

              <div className="stat-icon purple">
                ★
              </div>

              <div>
                <span>Impact Score</span>
                <strong>—</strong>
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


            <div className="empty-reports">

              <div className="empty-icon">
                +
              </div>

              <h3>No reports yet</h3>

              <p>
                You haven't reported any campus issues yet.
              </p>

             <Link to="/report" className="empty-report-btn">
               Report an Issue
             </Link>

            </div>

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