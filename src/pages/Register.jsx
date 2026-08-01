import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../App.css";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        student_id: studentId,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Registration Successful! Please check your email to verify your account.");
  navigate("/login");
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>


            <div className="input-group">
              <label>College email</label>

              <input
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
             />
            </div>


            <div className="input-group">
              <label>Student ID</label>

              <input
                type="text"
                placeholder="Enter your student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
               />
            </div>


            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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