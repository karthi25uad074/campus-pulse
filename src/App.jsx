import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import MyReports from "./pages/MyReports";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard";
import EditReport from "./pages/EditReport";
import EvidenceViewer from "./pages/EvidenceViewer";
import Leaderboard from "./pages/Leaderboard";
import CampusMap from "./pages/CampusMap";
import AdminExploreCampus from "./pages/AdminExploreCampus";

function App() {
  return (
    <HashRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/report"
  element={
    <ProtectedRoute>
      <ReportIssue />
    </ProtectedRoute>
  }
/><Route
  path="/my-reports"
  element={
    <ProtectedRoute>
      <MyReports />
    </ProtectedRoute>
  }
/>
<Route path="/admin" element={<AdminDashboard />} />

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-report/:id"
  element={<EditReport />}
/>
<Route
  path="/evidence"
  element={<EvidenceViewer />}
/>
<Route path="/leaderboard" element={<Leaderboard />} />
<Route path="/campus-map" element={<CampusMap />} />
<Route
  path="/admin/explore-campus"
  element={<AdminExploreCampus />}
/>
      </Routes>
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "12px",
      background: "#0f172a",
      color: "#fff",
    },
  }}
/>

    </HashRouter>
  );
}

export default App;