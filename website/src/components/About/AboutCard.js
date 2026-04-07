import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "left" }}>
            The regional phase of the <span className="purple"> ICPC</span>, the <span className="purple">International Collegiate Programming Contest</span> . A thunderous applause reverberates for each team member, celebrating their invaluable contributions and collaborative brilliance.
          </p>
          <p style={{ textAlign: "left" }}>
            The <span className="purple">ICPC</span> is a prestigious global competition that challenges students to solve complex, real-world problems through the application of algorithmic principles and programming skills. The contest fosters creativity, teamwork, and innovation, and serves as a platform for students to showcase their technical acumen and problem-solving prowess.
          </p>
          <p style={{ textAlign: "left" }}>
            Members of the Team inclued:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Satvik Maheshwari
            </li>
            <li className="about-activity">
              <ImPointRight /> Utkarsh Kumar Yadav
            </li>
            <li className="about-activity">
              <ImPointRight /> Shreyansh Mohan
            </li>
          </ul>

          {/* <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p> */}
          {/* <footer className="blockquote-footer">Soumyajit</footer> */}
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
