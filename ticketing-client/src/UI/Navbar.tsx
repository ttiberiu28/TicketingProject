import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import "./CSS/Navbar.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from "react-router-dom";
import CartModal from './CartElements/CartModal';

export default function NavBar() {
  const { username, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to="/">
            <img src={"https://images.unsplash.com/photo-1635070636690-d887c1a77e7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"}
              alt="home" width="80" height="40" className="d-inline-block align-text-top me-2" />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/locations">Locations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {!isLoggedIn && (
            <button className="btn btn-success btn-rounded" onClick={() => navigate("/login")}>
              Login
            </button>
          )}

          {isLoggedIn && (
            <button className="btn btn-warning btn-rounded" onClick={logout}>
              Logout
            </button>
          )}

          {username && (
            <div className="navbar-text me-3 ml-3">
              Logged in as: <strong>{username}</strong>
            </div>
          )}

          <CartModal />

        </div>
      </div>
    </nav>
  );
}
