import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function TrainDetail() {
  const [pnr, setPnr] = useState("");
  const [pnrData, setPnrData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePnrChange = (event) => {
    setPnr(event.target.value);
  };

  const fetchPnrStatus = () => {
    setLoading(true);
    setError(null);

    const options = {
      headers: {
        "X-RapidAPI-Key": "8ff4b7a696mshcf00e5469d09b31p17ab17jsn50d58963757d",
        "X-RapidAPI-Host":
          "real-time-pnr-status-api-for-indian-railways.p.rapidapi.com",
      },
    };

    axios
      .get(
        `https://real-time-pnr-status-api-for-indian-railways.p.rapidapi.com/trainman/${pnr}`,
        options
      )
      .then((response) => {
        setPnrData(response.data);
        console.log(response.data);
        setLoading(false); // Move setLoading inside the .then block
      })
      .catch((error) => {
        setError("An error occurred while fetching the data.");
        console.log(error);
        setLoading(false); // Move setLoading inside the .catch block
      });
  };

  const handleReset = () => {
    setPnrData({});
    // setPnr("");
    setLoading(false);
    setError(null);
  };

  return (
    <div className="app">
      <Navbar />
      {/* <div className="main"> */}
      {/* <h1>{userName}</h1> */}
      <div className="detail">
        <h1>Train Details</h1>
        <label>Enter train no.</label>

        <input type="text" value={pnr} onChange={handlePnrChange} />
        <div className="button">
          <button className="submit" onClick={fetchPnrStatus}>
            Check
          </button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="data">
          <div className="train-name data-card">
            <p>
              <span>Train Name: </span> {pnrData.train_name}
            </p>
          </div>
          <div className="train-origin data-card">
            <p>
              <span>From Station: </span> {pnrData.origin}
            </p>
          </div>
          <div className="train-dest data-card">
            <p>
              <span>To Station: </span>
              {pnrData.dest}
            </p>
          </div>
          <div className="train-pantry data-card">
            <p>
              <span>Total Pantry Car: </span>

              {pnrData.train_detail && pnrData.train_detail.pantry_car
                ? pnrData.train_detail.pantry_car
                : ""}
            </p>
          </div>
          <div className="train-class data-card">
            <p>
              <span>Available Class: </span> {pnrData.train_detail?.class}
            </p>
          </div>
        </div>
      )}
      <Footer />
    </div>
    // </div>
  );
}

export default TrainDetail;
