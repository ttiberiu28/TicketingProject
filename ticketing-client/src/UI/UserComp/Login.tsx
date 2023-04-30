import React, { useState } from "react";
import RestClient from "../../REST/RestClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// define the Props interface for the Login component
interface Props {
  onLogin: () => void; // callback to trigger after successful login
}

const Login: React.FC<Props> = ({ onLogin }) => {
  // define state variables for username, password, and login status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // initialize useNavigate hook
  const navigate = useNavigate();

  const { setUsername: setAuthUsername, setIsLoggedIn } = useAuth(); // Rename setUsername to setAuthUsername

  const handlePrivacyPolicyClick = () => {
    navigate('/about');
  };



  // define the handleLogin function for handling the login button click event
  const handleLogin = async () => {
    try {
      await RestClient.login(username, password);
      setLoginStatus("success");
      // trigger the onLogin callback function
      onLogin();

      setAuthUsername(username); // Use setAuthUsername instead of setUsername
      setIsLoggedIn(true);
      localStorage.setItem("username", username); // Store username in localStorage
      localStorage.setItem("isLoggedIn", "true"); // Store isLoggedIn state in localStorage

      setTimeout(() => {
        navigate('/events');
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error(error);

      setLoginStatus("failure");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem", objectFit: "cover", height: "100%" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-solid fa-hippo fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Ticket-to-GO</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={(e) =>
                            setUsername(e.target.value)
                          }
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Username
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p
                        className="mb-5 pb-lg-2"
                        style={{ color: "#393f81" }}
                      >
                        {/* Go to /signup to create account */}
                        Don't have an account?{" "}
                        <a
                          href="#!"
                          onClick={() => navigate("/signup")}
                          style={{ color: "#393f81" }}
                        >
                          Register here
                        </a>
                      </p>

                      <a href="#!" className="small text-muted" onClick={handlePrivacyPolicyClick}>
                        Privacy policy
                      </a>

                      {loginStatus === "success" && (
                        <p className="login-suc lead">Login successful!</p>
                      )}
                      {loginStatus === "failure" && (
                        <p className="text-danger lead ">
                          Incorrect username or password
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;