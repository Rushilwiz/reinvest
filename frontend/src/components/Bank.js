import React, { useState, useEffect } from "react";
import "./assets/Bank.css";

const Bank = (props) => {
  const [state, setState] = useState({});

  return (
    <div className="container">
      <button type="button" className="btn btn-outline-success robinhood">
        Connect to Robinhood
      </button>
    </div>
  );
};

export default Bank;
