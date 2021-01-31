import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./assets/Browse.css";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);
const Browse = (props) => {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [days, setDays] = useState(30);
  const [stock, setStock] = useState("INTC");
  const [quantity, setQuantity] = useState(0);
  const history = useHistory();

  let stockChartXValuesList = [];
  let stockChartYValuesList = [];

  const fetchStock = () => {
    const KEY = "DTPB5IBDMPNE65TY";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=compact&apikey=${KEY}`;

    const handleData = (data) => {
      for (var date in data["Time Series (Daily)"]) {
        stockChartXValuesList.push(date);
        stockChartYValuesList.push(
          data["Time Series (Daily)"][date]["1. open"]
        );
      }
      setStockChartXValues(stockChartXValuesList);
      setStockChartYValues(stockChartYValuesList);
    };

    fetch(API_CALL)
      .then((response) => response.json())
      .then((data) => handleData(data));
  };

  useEffect(() => {
    fetchStock();
  }, [stock]);

  const onSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ticker: stock, quantity: quantity }),
    };
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/stock/create`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="portfolio container">
      <h1 className="d-flex justify-content-center m-2 p-4">Browse</h1>
      <input
        className="form-control"
        name="stock"
        type="text"
        id="stocksearch"
        placeholder="Search stock..."
      />
      <h4 className="h4">
        ${(stockChartYValues[0] - stockChartYValues[1]).toFixed(2)}
      </h4>
      <h4 className="h4">
        {(
          ((stockChartYValues[0] - stockChartYValues[1]) /
            stockChartYValues[1]) *
          100
        ).toFixed(2)}
        %
      </h4>
      <button
        className="btn"
        onClick={() => setStock(document.getElementById("stocksearch").value)}
      >
        Search
      </button>
      <Plot
        data={[
          {
            x: stockChartXValues.filter((x, index) => index <= days),
            y: stockChartYValues.filter((y, index) => index <= days),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 720, height: 440, title: `${stock} ` }}
      />
      <div className="d-inline bg-dark text-white">
        <button className="btn" onClick={() => setDays(5)}>
          5D
        </button>
        <button className="btn" onClick={() => setDays(14)}>
          14D
        </button>
        <button className="btn" onClick={() => setDays(30)}>
          30D
        </button>
        <button className="btn" onClick={() => setDays(100)}>
          100D
        </button>
      </div>
      <div>
        <br></br>
        <form onSubmit={onSubmit}>
          <div id="form-group">
            <label className="h4">Amount:</label>
            <input
              className="form-control"
              name="username"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <br />
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Browse;
