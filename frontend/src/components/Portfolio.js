import React, { useState, useEffect } from "react";
import "./assets/Portfolio.css";

const Portfolio = (props) => {
  const [state, setState] = useState({
    user: { username: "", first_name: "", last_name: "" },
    charity: "",
    stocks: [],
  });
  useEffect(() => {
    callAPI();
  }, [state]);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjEyMDgyNzM3LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.hmTYX9LO1koP-1OLfY7EYBHZPtviGz2ilBA9qq4MChw`,
    },
  };

  const callAPI = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile`, requestOptions)
      .then((response) => response.json())
      .then((data) => setState(data));
  };

  return (
    <div>
      <h1 className="d-flex justify-content-center m-2 p-4">Portfolio</h1>
      <h1>Hello {state.user.username}!</h1>
      <h4 className="h4">Your Charity of Choice: {state.charity}</h4>

      <div className="bg-dark text-white">
        <h4 className="d-flex justify-content-center m-2 p-4">Your Stocks:</h4>
        {state.stocks.map((stock) => {
          return (
            <div className="d-inline-flex m-1 text-wrap bg-warning rounded p-3">
              <h3>Stock: {stock.ticker}</h3>
              <p>Quantity: {stock.quantity}</p>
              <p>Buy Price: {stock.buy_price}</p>
              <form method="POST" action="/delete/">
                <input type="submit" value="Delete" class="btn btn-danger" />
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
