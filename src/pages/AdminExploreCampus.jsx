import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
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
  type: "laboratory",
  laboratories: [
    {
      id: "mechanical",
      name: "Mechanical Laboratory",
      shortName: "Mechanical",
      icon: "⚙️",
    },
    {
      id: "eee",
      name: "EEE Laboratory",
      shortName: "EEE",
      icon: "⚡",
    },
    {
      id: "ece",
      name: "ECE Laboratory",
      shortName: "ECE",
      icon: "📡",
    },
    {
      id: "chemistry",
      name: "Chemistry Laboratory",
      shortName: "Chemistry",
      icon: "🧪",
    },
    {
      id: "polymer",
      name: "Polymer Laboratory",
      shortName: "Polymer",
      icon: "🔬",
    },
    {
      id: "physics",
      name: "Physics Laboratory",
      shortName: "Physics",
      icon: "⚛️",
    },
  ],
},
{
  id: 3,
  name: "Department Block A",
  category: "Academic",
  icon: "🏢",
  type: "department-block",
  departments: [
    {
      id: "cse",
      name: "Computer Science & Engineering",
      shortName: "CSE",
      icon: "💻",
    },
    {
      id: "it",
      name: "Information Technology",
      shortName: "IT",
      icon: "💻",
    },
    {
      id: "ece",
      name: "Electronics & Communication Engineering",
      shortName: "ECE",
      icon: "📡",
    },
    {
      id: "ads",
      name: "Artificial Intelligence & Data Science",
      shortName: "ADS",
      icon: "🤖",
    },
    {
      id: "eee",
      name: "Electrical & Electronics Engineering",
      shortName: "EEE",
      icon: "⚡",
    },
  ],
},
{
  id: 4,
  name: "Department Block B",
  category: "Academic",
  icon: "🏢",
  type: "department-block",
  departments: [
    {
      id: "mech",
      name: "Mechanical Engineering",
      shortName: "MECH",
      icon: "⚙️",
    },
    {
      id: "civil",
      name: "Civil Engineering",
      shortName: "CIVIL",
      icon: "🏗️",
    },
    {
      id: "mert",
      name: "Metallurgical Engineering",
      shortName: "MERT",
      icon: "🔩",
    },
  ],
},
 {
  id: 5,
  name: "Canteen",
  category: "Food",
  icon: "🍴",
},
{
  id: 6,
  name: "Stadium",
  category: "Sports",
  icon: "🏟️",
},
{
  id: 7,
  name: "Boys Hostel",
  category: "Hostel",
  icon: "🛏️",
},
{
  id: 8,
  name: "Girls Hostel",
  category: "Hostel",
  icon: "🛏️",
},
{
  id: 9,
  name: "Temple",
  category: "Campus",
  icon: "🛕",
},
{
  id: 10,
  name: "Parents Paradise",
  category: "Campus",
  icon: "🌳",
}
];

function AdminExploreCampus() {
  const navigate = useNavigate();

  const [selectedPlace, setSelectedPlace] = useState(campusPlaces[0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a photo first");
      return;
    }

    try {
      setUploading(true);

      const fileExt = selectedFile.name.split(".").pop();

      const fileName = `${selectedPlace.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}.${fileExt}`;

      const filePath = `campus/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("campus-photos")
        .upload(filePath, selectedFile);

      if (uploadError) {
        console.log("Upload error:", uploadError);
        toast.error("Photo upload failed");
        return;
      }

      const { data } = supabase.storage
        .from("campus-photos")
        .getPublicUrl(filePath);

      console.log("Uploaded photo URL:", data.publicUrl);

      toast.success("Photo uploaded successfully!");

      setSelectedFile(null);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
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
                onClick={() => {
                  setSelectedPlace(place);
                  setSelectedFile(null);
                }}
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


          {/* UPLOAD AREA */}

          <div className="admin-photo-empty">

            <div className="empty-photo-icon">
              📸
            </div>

            <h3>
              Add a photo
            </h3>

            <p>
              Upload a photo of {selectedPlace.name}.
            </p>


            <label className="add-photo-btn">

              + Choose Photo

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />

            </label>


            {selectedFile && (

              <div className="selected-file">

                <p>
                  Selected:
                  <strong>
                    {" "}{selectedFile.name}
                  </strong>
                </p>

                <button
                  className="upload-photo-btn"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading
                    ? "Uploading..."
                    : "Upload Photo"}
                </button>

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminExploreCampus;