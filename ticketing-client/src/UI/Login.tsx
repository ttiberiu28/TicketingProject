// export default Login;
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import RestClient from "../REST/RestClient";
import "./CSS/login.css";

interface Props {
  onLogin: () => void; // callback to trigger after successful login
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async () => {
    try {
      await RestClient.login(username, password);
      setLoginStatus("success");
      onLogin(); // trigger the callback to indicate successful login
    } catch (error) {
      console.error(error);
      setLoginStatus("failure");
      // show error message to the user
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
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
        {loginStatus === "success" && (
          <p className="text-success">Login successful!</p>
        )}
        {loginStatus === "failure" && (
          <p className="text-danger">Login failed. Please try again.</p>
        )}
      </Form>
    </div>
  );
};

export default Login;
