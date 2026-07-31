import { Link } from "react-router-dom";
import "../App.css";

function ReportIssue() {
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


        <form className="report-form">


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
                />

              </div>


              <div className="form-field">

                <label>
                  Category
                  <span>*</span>
                </label>

                <select defaultValue="">
                  <option value="" disabled>
                    Select a category
                  </option>

                  <option>Infrastructure</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Cleanliness</option>
                  <option>Safety</option>
                  <option>Internet & Wi-Fi</option>
                  <option>Other</option>
                </select>

              </div>


              <div className="form-field">

                <label>
                  Priority
                  <span>*</span>
                </label>

                <select defaultValue="">
                  <option value="" disabled>
                    Select priority
                  </option>

                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
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
                ></textarea>

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
                />

              </div>


              <div className="form-field">

                <label>
                  Floor
                </label>

                <input
                  type="text"
                  placeholder="Example: 2nd Floor"
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
                  accept="image/*"
                  hidden
                />

              </label>

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