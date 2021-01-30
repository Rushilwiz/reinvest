import React from "react";
import { NavLink } from "react-router-dom";
import "./assets/Navbar.css";

export default function Navbar(props) {
  const handleBurger = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    nav.classList.toggle("nav-active");

    // animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });

    // burger anim
    burger.classList.toggle("toggle");
  };

  return (
    <nav>
      <div className="brand">
        <NavLink to="/" exact>
          ReInvest
        </NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/services" activeClassName="active-link">
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active-link">
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active-link">
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="burger" onClick={handleBurger}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
