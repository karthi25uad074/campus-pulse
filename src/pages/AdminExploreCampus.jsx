import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin-explore.css";

const campusPlaces = [
  {
    id: 1,
    name: "Main Block",
    category: "Academic",
    icon: "🏫",
  },
  {
    id: 2,
    name: "Laboratory",
    category: "Academic",
    icon: "🧪",
  },
  {
    id: 3,
    name: "Departments",
    category: "Academic",
    icon: "🏢",
  },
  {
    id: 4,
    name: "Canteen",
    category: "Food",
    icon: "🍴",
  },
  {
    id: 5,
    name: "Stadium",
    category: "Sports",
    icon: "🏟️",
  },
  {
    id: 6,
    name: "Boys Hostel",
    category: "Hostel",
    icon: "🛏️",
  },
  {
    id: 7,
    name: "Girls Hostel",
    category: "Hostel",
    icon: "🛏️",
  },
  {
    id: 8,
    name: "Temple",
    category: "Campus",
    icon: "🛕",
  },
  {
    id: 9,
    name: "Parents Paradise",
    category: "Campus",
    icon: "🌳",
  },
];

function AdminExploreCampus() {
  const navigate = useNavigate();

  const [selectedPlace, setSelectedPlace] = useState(campusPlaces[0]);

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


      {/* CONTENT */}

      <main className="admin-explore-content">

        {/* PLACE LIST */}

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
                  selectedPlace.id === place.id
                    ? "active"
                    : ""
                }`}
                onClick={() => setSelectedPlace(place)}
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


        {/* PHOTO MANAGEMENT */}

        <section className="admin-photo-panel">

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
                Manage photos displayed in Campus Explorer.
              </p>
            </div>

            <div className="photo-count">
              0 Photos
            </div>

          </div>


          {/* EMPTY PHOTO STATE */}

          <div className="admin-photo-empty">

            <div className="empty-photo-icon">
              📸
            </div>

            <h3>
              No photos added yet
            </h3>

            <p>
              Add photos of {selectedPlace.name} to
              display them in the student Campus Explorer.
            </p>

            <button className="add-photo-btn">
              + Add Photo
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminExploreCampus;