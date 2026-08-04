import { Link,NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Sidebar() {
  const navigate = useNavigate();

const handleLogout = async () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  await supabase.auth.signOut();

  navigate("/");

};
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">CP</div>

        <span>
          Campus<span>Pulse</span>
        </span>
      </div>


      <nav className="sidebar-nav">

        <p className="nav-title">MAIN</p>

        <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
  <span>⌂</span>
  Dashboard
</NavLink>

        <NavLink
  to="/report"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
  <span>＋</span>
  Report Issue
</NavLink>

       <NavLink
  to="/my-reports"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
  <span>▤</span>
  My Reports
</NavLink>


        <p className="nav-title">ACCOUNT</p>

        <NavLink
  to="/profile"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
  <span>◯</span>
  Profile
</NavLink>

       <button
  className="sidebar-link logout-btn"
  onClick={handleLogout}
>

  <span>←</span>

  Logout

</button>

      </nav>


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