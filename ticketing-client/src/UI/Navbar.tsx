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
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLxwEe2Gm7vhJXjbnfm7v9CdRUno7R5xB7w&usqp=CAU"}
              alt="home" width="80" height="40" className="d-inline-block align-text-top me-2 round-img" />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <Link className="nav-link" to="/about">
              <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded">
                <i><b>About</b></i>
              </button>
            </Link>

            <Link className="nav-link" to="/locations">
              <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded">
                <i><b>Locations</b></i>
              </button>
            </Link>

            <Link className="nav-link" to="/events">
              <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded">
                <i><b>Events</b></i>
              </button>
            </Link>

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
              <i><b>Logout</b></i>
            </button>
          )}

          {username && (
            <div className="navbar-text me-3 ml-3">
              <i>Logged in as</i>: <strong>{username}</strong>
            </div>
          )}

          <CartModal />

        </div>
      </div>
    </nav>
  );
}
