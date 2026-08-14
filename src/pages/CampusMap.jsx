import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";

import { supabase } from "../lib/supabase";
import "leaflet/dist/leaflet.css";
import "../styles/campus-map.css";

const campusPosition = [9.6728, 77.9659];

const campusIcon = L.divIcon({
  className: "campus-main-marker",
  html: `
    <div class="main-marker-pulse"></div>
    <div class="main-marker-pin">📍</div>
  `,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -48],
});
const issueIcon = (status) => {
  let color = "#ef4444";

  if (status === "In Progress") {
    color = "#f59e0b";
  }

  if (status === "Resolved") {
    color = "#22c55e";
  }

  return L.divIcon({
    className: "issue-map-marker",
    html: `
      <div
        style="
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid white;
          box-shadow: 0 3px 12px rgba(0,0,0,.4);
        "
      ></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};
const placeIcon = (emoji) => {
  return L.divIcon({
    className: "campus-place-marker",

    html: `
      <div class="place-marker">
        <span>${emoji}</span>
      </div>
    `,

    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });
};

function CampusMap() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(true);
   const campusPosition = [9.6728, 77.9659];
   const locationCoordinates = {
  "Main Block": [9.6730, 77.9658],
  "Library": [9.6727, 77.9662],
  "Canteen": [9.6725, 77.9655],
  "Ground": [9.6734, 77.9654],
  "Lab": [9.6729, 77.9664],
  "Parking": [9.6723, 77.9660],
};
const campusPlaces = [
  {
    id: 1,
    name: "Main Block",
    category: "Academic",
    icon: "🏫",
    position: [9.6730, 77.9658],
  },
  {
    id: 2,
    name: "Library",
    category: "Academic",
    icon: "📚",
    position: [9.6727, 77.9662],
  },
  {
    id: 3,
    name: "Laboratory",
    category: "Academic",
    icon: "🧪",
    position: [9.6729, 77.9664],
  },
  {
    id: 4,
    name: "Canteen",
    category: "Food",
    icon: "🍴",
    position: [9.6725, 77.9655],
  },
  {
    id: 5,
    name: "Sports Ground",
    category: "Sports",
    icon: "🏟️",
    position: [9.6734, 77.9654],
  },
  {
    id: 6,
    name: "Parking",
    category: "Transport",
    icon: "🅿️",
    position: [9.6723, 77.9660],
  },
];
   useEffect(() => {
  const fetchIssues = async () => {
    const { data, error } = await supabase
      .from("issues")
      .select(
        "id, title, description, category, priority, location, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.log("ISSUES ERROR:", error);
      setLoadingIssues(false);
      return;
    }

    setIssues(data || []);
    setLoadingIssues(false);
  };

  fetchIssues();
}, []);

  return (
    <div className="campus-explorer">

      {/* MAP */}

      <MapContainer
        center={campusPosition}
        zoom={16}
        scrollWheelZoom={true}
        zoomControl={false}
        className="full-campus-map"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {campusPlaces.map((place) => (
  <Marker
    key={place.id}
    position={place.position}
    icon={placeIcon(place.icon)}
  >
    <Popup>
      <div className="place-popup">

        <div className="place-popup-icon">
          {place.icon}
        </div>

        <div>
          <strong>{place.name}</strong>

          <span>{place.category}</span>

          <small>
            Campus location
          </small>
        </div>

      </div>
    </Popup>
  </Marker>
))}
        <Marker
          position={campusPosition}
          icon={campusIcon}
        >

            {issues.map((issue) => {
  const position = locationCoordinates[issue.location];

  if (!position) return null;

  return (
    <Marker
      key={issue.id}
      position={position}
      icon={issueIcon(issue.status)}
    >
      <Popup>
        <div className="campus-popup">

          <div className="popup-icon">
            {issue.status === "Resolved"
              ? "🟢"
              : issue.status === "In Progress"
              ? "🟠"
              : "🔴"}
          </div>

          <div>
            <strong>{issue.title}</strong>

            <span>
              {issue.location}
            </span>

            <small>
              Status: {issue.status}
            </small>

            <small>
              Priority: {issue.priority}
            </small>

          </div>

        </div>
      </Popup>
    </Marker>
  );
})}
          <Popup>
            <div className="campus-popup">

              <div className="popup-icon">🏫</div>

              <div>
                <strong>
                  Kamaraj College of Engineering
                  & Technology
                </strong>

                <span>
                  S.P.G.C. Nagar, K. Vellakulam
                </span>

                <small>
                  Near Virudhunagar, Tamil Nadu
                </small>
              </div>

            </div>
          </Popup>
        </Marker>

      </MapContainer>


      {/* DARK MAP OVERLAY */}

      <div className="map-dark-overlay"></div>


      {/* TOP BAR */}

      <div className="map-topbar">

        <Link to="/" className="map-brand">
          <div className="map-brand-icon">
            CP
          </div>

          <span>
            Campus<span>Pulse</span>
          </span>
        </Link>


        <div className="map-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search campus locations..."
          />

          <kbd>⌘ K</kbd>

        </div>


        <button
          className="map-profile"
          onClick={() => navigate("/profile")}
        >
          <div className="map-profile-avatar">
            K
          </div>

          <span>Profile</span>
        </button>

      </div>


      {/* BACK BUTTON */}

      <button
        className="map-back-button"
        onClick={() => navigate("/")}
      >
        <span>←</span>
        Back
      </button>


      {/* LEFT FLOATING PANEL */}

      <aside className="map-control-panel">

        <div className="map-panel-header">

          <div>
            <span className="map-eyebrow">
              EXPLORE CAMPUS
            </span>

            <h1>
              Campus Map
            </h1>

            <p>
              Discover locations and campus
              facilities.
            </p>
          </div>

          <div className="live-indicator">
            <span></span>
            LIVE
          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="map-actions">

          <button
            onClick={() => navigate("/report")}
            className="map-report-button"
          >
            <div className="action-icon">
              +
            </div>

            <div>
              <strong>Report an Issue</strong>
              <small>
                Report something near you
              </small>
            </div>

            <span>→</span>
          </button>


          <button
            className="map-location-button"
            onClick={() => {
              navigator.geolocation?.getCurrentPosition(
                (position) => {
                  console.log(
                    position.coords.latitude,
                    position.coords.longitude
                  );
                }
              );
            }}
          >
            <div className="location-icon">
              ◎
            </div>

            <div>
              <strong>My Location</strong>
              <small>
                Find your current position
              </small>
            </div>

            <span>⌖</span>
          </button>

        </div>


        {/* CAMPUS INFO */}

        <div className="campus-info-card">

          <div className="info-card-top">
            <span>📍</span>

            <div>
              <strong>KCET Campus</strong>
              <small>Virudhunagar, Tamil Nadu</small>
            </div>
          </div>

          <div className="info-divider"></div>

          <div className="info-stats">

            <div>
              <strong>Campus</strong>
              <span>Explore</span>
            </div>

            <div>
              <strong>Map</strong>
              <span>Live</span>
            </div>

          </div>

        </div>


        {/* LEGEND */}

        <div className="map-legend">

          <div className="legend-title">
            Map Legend
          </div>

          <div className="legend-item">
            <span className="legend-dot issue-high"></span>
            Active Issues
          </div>

          <div className="legend-item">
            <span className="legend-dot issue-progress"></span>
            In Progress
          </div>

          <div className="legend-item">
            <span className="legend-dot issue-resolved"></span>
            Resolved
          </div>

        </div>

      </aside>


      {/* RIGHT MAP CONTROLS */}

      <div className="map-floating-controls">

        <button title="My location">
          ◎
        </button>

        <button title="Fullscreen">
          ⛶
        </button>

      </div>


      {/* BOTTOM INFO */}

      <div className="map-bottom-bar">

        <div className="map-coordinates">
          <span className="coordinate-dot"></span>

          <span>
            K. Vellakulam · Virudhunagar
          </span>
        </div>


        <div className="map-bottom-actions">

          <button
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/my-reports")}
          >
            My Reports
          </button>

        </div>

      </div>

    </div>
  );
}

export default CampusMap;