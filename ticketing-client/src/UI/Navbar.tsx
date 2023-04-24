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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top gradient-custom-navbar">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
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

            <li className="nav-item custom-dropdown-item">
              <Link className="nav-link" to="/about">
                <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded gradient-custom-button">
                  <i className='but-text'><b>About</b></i>
                </button>
              </Link>
            </li>

            <li className="nav-item custom-dropdown-item">
              <Link className="nav-link" to="/locations">
                <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded gradient-custom-button">
                  <i className='but-text'><b>Locations</b></i>
                </button>
              </Link>
            </li>

            <li className="nav-item custom-dropdown-item">
              <Link className="nav-link" to="/events">
                <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded gradient-custom-button">
                  <i className='but-text'><b>Events</b></i>
                </button>
              </Link>
            </li>

            <li className="nav-item custom-dropdown-item">
              <Link className="nav-link" to={{
                pathname: '/events',
                search: '?filter=concerts',
              }}>
                <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded gradient-custom-button">
                  <i className='but-text'><b>Concerts</b></i>
                </button>
              </Link>
            </li>

            <li className="nav-item custom-dropdown-item">
              <Link className="nav-link" to={{
                pathname: '/events',
                search: '?filter=movies',
              }}>
                <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded gradient-custom-button">

                  <i className='but-text'><b>Movies</b></i>
                </button>
              </Link>
            </li>

            <li className="nav-item custom-dropdown-item">
              <Link className="nav-link" to={{
                pathname: '/events',
                search: '?filter=standUps',
              }}>
                <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded gradient-custom-button">
                  <i className='but-text'><b>Standups</b></i>
                </button>
              </Link>
            </li>

            <li className="nav-item custom-dropdown-item">
              <Link className="nav-link" to="/locations">
                <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded gradient-custom-button">
                  <i className='but-text'><b>Locations</b></i>
                </button>
              </Link>
            </li>

            <li className="nav-item custom-dropdown-item">
              <Link className="nav-link" to="/offers">
                <button type="button" className="btn btn-outline-danger btn-secondary btn-rounded gradient-custom-button">
                  <i className='but-text'><b>Movie Offers</b></i>
                </button>
              </Link>
            </li>

          </ul>
        </div>

        <div className="d-flex align-items-center">
          {!isLoggedIn && (
            <button className="btn btn-success btn-rounded btn-outline-dark" onClick={() => navigate("/login")}>
              Login
            </button>
          )}

          {isLoggedIn && (
            <button className="btn btn-danger btn-rounded btn-outline-dark" onClick={logout}>
              <i><b>Logout</b></i>
            </button>
          )}

          {username && (
            <div className="navbar-text me-3 ml-3">
              <i className='logged2-text'>Logged in as: </i> <strong className='logged-text'><i>{username}</i></strong>
            </div>
          )}

          <CartModal />

        </div>
      </div>
    </nav >
  );
}