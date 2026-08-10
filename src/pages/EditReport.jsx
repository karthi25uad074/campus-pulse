import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import "../styles/dashboard.css";

function EditReport() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    location: "",
  });

  useEffect(() => {

    const fetchReport = async () => {

      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        toast.error("Unable to load report");
        navigate("/my-reports");
        return;
      }

      setFormData({
        title: data.title || "",
        category: data.category || "",
        priority: data.priority || "",
        description: data.description || "",
        location: data.location || "",
      });

      setLoading(false);
    };

    fetchReport();

  }, [id, navigate]);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("issues")
      .update({
        title: formData.title,
        category: formData.category,
        priority: formData.priority,
        description: formData.description,
        location: formData.location,
      })
      .eq("id", id);

    if (error) {

      console.log(error);
      toast.error("Failed to update report");
      setSaving(false);
      return;

    }

    toast.success("Report updated successfully!");

    navigate("/my-reports");

  };


  if (loading) {
    return (
      <div className="dashboard-layout">

        <Sidebar />

        <main className="dashboard-main">

          <DashboardNavbar />

          <section className="dashboard-content">
            <h2>Loading report...</h2>
          </section>

        </main>

      </div>
    );
  }


  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardNavbar />

        <section className="dashboard-content">

          <div className="welcome-section">

            <div className="welcome-left">

              <span className="welcome-badge">
                Edit Report
              </span>

              <h1>
                Update your report
              </h1>

              <p>
                Make changes to your submitted campus issue.
              </p>

            </div>

          </div>


          <div className="dashboard-section">

            <form onSubmit={handleSubmit}>

              <div className="input-group">

                <label>Issue Title</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="input-group">

                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Cleanliness">Cleanliness</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Other">Other</option>

                </select>

              </div>


              <div className="input-group">

                <label>Priority</label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>

                </select>

              </div>


              <div className="input-group">

                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  required
                />

              </div>


              <div className="input-group">

                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>


              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >

                <button
                  type="button"
                  className="view-btn"
                  onClick={() => navigate("/my-reports")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </section>

      </main>

    </div>

  );

}

export default EditReport;