import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Sidebar() {
  const navigate = useNavigate();
const [isAdmin, setIsAdmin] = useState(false);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Check admin email
      if (user.email === "admin@campuspulse.com") {
        setIsAdmin(true);
      }
      setLoading(false);
    };

    checkUserRole();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    await supabase.auth.signOut();

    navigate("/");
  };
  if (loading) {
  return null;
}

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">CP</div>

        <span>
          Campus<span>Pulse</span>
        </span>
      </div>

      <nav className="sidebar-nav">

        <p className="nav-title">MAIN</p>

        {/* ADMIN SIDEBAR */}
        {isAdmin ? (
          <>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>▣</span>
              Admin Dashboard
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>◯</span>
              Profile
            </NavLink>
          </>
        ) : (
          /* STUDENT SIDEBAR */
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>⌂</span>
              Dashboard
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>＋</span>
              Report Issue
            </NavLink>

            <NavLink
              to="/my-reports"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>▤</span>
              My Reports
            </NavLink>

            <p className="nav-title">ACCOUNT</p>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>◯</span>
              Profile
            </NavLink>
          </>
        )}

        {/* LOGOUT */}
        <button
          className="sidebar-link logout-btn"
          onClick={handleLogout}
        >
          <span>←</span>
          Logout
        </button>

      </nav>

      {/* HELP BOX */}
      <div className="sidebar-bottom">

        <div className="help-box">
          <strong>Need help?</strong>

          <p>
            Contact campus support
            for assistance.
          </p>

          <button>
            Contact Support
          </button>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;