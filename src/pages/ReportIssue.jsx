import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import "../App.css";
function ReportIssue() {
  const navigate = useNavigate();

const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const [priority, setPriority] = useState("");
const [description, setDescription] = useState("");
const [building, setBuilding] = useState("");
const [floor, setFloor] = useState("");
const [location, setLocation] = useState("");
const [evidenceFile, setEvidenceFile] = useState(null);
const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    toast.error("Please login first.");
    return;
  }

  let evidenceUrl = null;

  // Upload evidence image
  if (evidenceFile) {

    const fileExt = evidenceFile.name.split(".").pop();

    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("evidence")
      .upload(fileName, evidenceFile);

    if (uploadError) {
      console.log(uploadError);
      toast.error("Failed to upload evidence");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("evidence")
      .getPublicUrl(fileName);

    evidenceUrl = publicUrlData.publicUrl;
  }

  // Save report
  const { error } = await supabase
    .from("issues")
    .insert([
      {
        title,
        description,
        category,
        priority,
        location: `${building} ${floor} ${location}`,
        user_id: user.id,
        status: "Pending",
        evidence_url: evidenceUrl,
        student_name: user.user_metadata?.full_name || "Unknown",
    student_email: user.email,
    student_id: user.user_metadata?.student_id || "Not provided",
      },
    ]);

  if (error) {
    console.log(error);
    toast.error("Failed to submit report!");
    return;
  }

  toast.success("Report submitted successfully!");

  navigate("/dashboard");
};
  return (
    <div className="report-page">

      <div className="report-header">

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>

        <div className="report-brand">
          <div className="report-logo">CP</div>

          <span>
            Campus<span>Pulse</span>
          </span>
        </div>

      </div>


      <main className="report-container">

        <div className="report-intro">

          <p>REPORT A CAMPUS ISSUE</p>

          <h1>Tell us what needs attention.</h1>

          <span>
            Help us improve your campus by reporting an issue.
            Provide as much information as possible.
          </span>

        </div>


        <form className="report-form" onSubmit={handleSubmit}>

          {/* ISSUE DETAILS */}

          <section className="form-card">

  <div className="form-card-title">

    <div className="form-number">
      01
    </div>

    <div>
      <h2>Issue Details</h2>
      <p>
        Tell us about the problem you noticed.
      </p>
    </div>

  </div>


  <div className="form-grid">

    <div className="form-field full">

      <label>
        Issue title
        <span>*</span>
      </label>

      <input
        type="text"
        placeholder="Example: Broken classroom fan"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

    </div>


    <div className="form-field">

      <label>
        Category
        <span>*</span>
      </label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >

        <option value="" disabled>
          Select a category
        </option>

        <option value="Infrastructure">Infrastructure</option>
        <option value="Electrical">Electrical</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Cleanliness">Cleanliness</option>
        <option value="Safety">Safety</option>
        <option value="Internet & Wi-Fi">Internet & Wi-Fi</option>
        <option value="Other">Other</option>

      </select>

    </div>


    <div className="form-field">

      <label>
        Priority
        <span>*</span>
      </label>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >

        <option value="" disabled>
          Select priority
        </option>

        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>

      </select>

    </div>


    <div className="form-field full">

      <label>
        Description
        <span>*</span>
      </label>

      <textarea
        rows="6"
        placeholder="Describe the issue clearly. What happened? How does it affect students?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

    </div>


  </div>

</section>


{/* LOCATION */}


<section className="form-card">


  <div className="form-card-title">

    <div className="form-number">
      02
    </div>

    <div>
      <h2>Location</h2>

      <p>
        Help the campus team find the issue quickly.
      </p>
    </div>

  </div>


  <div className="form-grid">


    <div className="form-field">

      <label>
        Building / Block
        <span>*</span>
      </label>

      <input
        type="text"
        placeholder="Example: Block A"
        value={building}
        onChange={(e)=>setBuilding(e.target.value)}
      />

    </div>



    <div className="form-field">

      <label>
        Floor
      </label>

      <input
        type="text"
        placeholder="Example: 2nd Floor"
        value={floor}
        onChange={(e)=>setFloor(e.target.value)}
      />

    </div>



    <div className="form-field full">

      <label>
        Specific location
        <span>*</span>
      </label>

      <input
        type="text"
        placeholder="Example: Room 204, near the main entrance"
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
      />

    </div>


  </div>


</section>
          {/* PHOTO */}

          <section className="form-card">

            <div className="form-card-title">

              <div className="form-number">
                03
              </div>

              <div>
                <h2>Add Evidence</h2>

                <p>
                  A photo can help the team understand the issue better.
                </p>
              </div>

            </div>


            <div className="upload-box">

              <div className="upload-icon">
                ↑
              </div>

              <h3>Upload an image</h3>

              <p>
                Drag and drop or choose an image from your device.
              </p>

              <label className="upload-button">

                Choose Image

               <input
  type="file"
  accept="image/png,image/jpeg,image/jpg"
  hidden
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setEvidenceFile(file);
  }}
/>

              </label>
              {evidenceFile && (
  <p className="selected-file">
    📎 {evidenceFile.name}
  </p>
)}

              <small>
                PNG, JPG or JPEG • Maximum 5MB
              </small>

            </div>

          </section>


          {/* ACTIONS */}

          <div className="form-actions">

            <Link
              to="/dashboard"
              className="cancel-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="submit-report-button"
            >
              Submit Report
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default ReportIssue;