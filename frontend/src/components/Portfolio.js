import React, { useState, useEffect } from "react";
import "./assets/Portfolio.css";

const Portfolio = (props) => {
  const [state, setState] = useState({});
  useEffect(() => {
    callAPI();
  });

  const callAPI = () => {
    fetch("http://localhost:9000/FETCHURL")
      .then((res) => res.text())
      .then((res) => setState(res))
      .catch((err) => err);
  };

  return (
    <div class="container">
      <h1 class="d-flex justify-content-center m-2 p-4">Portfolio</h1>

      <h1></h1>
    </div>
  );
};

export default Portfolio;
