import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/profile.css";

function Profile() {

  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {

    const getProfile = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);

      const { data, error } = await supabase
        .from("issues")
        .select("status")
        .eq("user_id", user.id);

      if (error) {
        console.log(error);
        return;
      }

      setReports(data || []);
    };

    getProfile();

  }, []);

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const inProgressReports = reports.filter(
    (report) => report.status === "In Progress"
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved"
  ).length;

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Student";

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardNavbar />

        <section className="profile-page">

          <div className="profile-card">

            <div className="profile-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <h2>{userName}</h2>

            <p>{user?.email}</p>

            <div className="profile-info">

              <div>
                <strong>Student ID</strong>
                <span>
                  {user?.user_metadata?.student_id || "Not available"}
                </span>
              </div>

              <div>
                <strong>Account</strong>
                <span>Student</span>
              </div>

            </div>

          </div>


          {/* REPORT STATISTICS */}

          <div className="profile-stats">

            <div className="profile-stat-card">
              <span>📄</span>
              <strong>{totalReports}</strong>
              <p>Total Reports</p>
            </div>

            <div className="profile-stat-card">
              <span>🟡</span>
              <strong>{pendingReports}</strong>
              <p>Pending</p>
            </div>

            <div className="profile-stat-card">
              <span>🟠</span>
              <strong>{inProgressReports}</strong>
              <p>In Progress</p>
            </div>

            <div className="profile-stat-card">
              <span>🟢</span>
              <strong>{resolvedReports}</strong>
              <p>Resolved</p>
            </div>

          </div>

        </section>

      </main>

    </div>

  );
}

export default Profile;