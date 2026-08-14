import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  // Get logged-in user
  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUser(user);
    };

    getCurrentUser();
  }, []);

  // Fetch leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase.rpc(
        "get_leaderboard"
      );

      console.log("LEADERBOARD DATA:", data);
      console.log("LEADERBOARD ERROR:", error);

      if (error) {
        console.error("Leaderboard error:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setLeaderboard(data || []);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardNavbar />

        <section className="leaderboard-page">

          {/* BACK BUTTON */}
          <Link
            to="/dashboard"
            className="back-dashboard-btn"
          >
            ← Back to Dashboard
          </Link>

          {/* HEADER */}
          <div className="leaderboard-header">

            <span>🏆 CAMPUS RANKINGS</span>

            <h1>Student Leaderboard</h1>

            <p>
              See the students making the biggest contribution
              to improving our campus.
            </p>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="leaderboard-loading">
              Loading leaderboard...
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="leaderboard-error">
              <h3>⚠️ Unable to load leaderboard</h3>

              <p>{error}</p>

              <button
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            leaderboard.length === 0 && (
              <div className="leaderboard-empty">

                <div className="empty-icon">
                  🏆
                </div>

                <h3>No students found</h3>

                <p>
                  Students will appear here once their
                  profiles are created.
                </p>

              </div>
            )}

          {/* LEADERBOARD */}
          {!loading &&
            !error &&
            leaderboard.length > 0 && (

              <div className="leaderboard-list">

                {leaderboard.map((student, index) => (

                  <div
                    key={student.id}
                    className={`leaderboard-card ${
                      currentUser?.id === student.id
                        ? "current-student"
                        : ""
                    }`}
                  >

                    {/* RANK */}
                    <div className="leaderboard-rank">

                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : `#${index + 1}`}

                    </div>

                    {/* AVATAR */}
                    <div className="leaderboard-avatar">

                      {student.full_name
                        ?.charAt(0)
                        .toUpperCase() || "S"}

                    </div>

                    {/* STUDENT INFO */}
                    <div className="leaderboard-info">

                      <strong>

                        {student.full_name || "Student"}

                        {currentUser?.id === student.id && (
                          <span className="you-badge">
                            You
                          </span>
                        )}

                      </strong>

                      <small>
                        Student ID: {student.student_id}
                      </small>

                      <small>
                        {student.reports || 0} reports
                        {" • "}
                        {student.resolved || 0} resolved
                      </small>

                    </div>

                    {/* POINTS */}
                    <div className="leaderboard-points">

                      <strong>
                        ⭐ {student.points || 0}
                      </strong>

                      <small>
                        Points
                      </small>

                    </div>

                  </div>

                ))}

              </div>
            )}

        </section>

      </main>

    </div>
  );
}

export default Leaderboard;