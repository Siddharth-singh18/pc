import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-bg2.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import "./HomeStyle.css";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <div className="particle-container">
          <Particle />
        </div>
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 className="heading-welcome">
                    Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                We Are <strong className="main-name"> Programming Club</strong>
              </h1>

              <div className="type-container">
                <Type />
              </div>
            </Col>

            <Col md={5} className="home-img">
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid floating"
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
