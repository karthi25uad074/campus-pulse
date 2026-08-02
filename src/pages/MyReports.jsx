import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../App.css";

function MyReports() {
  const [issues, setIssues] = useState([]);

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

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardNavbar />

        <section className="dashboard-content">

          <h1>My Reports</h1>

          <p>View and track all your submitted issues.</p>

          {issues.map((issue) => (
            <div key={issue.id} className="report-card">

              <h3>{issue.title}</h3>

              <p>{issue.description}</p>

              <p><strong>Status:</strong> {issue.status}</p>

              <p><strong>Priority:</strong> {issue.priority}</p>

              <p><strong>Location:</strong> {issue.location}</p>

            </div>
          ))}

        </section>

      </main>

    </div>
  );
}

export default MyReports;