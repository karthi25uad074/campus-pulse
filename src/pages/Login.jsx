import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import "../App.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (error) {

  toast.error("Invalid email or password");

  return;

}

const {
  data: { user },
} = await supabase.auth.getUser();
toast.success("Welcome back!");

if (user.email === "admin@campuspulse.com") {

  navigate("/admin");

} else {

  navigate("/dashboard");

}
};

  return (
    <div className="auth-page">

      <div className="auth-left">
        <div className="auth-brand">
          <div className="logo-icon">CP</div>
          <span>
            Campus<span className="logo-highlight">Pulse</span>
          </span>
        </div>

        <div className="auth-message">
          <span>WELCOME BACK</span>

          <h1>
            Your campus.
            <br />
            Your voice.
          </h1>

          <p>
            Sign in to report issues, track progress,
            and stay connected with your campus community.
          </p>
        </div>

        <div className="auth-footer-text">
          Making campuses better, together.
        </div>
      </div>


      <div className="auth-right">

        <div className="auth-box">

          <div className="mobile-logo">
            <div className="logo-icon">CP</div>
            <span>
              Campus<span className="logo-highlight">Pulse</span>
            </span>
          </div>

          <h2>Welcome back</h2>

          <p className="auth-subtitle">
            Enter your details to access your account.
          </p>
        <button
  type="button"
  className="login-back-btn"
  onClick={() => navigate("/campus-map")}
>
  ← Back to Campus Map
</button>


          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label>Email address</label>
             <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
             />
            </div>


            <div className="input-group">
              <div className="password-label">
                <label>Password</label>
                <a href="#forgot">Forgot password?</a>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>


            <button className="auth-submit" type="submit">
              Sign In
            </button>

          </form>


          <div className="auth-divider">
            <span>or</span>
          </div>


          <p className="auth-switch">
            Don't have an account?
            <Link to="/register"> Create account</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;