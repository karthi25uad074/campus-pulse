import { Link } from "react-router-dom";

function Sidebar() {
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

        <Link to="/dashboard" className="sidebar-link active">
          <span>⌂</span>
          Dashboard
        </Link>

        <Link to="/report" className="sidebar-link">
          <span>＋</span>
          Report Issue
        </Link>

        <Link to="/reports" className="sidebar-link">
          <span>▤</span>
          My Reports
        </Link>


        <p className="nav-title">ACCOUNT</p>

        <Link to="/profile" className="sidebar-link">
          <span>◯</span>
          Profile
        </Link>

        <Link to="/" className="sidebar-link">
          <span>←</span>
          Logout
        </Link>

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