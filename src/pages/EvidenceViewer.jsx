import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function EvidenceViewer() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const imageUrl = params.get("url");

  if (!imageUrl) {
    return (
      <div className="evidence-page">
        <h2>Evidence not found</h2>
        <button onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="evidence-page">

      <div className="evidence-page-header">
        <button
          className="evidence-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2>📷 Issue Evidence</h2>
      </div>

      <div className="evidence-full-container">
        <img
          src={imageUrl}
          alt="Issue evidence"
          className="evidence-full-image"
        />
      </div>

    </div>
  );
}

export default EvidenceViewer;