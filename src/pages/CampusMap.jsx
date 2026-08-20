import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin-explore.css";

const campusPlaces = [
  {
    id: "main-block",
    name: "Main Block",
    category: "Academic",
    icon: "🏫",
    type: "place",
  },

  {
    id: "laboratory",
    name: "Laboratory",
    category: "Academic",
    icon: "🧪",
    type: "group",
    children: [
      { id: "mechanical", name: "Mechanical", icon: "⚙️" },
      { id: "eee", name: "EEE", icon: "⚡" },
      { id: "ece", name: "ECE", icon: "📡" },
      { id: "chemistry", name: "Chemistry", icon: "🧪" },
      { id: "polymer", name: "Polymer", icon: "🔬" },
      { id: "physics", name: "Physics", icon: "⚛️" },
    ],
  },

  {
    id: "department-a",
    name: "Department Block A",
    category: "Academic",
    icon: "🏢",
    type: "group",
    children: [
      { id: "cse", name: "CSE", icon: "💻" },
      { id: "it", name: "IT", icon: "💻" },
      { id: "ece-dept", name: "ECE", icon: "📡" },
      { id: "ads", name: "ADS", icon: "🤖" },
      { id: "eee-dept", name: "EEE", icon: "⚡" },
    ],
  },

  {
    id: "department-b",
    name: "Department Block B",
    category: "Academic",
    icon: "🏢",
    type: "group",
    children: [
      { id: "mech", name: "MECH", icon: "⚙️" },
      { id: "civil", name: "CIVIL", icon: "🏗️" },
      { id: "mert", name: "METR", icon: "🔩" },
    ],
  },

  {
    id: "canteen",
    name: "Canteen",
    category: "Food",
    icon: "🍴",
    type: "place",
  },

  {
    id: "stadium",
    name: "Stadium",
    category: "Sports",
    icon: "🏟️",
    type: "place",
  },

  {
    id: "boys-hostel",
    name: "Boys Hostel",
    category: "Hostel",
    icon: "🛏️",
    type: "place",
  },

  {
    id: "girls-hostel",
    name: "Girls Hostel",
    category: "Hostel",
    icon: "🛏️",
    type: "place",
  },

  {
    id: "temple",
    name: "Temple",
    category: "Campus",
    icon: "🛕",
    type: "place",
  },

  {
    id: "parents-paradise",
    name: "Parents Paradise",
    category: "Campus",
    icon: "🌳",
    type: "place",
  },
];

function AdminExploreCampus() {
  const navigate = useNavigate();

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setSelectedChild(null);
  };

  const handleChildClick = (child) => {
    setSelectedChild(child);
  };

  return (
    <div className="admin-explore-page">

      {/* HEADER */}

      <header className="admin-explore-header">

        <div>

          <button
            className="admin-back-btn"
            onClick={() => navigate("/admin")}
          >
            ← Back to Dashboard
          </button>

          <div className="admin-explore-title">

            <span>🗺️</span>

            <div>
              <h1>Explore Campus</h1>

              <p>
                Manage campus locations and their photos.
              </p>
            </div>

          </div>

        </div>

        <div className="admin-live-status">
          <span></span>
          Campus Explorer
        </div>

      </header>


      {/* MAIN CONTENT */}

      <main className="admin-explore-content">

        {/* LEFT SIDE */}

        <section className="admin-place-panel">

          <div className="panel-heading">

            <div>
              <h2>Campus Places</h2>

              <p>
                Select a location to manage
              </p>
            </div>

            <span>
              {campusPlaces.length} Places
            </span>

          </div>


          <div className="admin-place-list">

            {campusPlaces.map((place) => (

              <button
                key={place.id}
                className={`admin-place-card ${
                  selectedPlace?.id === place.id
                    ? "active"
                    : ""
                }`}
                onClick={() => handlePlaceClick(place)}
              >

                <div className="place-card-icon">
                  {place.icon}
                </div>

                <div className="place-card-info">

                  <strong>
                    {place.name}
                  </strong>

                  <small>
                    {place.category}
                  </small>

                </div>

                <span className="place-card-arrow">
                  →
                </span>

              </button>

            ))}

          </div>

        </section>


        {/* RIGHT SIDE */}

        <section className="admin-photo-panel">

          {!selectedPlace && (

            <div className="admin-photo-empty">

              <div className="empty-photo-icon">
                🗺️
              </div>

              <h3>
                Select a campus place
              </h3>

              <p>
                Choose a location from the left to manage
                its photos.
              </p>

            </div>

          )}


          {selectedPlace && (

            <>

              {/* PLACE HEADER */}

              <div className="photo-panel-header">

                <div>

                  <span>
                    {selectedPlace.category}
                  </span>

                  <h2>
                    {selectedPlace.icon}{" "}
                    {selectedPlace.name}
                  </h2>

                  <p>
                    Manage photos displayed in Campus
                    Explorer.
                  </p>

                </div>

              </div>


              {/* SUB CATEGORIES */}

              {selectedPlace.type === "group" && (

                <div className="subcategory-section">

                  <div className="subcategory-heading">

                    <h3>
                      Select Category
                    </h3>

                    <p>
                      Choose an individual location
                      to manage its photos.
                    </p>

                  </div>


                  <div className="subcategory-grid">

                    {selectedPlace.children.map(
                      (child) => (

                        <button
                          key={child.id}
                          className={`subcategory-card ${
                            selectedChild?.id === child.id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handleChildClick(child)
                          }
                        >

                          <span className="subcategory-icon">
                            {child.icon}
                          </span>

                          <span className="subcategory-name">
                            {child.name}
                          </span>

                          <span className="subcategory-arrow">
                            →
                          </span>

                        </button>

                      )
                    )}

                  </div>

                </div>

              )}
              {selectedPlace.type === "group" && (
  <div className="subcategory-section">

    <div className="subcategory-heading">
      <h3>Select Department</h3>
      <p>
        Choose a department to view and manage its photos.
      </p>
    </div>

    <div className="subcategory-grid">

      {selectedPlace.children.map((child) => (
        <button
          key={child.id}
          className={`subcategory-card ${
            selectedChild?.id === child.id ? "selected" : ""
          }`}
          onClick={() => setSelectedChild(child)}
        >

          <div className="subcategory-icon">
            {child.icon}
          </div>

          <div className="subcategory-info">
            <strong>{child.name}</strong>
            <span>View Photos →</span>
          </div>

        </button>
      ))}

    </div>

  </div>
)}


              {/* PHOTO AREA */}

              {(selectedPlace.type === "place" ||
                selectedChild) && (

                <div className="photo-management-area">

                  <div className="photo-selected-info">

                    <div>

                      <span>
                        {selectedChild
                          ? selectedPlace.name
                          : selectedPlace.category}
                      </span>

                      <h3>
                        {selectedChild
                          ? `${selectedChild.icon} ${selectedChild.name}`
                          : `${selectedPlace.icon} ${selectedPlace.name}`}
                      </h3>

                    </div>

                    <span className="photo-count">
                      0 Photos
                    </span>

                  </div>


                  <div className="admin-photo-empty">

                    <div className="empty-photo-icon">
                      📸
                    </div>

                    <h3>
                      No photos added yet
                    </h3>

                    <p>
                      Add photos for this location.
                    </p>

                    <button
                      className="add-photo-btn"
                      onClick={() =>
                        alert("Photo upload will be added next.")
                      }
                    >
                      + Add Photo
                    </button>

                  </div>

                </div>

              )}

            </>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminExploreCampus;