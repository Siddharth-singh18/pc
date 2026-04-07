// import React from "react";
// function Pre(props) {
//   return <div id={props.load ? "preloader" : "preloader-none"}></div>;
// }

// export default Pre;

import React from "react";
import "./Pre.css";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../Assets/home-bg2.svg";
import Particle from "./Particle";
import Home2 from "./Home/Home2";
import logo from "../Assets/Projects/logo.png";


function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"} className="preloader" style={{ backgroundColor: "#0c0513" }}>
      {props.load && (
        <div className="new-spinner">
          <img src={logo} alt="Loading" style={{ width: "20%", height: "auto" }} />
        </div>
      )}
    </div>
  );
}

export default Pre;