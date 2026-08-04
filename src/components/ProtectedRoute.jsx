import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const checkUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);

    };

    checkUser();

  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>;
  }

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;