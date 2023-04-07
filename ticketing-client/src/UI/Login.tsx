// export default Login;
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import RestClient from "../REST/RestClient";

interface Props {
  onLogin: () => void;
  onLoginError: () => void;
}

const Login: React.FC<Props> = ({ onLogin, onLoginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await RestClient.login(username, password);
      onLogin();
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid username or password");
      onLoginError();
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
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
            onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
              setPassword(e.target.value)
            }
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
