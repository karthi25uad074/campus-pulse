import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function DashboardNavbar() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("issues")
        .select("id, title, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.log(error);
        return;
      }

      setNotifications(data || []);
    };

    fetchNotifications();
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

        {/* NOTIFICATION */}
        <div className="notification-wrapper">

          <button
            className="notification-btn"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            🔔

            {notifications.length > 0 && (
              <span className="notification-count">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">

              <div className="notification-header">
                <strong>Notifications</strong>

                <span>
                  {notifications.length}
                </span>
              </div>

              {notifications.length === 0 ? (

                <div className="no-notifications">
                  <div>🔔</div>
                  <strong>No notifications yet</strong>
                  <p>
                    Updates about your reports will appear here.
                  </p>
                </div>

              ) : (

                <div className="notification-list">

                  {notifications.map((notification) => (

                    <div
                      key={notification.id}
                      className="notification-item"
                    >

                      <div className="notification-icon">
                        {notification.status === "Resolved"
                          ? "🟢"
                          : notification.status === "In Progress"
                          ? "🟠"
                          : "🟡"}
                      </div>

                      <div className="notification-text">

                        <strong>
                          {notification.title}
                        </strong>

                        <p>
                          Status: {notification.status}
                        </p>

                        <small>
                          {new Date(
                            notification.created_at
                          ).toLocaleDateString("en-IN")}
                        </small>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>
          )}

        </div>

        {/* USER */}
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