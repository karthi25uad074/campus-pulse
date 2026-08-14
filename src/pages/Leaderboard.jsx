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
useEffect(() => {
  const getCurrentUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    setCurrentUser(user);
  };

  getCurrentUser();
}, []);
  useEffect(() => {

    const fetchLeaderboard = async () => {

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, student_id");

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }

      const { data: reports, error: reportsError } = await supabase
        .from("issues")
        .select("user_id, status");

      if (reportsError) {
        console.log(reportsError);
        setLoading(false);
        return;
      }

      const result = data.map((student) => {

        const studentReports = reports.filter(
          (report) => report.user_id === student.id
        );

        const total = studentReports.length;

        const resolved = studentReports.filter(
          (report) => report.status === "Resolved"
        ).length;

        const points = total * 10 + resolved * 20;

        return {
          ...student,
          reports: total,
          resolved,
          points,
        };

      });

      result.sort((a, b) => b.points - a.points);

      setLeaderboard(result);
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
            <Link to="/dashboard" className="back-dashboard-btn">
  ← Back to Dashboard
</Link>

          <div className="leaderboard-header">
            <span>🏆 CAMPUS RANKINGS</span>

            <h1>Student Leaderboard</h1>

            <p>
              See the students making the biggest contribution
              to improving our campus.
            </p>
          </div>

          {loading ? (
            <div className="leaderboard-loading">
              Loading leaderboard...
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="leaderboard-empty">
              No students found.
            </div>
          ) : (
            <div className="leaderboard-list">

              {leaderboard.map((student, index) => (

                <div
  key={student.id}
  className={`leaderboard-card ${
    currentUser?.id === student.id ? "current-student" : ""
  }`}
>

                  <div className="leaderboard-rank">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `#${index + 1}`}
                  </div>

                  <div className="leaderboard-avatar">
                    {student.full_name
                      ?.charAt(0)
                      .toUpperCase() || "S"}
                  </div>

                  <div className="leaderboard-info">

                    <strong>
  {student.full_name || "Student"}

  {currentUser?.id === student.id && (
    <span className="you-badge">You</span>
  )}
</strong>
                    <small>
                      {student.student_id}
                    </small>

                    <small>
                      {student.reports} reports •{" "}
                      {student.resolved} resolved
                    </small>

                  </div>

                  <div className="leaderboard-points">
                    ⭐ {student.points}
                    <small>Points</small>
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