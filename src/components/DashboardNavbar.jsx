import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function DashboardNavbar() {

  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const getUser = async () => {

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      const name =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Student";

      setUserName(name);
    };

    getUser();
  }, []);

  return (
    <header className="dashboard-navbar">

      <div>
        <p className="dashboard-small-title">
          STUDENT PORTAL
        </p>

        <h2>Dashboard</h2>
      </div>

      <div className="navbar-right">

        <button className="notification-btn">
          ♧
          <span></span>
        </button>

        <div className="user-profile">

          <div className="user-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{userName}</strong>
            <small>Student</small>
          </div>

        </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;