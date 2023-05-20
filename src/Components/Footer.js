import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <p>&copy; 2023</p>
      </div>
      <div className="footer-right">
        <div className="footer-icon">
          <a
            href="https://www.instagram.com/praveen__kumar.24/?next=%2F"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon className="footer-icon2" icon={faInstagram} />
          </a>
        </div>
        <div className="footer-icon">
          <a
            href="https://github.com/praveenfearless08"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon className="footer-icon2" icon={faGithub} />
          </a>
        </div>
        <div className="footer-icon">
          <a
            href="https://www.linkedin.com/in/praveen-kumar-2408/"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon className="footer-icon2" icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
