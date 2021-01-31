import React, { useState, useEffect } from "react";
import "./assets/Portfolio.css";

const Portfolio = (props) => {
  const [state, setState] = useState({
    user: { username: "", email: "", first_name: "", last_name: "" },
    charity: "",
    nickname: "",
    profile_pic: "/media/default.jpg",
    percentage: 0.5,
    stocks: [],
  });
  const [stocks, setStocks] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const callAPI = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined) {
          setState(data);
        }
      });
  };

  const callStocksAPI = () => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/robinhood/fetch/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== undefined) {
          setStocks(data);
        }
      });
  };

  useEffect(() => {
    callAPI();
    callStocksAPI();
  }, []);

  return (
    <div>
      <h1 className="d-flex justify-content-center m-2 p-4">Portfolio</h1>
      <div className="container">
        <h1>Hello {state.user.username}!</h1>
        <h4>
          Your Charity of Choice:{" "}
          <a href="https://www.unwomen.org/en">UN Women</a> {state.charity}
        </h4>
        <h4>Your earnings: $0.00</h4>
        <h4>Charity earnings: $17745.90</h4>
      </div>
      <br></br>
      <div className="bg-dark text-white">
        <div className="container">
          <h4 className="d-flex justify-content-center m-2 p-4">
            Your Stocks:
          </h4>
          {stocks.map((stock) => {
            return (
              <div
                key={stock.uuid}
                className="m-1 d-inline-block text-dark text-wrap bg-white rounded p-3"
              >
                <h3>Stock: {stock.ticker}</h3>
                <p>Quantity: {stock.quantity}</p>
                <p>Buy Price: ${stock.price}</p>
                <form method="POST" action="/delete/">
                  <input type="submit" value="Sell" class="btn btn-danger" />
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
