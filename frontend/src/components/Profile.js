import React, { useState, useEffect } from "react";
import "./assets/Portfolio.css";

const Profile = (props) => {
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
    <div className="container">
      <h1 className="d-flex justify-content-center m-2 p-4">Profile</h1>
      <h1></h1>
    </div>
  );
};

export default Profile;
