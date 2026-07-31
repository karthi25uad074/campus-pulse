import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/dashboard");
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
          <span>JOIN THE COMMUNITY</span>

          <h1>
            Help build a
            <br />
            better campus.
          </h1>

          <p>
            Create your Campus Pulse account and become
            part of a smarter, more connected campus.
          </p>
        </div>

        <div className="auth-footer-text">
          One report can make a difference.
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

          <h2>Create your account</h2>

          <p className="auth-subtitle">
            Join Campus Pulse in just a few steps.
          </p>


          <form onSubmit={handleRegister}>

            <div className="input-group">
              <label>Full name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>


            <div className="input-group">
              <label>College email</label>

              <input
                type="email"
                placeholder="you@college.edu"
                required
              />
            </div>


            <div className="input-group">
              <label>Student ID</label>

              <input
                type="text"
                placeholder="Enter your student ID"
                required
              />
            </div>


            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                required
              />
            </div>


            <button className="auth-submit" type="submit">
              Create Account
            </button>

          </form>


          <p className="auth-switch">
            Already have an account?
            <Link to="/login"> Sign in</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;