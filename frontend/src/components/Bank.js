import React, { useState, useEffect } from "react";
import "./assets/Portfolio.css";

const Bank = (props) => {
  const [state, setState] = useState({});
  const [bruh, setBruh] = useState(1);

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
      <h1 class="d-flex justify-content-center m-2 p-4">Bank</h1>
      <h1>{process.env.REACT_APP_API_ENDPOINT}</h1>
    </div>
  );
};

export default Bank;
