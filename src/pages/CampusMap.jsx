import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  CircleMarker,
  useMap,
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
const issueIcon = (status, priority) => {
  let color = "#ef4444";

  if (status === "In Progress") {
    color = "#f59e0b";
  }

  if (status === "Resolved") {
    color = "#22c55e";
  }

  let size = 18;

  if (priority === "High") {
    size = 22;
  }

  return L.divIcon({
    className: "issue-map-marker",

    html: `
      <div
        class="issue-marker-dot"
        style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
        "
      >
        <span>!</span>
      </div>
    `,

    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
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
function MapFocus({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 18, {
        duration: 1.2,
      });
    }
  }, [location, map]);

  return null;
}
function CampusMap() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
const [searchTerm, setSearchTerm] = useState("");
const [selectedPlace, setSelectedPlace] = useState(null);
const [userLocation, setUserLocation] = useState(null);
const [locationLoading, setLocationLoading] = useState(false);
  const [loadingIssues, setLoadingIssues] = useState(true);
   const campusPosition = [9.6728, 77.9659];
  const locationCoordinates = {
  "Boys Hostel": [9.6710556, 77.9639999],
  "Stadium": [9.6727778, 77.9634722],
  "Main Block": [9.6728333, 77.9653611],
  "Girls Hostel": [9.6742500, 77.9638889],
  "Laboratory": [9.6728333, 77.9645000],
  "Departments": [9.6735833, 77.9646111],
};
const campusPlaces = [
  {
    id: 1,
    name: "Boys Hostel",
    category: "Hostel",
    icon: "🏠",
    position: [9.6710556, 77.9639999],
  },

  {
    id: 2,
    name: "Stadium",
    category: "Sports",
    icon: "🏟️",
    position: [9.6727778, 77.9634722],
  },

  {
    id: 3,
    name: "Main Block",
    category: "Academic",
    icon: "🏫",
    position: [9.6728333, 77.9653611],
  },

  {
    id: 4,
    name: "Girls Hostel",
    category: "Hostel",
    icon: "🏠",
    position: [9.6742500, 77.9638889],
  },

  {
    id: 5,
    name: "Laboratory",
    category: "Academic",
    icon: "🧪",
    position: [9.6728333, 77.9645000],
  },

  {
    id: 6,
    name: "Departments",
    category: "Academic",
    icon: "🏢",
    position: [9.6735833, 77.9646111],
  },
];
const campusBounds = campusPlaces.map((place) => place.position);
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
const getMyLocation = () => {
  if (!navigator.geolocation) {
    alert("Location is not supported by this browser.");
    return;
  }

  setLocationLoading(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = [
        position.coords.latitude,
        position.coords.longitude,
      ];

      setUserLocation(coords);
      setLocationLoading(false);
    },
    (error) => {
      console.log("LOCATION ERROR:", error);
      setLocationLoading(false);

      alert(
        "Unable to get your location. Please allow location permission."
      );
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};
const filteredPlaces = campusPlaces.filter((place) => {
  const matchesCategory =
    activeCategory === "All" ||
    place.category === activeCategory;

  const matchesSearch =
    place.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});

  return (
    <div className="campus-explorer">

      {/* MAP */}

      <MapContainer
  bounds={campusBounds}
  boundsOptions={{
    padding: [50, 50],
  }}
  zoomControl={false}
  className="campus-leaflet-map"
>
<MapFocus location={selectedPlace} />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />
        <MapFocus
  location={selectedPlace}
  userLocation={userLocation}
/>
{userLocation && (
  <CircleMarker
    center={userLocation}
    radius={8}
    pathOptions={{
      color: "#ffffff",
      fillColor: "#2563eb",
      fillOpacity: 1,
      weight: 3,
    }}
  >
    <Popup>
      <strong>You are here</strong>
    </Popup>
  </CircleMarker>
)}

        {filteredPlaces.map((place) => (
  <Marker
  key={place.id}
  position={place.position}
  icon={placeIcon(place.icon)}
  eventHandlers={{
    click: () => setSelectedPlace(place.position),
  }}
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
     icon={issueIcon(issue.status, issue.priority)}
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
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
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
<div className="map-category-filter">

  <div className="filter-title">
    Explore
  </div>

  <div className="filter-buttons">

    {[
      "All",
      "Academic",
      "Hostel",
      "Sports",
    ].map((category) => (
      <button
        key={category}
        className={
          activeCategory === category
            ? "active"
            : ""
        }
        onClick={() => setActiveCategory(category)}
      >
        {category}
      </button>
    ))}

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

           <button
  className="map-location-btn"
  onClick={getMyLocation}
  disabled={locationLoading}
>
  {locationLoading ? "⏳" : "📍"}
  <span>
    {locationLoading
      ? "Locating..."
      : "My Location"}
  </span>
</button>

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