// SignUp.tsx
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import RestClient from "../REST/RestClient";
import { useNavigate } from "react-router-dom";
import "./CSS/SignUp.css";
import "./CSS/CustomJumbotron.css"


const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpStatus, setSignUpStatus] = useState("");

  const navigate = useNavigate();

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
    <div className="sign-up-page jumbotron jumbotron-fluid custom-jumbotron">
      <Form className="sign-up-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFirstName(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLastName(e.target.value)}
          />
        </Form.Group>
  
        <Button variant="primary" type="button" onClick={handleSignUp}>
          Sign Up
        </Button>
        {signUpStatus === "success" && <p className="sign-up-suc lead">Sign up successful!</p>}
        {signUpStatus === "failure" && (
          <p className="text-danger lead">Username or Email already exist.</p>
        )}
      </Form>
    </div>
  );
  
};

export default SignUp;
