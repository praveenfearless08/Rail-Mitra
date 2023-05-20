import React, { useContext, useState } from "react";
import "../App.css";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const logoutHandler = () => {
    setUserName("");
    navigate("/");
  };

  const TrainDetailPage = () => {
    navigate("/traindetail");
  };

  const PnrDetailPage = () => {
    navigate("/pnrdetail");
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`nav ${expanded ? "expanded" : "not-expanded"}`}>
      <p className="nav-title">Rail Mitra</p>

      <div className="left-nav">
        <p onClick={TrainDetailPage}>Train Detail</p>
        <p onClick={PnrDetailPage}>Check PNR</p>
      </div>
      <div className="right-nav">
        <div className="user">
          <p>
            Welcome, <span>{userName}</span>
          </p>
        </div>
        <div className="logout">
          <button onClick={logoutHandler}>Sign Out</button>
        </div>
      </div>
      <div className="expand-icon" onClick={toggleExpanded}>
        <FontAwesomeIcon icon={expanded ? faTimes : faBars} />
      </div>
    </div>
  );
}

export default Navbar;
