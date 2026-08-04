import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/profile.css";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

    };

    getUser();

  }, []);

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardNavbar />

        <section className="profile-page">

          <div className="profile-card">

            <div className="profile-avatar">

              {user?.email?.charAt(0).toUpperCase()}

            </div>

            <h2>{user?.user_metadata?.full_name}</h2>

            <p>{user?.email}</p>

            <div className="profile-info">

              <div>

                <strong>Student ID</strong>

                <span>{user?.user_metadata?.student_id}</span>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>

  );
}

export default Profile;