import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import RestClient from "../REST/RestClient";
import "./CSS/login.css";
import { useNavigate } from "react-router-dom";
import "./CSS/CustomJumbotron.css"
import { useAuth } from "./AuthContext"
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

  const { setUsername: setAuthUsername } = useAuth(); // Rename setUsername to setAuthUsername

  // define the handleLogin function for handling the login button click event
  const handleLogin = async () => {
    try {
      await RestClient.login(username, password);
      setLoginStatus("success");
      // trigger the onLogin callback function
      onLogin();

      setAuthUsername(username); // Use setAuthUsername instead of setUsername

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error(error);

      setLoginStatus("failure");
    }
  };

  return (
    <div className="login-page jumbotron jumbotron-fluid custom-jumbotron">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) =>
              setUsername(e.target.value)
            }
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) =>
              setPassword(e.target.value)
            }
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleLogin}>
          Login
        </Button>
        <Button type="button" onClick={() => navigate('/signup')}>
          Create an account
        </Button>

        {loginStatus === "success" && (
          <p className="login-suc lead">Login successful!</p>
        )}
        {loginStatus === "failure" && (
          <p className="text-danger lead ">Incorrect username or password</p>
        )}
      </Form>
    </div>
  );
};

export default Login;
