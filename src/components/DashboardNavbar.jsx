function DashboardNavbar() {
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
            K
          </div>

          <div>
            <strong>Karthi</strong>
            <small>Student</small>
          </div>

        </div>

      </div>

    </header>
  );
}

export default DashboardNavbar;