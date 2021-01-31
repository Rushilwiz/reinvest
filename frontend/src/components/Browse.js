import React, { useState, useEffect } from "react";
import "./assets/Browse.css";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);
const Browse = (props) => {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [days, setDays] = useState(100);
  const [stock, setStock] = useState("INTC");
  useEffect(() => {
    fetchStock();
  }, [stock]);
  let stockChartXValuesFunction = [];
  let stockChartYValuesFunction = [];
  const fetchStock = () => {
    const KEY = "DTPB5IBDMPNE65TY";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=compact&apikey=${KEY}`;

    const handleData = (data) => {
      for (var date in data["Time Series (Daily)"]) {
        stockChartXValuesFunction.push(date);
        stockChartYValuesFunction.push(
          data["Time Series (Daily)"][date]["1. open"]
        );
      }
      setStockChartXValues(stockChartXValuesFunction);
      setStockChartYValues(stockChartYValuesFunction);
    };

    fetch(API_CALL)
      .then((response) => response.json())
      .then((data) => handleData(data));
  };

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center m-2 p-4">Browse</h1>
      <input
        class="form-control"
        name="stock"
        type="text"
        id="stocksearch"
        placeholder="Search stock..."
      />
      <button
        class="btn"
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
      <div class="d-inline bg-dark text-white">
        <button class="btn" onClick={() => setDays(5)}>
          5D
        </button>
        <button class="btn" onClick={() => setDays(14)}>
          14D
        </button>
        <button class="btn" onClick={() => setDays(30)}>
          30D
        </button>
        <button class="btn" onClick={() => setDays(100)}>
          100D
        </button>
      </div>
      <div>
        <br></br>
        <form method="POST" action="/browse/">
          <div id="form-group">
            <label class="h4">Amount:</label>
            <input
              class="form-control"
              name="username"
              type="number"
              step="0.01"
            />
          </div>
          <br />
          <input class="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Browse;
