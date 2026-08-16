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

  const size = priority === "High" ? 22 : 18;

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

function MapFocus({ location, userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 18, {
        duration: 1.2,
      });
    }
  }, [location, map]);

  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 18, {
        duration: 1.2,
      });
    }
  }, [userLocation, map]);

  return null;
}

function CampusMap() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPlace, setSelectedPlace] = useState(null);

  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [selectedPlacePhotos, setSelectedPlacePhotos] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  useEffect(() => {
  if (
    !selectedPlacePhotos ||
    !selectedPlacePhotos.photos ||
    selectedPlacePhotos.photos.length <= 1
  ) {
    return;
  }

  const slideshow = setInterval(() => {
    setActivePhotoIndex((prev) => {
      const total = selectedPlacePhotos.photos.length;

      return prev === total - 1 ? 0 : prev + 1;
    });
  }, 4000);

  return () => clearInterval(slideshow);
}, [selectedPlacePhotos]);

  const locationCoordinates = {
    "Boys Hostel": [9.6710556, 77.9639999],
    Stadium: [9.6727778, 77.9634722],
    "Main Block": [9.6728333, 77.9653611],
    "Girls Hostel": [9.67425, 77.9638889],
    Laboratory: [9.6728333, 77.9645],
    Departments: [9.6735833, 77.9646111],
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

  photos: [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=1200",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
],
},
    {
      id: 4,
      name: "Girls Hostel",
      category: "Hostel",
      icon: "🏠",
      position: [9.67425, 77.9638889],
    },
    {
      id: 5,
      name: "Laboratory",
      category: "Academic",
      icon: "🧪",
      position: [9.6728333, 77.9645],
    },
    {
      id: 6,
      name: "Departments_block-A",
      category: "Academic",
      icon: "🏢",
      position: [9.6735833, 77.9646111],
    },
    {
  id: 7,
  name: "Temple",
  category: "Spiritual",
  icon: "🛕",
  position: [9.6724722, 77.9659722],
},
{
  id: 8,
  name: "Parents Paradise",
  category: "Recreation",
  icon: "🌴",
  position: [9.6734167, 77.96575],
},
{
  id: 9,
  name: "Canteen",
  category: "Food",
  icon: "🍴",
  position: [9.6724444, 77.9640833],
},
{
  id: 10,
  name: "Departments_block-B",
  category: "Academic",
  icon: "🏢",
  position: [9.6718889, 77.9645],
},
  ];

  const campusBounds = campusPlaces.map(
    (place) => place.position
  );

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from("issues")
        .select(
          "id, title, description, category, priority, location, status, created_at"
        )
        .order("created_at", {
          ascending: false,
        });

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
      alert(
        "Location is not supported by this browser."
      );
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

  const filteredPlaces = campusPlaces.filter(
    (place) => {
      const matchesCategory =
        activeCategory === "All" ||
        place.category === activeCategory;

      const matchesSearch =
        place.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );
    }
  );

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

        <MapFocus
          location={selectedPlace}
          userLocation={userLocation}
        />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {/* USER LOCATION */}

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

        {/* CAMPUS PLACES */}

        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            position={place.position}
            icon={placeIcon(place.icon)}
            eventHandlers={{
              click: () =>
                setSelectedPlace(
                  place.position
                ),
            }}
          >
            <Popup>
  <div className="place-popup">

    <div className="place-popup-icon">
      {place.icon}
    </div>

    <div className="place-popup-content">
      <strong>
        {place.name}
      </strong>

      <span>
        {place.category}
      </span>

      <button
  className="view-photos-btn"
  onClick={() => {
    setSelectedPlacePhotos(place);
    setActivePhotoIndex(0);
  }}
>
  📸 View Photos
</button>
    </div>

  </div>
