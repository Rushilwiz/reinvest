import React, { useState, useEffect } from "react";

const Nav = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link text-white" href="/">
              Portfolio <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="/profile">
              Profile <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="/banking">
              Bank
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="/browse">
              Browse
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
