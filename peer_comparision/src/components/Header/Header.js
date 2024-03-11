import React, { useEffect, useState } from "react";
import "./Header.css"
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Extract the pathname from the location object
    const pathname = location.pathname;
    // Set the active link based on the pathname
    setActiveLink(pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-sm" style={{ backgroundColor: "#293444" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="./pokemon_logo.avif" alt="" style={{ width: '7rem' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link-item ${activeLink === '/' && 'active'}`} to="/">
                Pokémons
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link-item ${activeLink === '/comparisionPage' && 'active'}`} to="/comparisionPage">
                Compare
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link-item ${activeLink === '/about' && 'active'}`} to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
