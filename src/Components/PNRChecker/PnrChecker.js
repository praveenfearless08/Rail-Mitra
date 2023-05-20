import React, { useState } from "react";
import axios from "axios";
import "./PnrChecker.css";
import Navbar from "../Navbar";
import PdfDocument from "./PdfDocument";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain } from "@fortawesome/free-solid-svg-icons";
import irctcicon from "./irctc-icon.png";
import Footer from "../Footer";

function PnrChecker() {
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
        `https://real-time-pnr-status-api-for-indian-railways.p.rapidapi.com/indianrail/${pnr}`,
        options
      )
      .then((response) => {
        setPnrData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching the data.");
        console.log(error);
        setLoading(false);
      });
  };

  const handleReset = () => {
    setPnrData({});
    setLoading(false);
    setError(null);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="detail">
        <h1>PNR Details</h1>
        <label>Enter your PNR no.</label>
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
      <div className="pnr-detail">
        {Object.keys(pnrData).length > 0 && (
          <>
            <div className="pnr-status">
              <div className="status-top">
                <div className="top">
                  <h2>PNR: {pnrData.pnrNumber}</h2>
                </div>
                <div className="download">
                  {Object.keys(pnrData).length > 0 && (
                    <PdfDocument pnrData={pnrData} />
                  )}
                </div>
              </div>
              <div className="status-bottom">
                <h3>
                  {pnrData.trainNumber} - {pnrData.trainName}
                </h3>
                <p>
                  {pnrData.boardingPoint} → {pnrData.destinationStation}
                </p>
                <p>{pnrData.dateOfJourney}</p>
                <p className="paragraph">
                  <span>{pnrData.journeyClass} | </span>
                  <span>{pnrData.quota}</span> | Total Distance -
                  <span> {pnrData.distance} km</span>
                </p>
              </div>
            </div>
            <div className="passenger-status">
              <div className="top">
                <div className="status">
                  <h2>Passenger Status</h2>
                </div>
                <div className="chart">
                  <h3>{pnrData.chartStatus}</h3>
                </div>
              </div>
              <div className="passenger-table">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th>Current Status</th>
                        <th>Booking Status</th>
                        <th>Coach Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pnrData.passengerList &&
                        pnrData.passengerList.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td
                              style={{
                                color:
                                  data.currentStatus === "CNF"
                                    ? "green"
                                    : "red",
                                fontWeight: 700,
                              }}
                            >
                              {data.currentStatus}
                            </td>
                            <td>{data.bookingStatusDetails}</td>
                            <td>{data.currentStatusDetails}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </div>
      <div className="booking">
        <div className="train-ticket">
          <div className="return-ticket">
            <div className="train-icon-div">
              <FontAwesomeIcon className="train-icon" icon={faTrain} />
            </div>
            <h3>Book a return ticket</h3>
          </div>
          <button className="ticket-button">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.irctc.co.in/nget/train-search"
            >
              Book
            </a>
          </button>
        </div>
        <div className="visit">
          <div className="visit-left">
            <div className="irctc-icon">
              <img src={irctcicon} alt="icon" />
            </div>
            <h3>For Faster Experience Visit</h3>
          </div>
          <button>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.irctc.co.in/nget/train-search"
            >
              Visit
            </a>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PnrChecker;
