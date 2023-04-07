import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from './Images/im2.jpg';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-bottom navbar-dark bg-dark">
            
              <Link className="navbar-brand" to="/">
                <img src={homeIcon} alt="home" width="40" height="60" className="d-inline-block align-text-top me-2" />
              </Link>
            
              <Link className="navbar-brand" to="/">
                <a className="navbar-brand" href="#">Ticket-to-GO</a>
              </Link>

              <Link className="nav-link" to="/about">
                <a className="navbar-brand" href="#">About</a>
              </Link>
            
              <Link className="nav-link" to="/locations">
                <a className="navbar-brand" href="#">Locations</a>
              </Link>
            
              <Link className="nav-link" to="/events">
                <a className="navbar-brand" href="#">Events</a>
              </Link>
            
              <Link className="nav-link" to="/login">
                <a className="navbar-brand" href="#">Login</a>
              </Link>
              
            
          
    </nav>
  );
}

