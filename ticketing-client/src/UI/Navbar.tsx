import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from './Images/im2.jpg';
import { useAuth } from "./AuthContext";
import "./CSS/Navbar.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



export default function NavBar() {
  const { username } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {username && (
            <div className="navbar-text me-3">
              Logged in as: <strong>{username}</strong>
            </div>
          )}

          {/* Add other right-aligned elements (e.g., icons) here */}
          {/* Replace the href attributes with the appropriate routes, if necessary */}

           <i className="fas fa-solid fa-hippo text-white"></i>
            <i className="fas fa-solid fa-hippo "></i>
            <i className="fas fa-solid fa-hippo "></i>
            <i className="fas fa-solid fa-hippo "></i>
            <i className="fas fa-solid fa-hippo text-white"></i>
            <i className="fas fa-solid fa-hippo text-white"></i>
            <i className="fas fa-solid fa-hippo text-white"></i>
            <i className="fas fa-solid fa-hippo text-white"></i>
            <i className="fas fa-solid fa-hippo text-white"></i>
            <i className="fas fa-solid fa-hippo text-white"></i>
            <i className="fas fa-solid fa-hippo text-white"></i>
            <i className="fas fa-solid fa-hippo text-white"></i>

            <div className="dropdown">
              <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-shopping-cart text-white"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/some-news">Some news</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/another-news">Another news</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/something-else">Something else here</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
      );
    }