</Popup>
          </Marker>
        ))}

        {/* CAMPUS MAIN MARKER */}

        <Marker
          position={[
            9.6728,
            77.9659,
          ]}
          icon={campusIcon}
        >
          <Popup>
            <div className="campus-popup">

              <div className="popup-icon">
                🏫
              </div>

              <div>
                <strong>
                  Kamaraj College of Engineering
                  & Technology
                </strong>

                <span>
                  S.P.G.C. Nagar,
                  K. Vellakulam
                </span>

                <small>
                  Near Virudhunagar,
                  Tamil Nadu
                </small>
              </div>

            </div>
          </Popup>
        </Marker>

        {/* ISSUE MARKERS */}

        {!loadingIssues &&
          issues.map((issue) => {
            const position =
              locationCoordinates[
                issue.location
              ];

            if (!position) {
              return null;
            }

            return (
              <Marker
                key={issue.id}
                position={position}
                icon={issueIcon(
                  issue.status,
                  issue.priority
                )}
              >
                <Popup>
                  <div className="campus-popup">

                    <div className="popup-icon">
                      {issue.status ===
                      "Resolved"
                        ? "🟢"
                        : issue.status ===
                          "In Progress"
                        ? "🟠"
                        : "🔴"}
                    </div>

                    <div>
                      <strong>
                        {issue.title}
                      </strong>

                      <span>
                        {issue.location}
                      </span>

                      <small>
                        Status:{" "}
                        {issue.status}
                      </small>

                      <small>
                        Priority:{" "}
                        {issue.priority}
                      </small>
                    </div>

                  </div>
                </Popup>
              </Marker>
            );
          })}

      </MapContainer>

      {/* TOP BAR */}

      <div className="map-topbar">

        <Link
          to="/"
          className="map-brand"
        >
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
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

          <kbd>⌘ K</kbd>

        </div>

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
              Discover campus
              locations and facilities.
            </p>

          </div>

          <div className="live-indicator">
            <span></span>
            LIVE
          </div>

        </div>

        {/* CATEGORY FILTER */}

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
  "Food",
  "Spiritual",
  "Recreation",
].map((category) => (
              <button
                key={category}
                className={
                  activeCategory ===
                  category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
              >
                {category}
              </button>
            ))}

          </div>

        </div>

        {/* MY LOCATION */}

        <div className="map-actions">

          <button
            className="map-location-btn"
            onClick={getMyLocation}
            disabled={locationLoading}
          >
            {locationLoading
              ? "⏳"
              : "📍"}

            <span>
              {locationLoading
                ? "Locating..."
                : "My Location"}
            </span>
          </button>

        </div>

        {/* CAMPUS INFO */}

        <div className="campus-info-card">

          <div className="info-card-top">

            <span>📍</span>

            <div>
              <strong>
                KCET Campus
              </strong>

              <small>
                Virudhunagar,
                Tamil Nadu
              </small>
            </div>

          </div>

          <div className="info-divider"></div>

          <div className="info-stats">

            <div>
              <strong>
                Campus
              </strong>

              <span>
                Explore
              </span>
            </div>

            <div>
              <strong>
                Map
              </strong>

              <span>
                Live
              </span>
            </div>

          </div>

        </div>

      </aside>
{selectedPlacePhotos && (
  <div
    className="place-photo-modal"
    onClick={() =>
      setSelectedPlacePhotos(null)
    }
  >
    <div
      className="place-photo-modal-content"
      onClick={(e) =>
        e.stopPropagation()
      }
    >
      <button
        className="photo-modal-close"
        onClick={() =>
          setSelectedPlacePhotos(null)
        }
      >
        ✕
      </button>

      <div className="photo-gallery">

  {selectedPlacePhotos.photos?.length > 0 ? (
    <>
      <img
  key={activePhotoIndex}
  src={selectedPlacePhotos.photos[activePhotoIndex]}
  alt={selectedPlacePhotos.name}
  className="photo-gallery-image"
/>
<div className="photo-place-overlay">
  <div className="photo-place-overlay-category">
    {selectedPlacePhotos.category}
  </div>

  <div className="photo-place-overlay-name">
    {selectedPlacePhotos.name}
  </div>

  <div className="photo-place-overlay-description">
    Explore this campus location
  </div>
</div>

      {selectedPlacePhotos.photos.length > 1 && (
        <>

          <button
            className="photo-nav photo-prev"
            onClick={() =>
              setActivePhotoIndex(
                (prev) =>
                  prev === 0
                    ? selectedPlacePhotos.photos.length - 1
                    : prev - 1
              )
            }
          >
            ‹
          </button>

          <button
            className="photo-nav photo-next"
            onClick={() =>
              setActivePhotoIndex(
                (prev) =>
                  prev ===
                  selectedPlacePhotos.photos.length - 1
                    ? 0
                    : prev + 1
              )
            }
          >
            ›
          </button>

          <div className="photo-counter">
            {activePhotoIndex + 1} /{" "}
            {selectedPlacePhotos.photos.length}
          </div>
          <div className="photo-thumbnails">
  {selectedPlacePhotos.photos.map((photo, index) => (
    <button
      key={index}
      className={`photo-thumbnail ${
        activePhotoIndex === index ? "active" : ""
      }`}
      onClick={() => setActivePhotoIndex(index)}
    >
      <img
        src={photo}
        alt={`${selectedPlacePhotos.name} ${index + 1}`}
      />
    </button>
  ))}
</div>

        </>
      )}

    </>
  ) : (
    <div className="photo-no-image">
      <span>
        {selectedPlacePhotos.icon}
      </span>

      <strong>
        No photos available
      </strong>

      <p>
        Photos will be added soon.
      </p>
    </div>
  )}

</div>

      <div className="photo-modal-info">
        <span>
          {selectedPlacePhotos.category}
        </span>

        <h2>
          {selectedPlacePhotos.name}
        </h2>

        <p>
          Campus photos will appear here.
        </p>
      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default CampusMap;