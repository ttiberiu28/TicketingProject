// SignUp.tsx
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import RestClient from "../../REST/RestClient";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "../CSS/SignUp.css"



const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpStatus, setSignUpStatus] = useState("");

  const navigate = useNavigate();

  const handlePrivacyPolicyClick = () => {
    navigate('/about');
  };

  const handleSignUp = async () => {
    try {
      await RestClient.signUp(username, password, confirmPassword, email, firstName, lastName);
      setSignUpStatus("success");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setSignUpStatus("failure");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block ">
                  <img
                    src="https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
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
                        Create your account
                      </h5>

                      <div className="form-outline mb-4 ">
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


                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value)
                          }
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Confirm Password
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={firstName}
                          onChange={(e) =>
                            setFirstName(e.target.value)
                          }
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          First Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={lastName}
                          onChange={(e) =>
                            setLastName(e.target.value)
                          }
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Last Name
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleSignUp}
                        >
                          Sign Up
                        </button>
                      </div>

                      <p
                        className="mb-5 pb-lg-2"
                        style={{ color: "#393f81" }}
                      ></p>

                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted" onClick={handlePrivacyPolicyClick}>
                        Privacy policy
                      </a>

                      {signUpStatus === "success" && <p className="sign-up-suc lead">Sign up successful!</p>}
                      {signUpStatus === "failure" && (
                        <p className="text-danger lead">Username or Email already exist / format incorrect</p>
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

export default SignUp;
