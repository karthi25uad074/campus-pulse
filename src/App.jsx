import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import MyReports from "./pages/MyReports";

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
          element={<Dashboard />}
        />
        <Route
          path="/report"
          element={<ReportIssue />}
        />
        <Route path="/my-reports" element={<MyReports />} />

      </Routes>

    </HashRouter>
  );
}

export default App;