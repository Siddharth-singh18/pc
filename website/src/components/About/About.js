import React, { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { ImPointRight } from "react-icons/im";
import icpc1 from "../../Assets/Projects/icpc1.jpg";
import icpc2 from "../../Assets/Projects/icpc2.jpg";
import icpc3 from "../../Assets/Projects/icpc3.jpg";

// Updated data array with team information for the modal
const galleryData = [
  {
    id: 1,
    image: icpc3,
    caption: "ICPC Asia Amritapuri Regional Contest 2024",
    team: ["Aakarsh Singh", "Ayush Agrawal", "Paras Upadhayay"],
  },
  {
    id: 2,
    image: icpc2,
    caption: "ICPC Asia Chennai Regional Contest 2023",
    team: ["Satvik Maheshwari", "Utkarsh Kumar Yadav", "Shreyansh Mohan"],
  },
  {
    id: 3,
    image: icpc1,
    caption: "ICPC Kanpur Site Regional Contest 2023",
    team: ["Kapish Upadhyay", "Shreyansh Mittal", "Utkarsh Shukla"],
  },
];

function About() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(null);

  const handleShowModal = (data) => {
    setSelectedImageData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageData(null);
  };

  return (
    <Container fluid className="about-section">
      {/* --- ACHIEVEMENTS SECTION --- */}
      <Container>
        <h1 className="project-heading">
          Our <strong className="purple">Achievements</strong>
        </h1>
        <p style={{ color: "white", textAlign: "center" }}>
          Here are a few of my proudest accomplishments in competitive programming.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="achievement-card-col">
            <Card className="achievement-card">
              <Card.Body>
                <div className="achievement-icon">🏆</div>
                <Card.Title>ICPC Regionalist '24</Card.Title>
                <Card.Text>
                  Qualified for the Amritapuri Doublesite Regional Contest.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="achievement-card-col">
            <Card className="achievement-card">
              <Card.Body>
                <div className="achievement-icon">🏅</div>
                <Card.Title>ICPC Regionalist '23</Card.Title>
                <Card.Text>
                  Achieved regionalist status at the Kanpur and Chennai sites.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="achievement-card-col">
            <Card className="achievement-card">
              <Card.Body>
                <div className="achievement-icon">🎖️</div>
                <Card.Title>Team Excellence</Card.Title>
                <Card.Text>
                  Recognized for outstanding teamwork and perseverance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* --- ICPC JOURNEY TEXT SECTION --- */}
      <Container className="icpc-journey-section">
        <Row style={{ justifyContent: "center" }}>
          <Col md={10} lg={8}>
            <h1 className="journey-heading">
              Our Path as <strong className="purple">ICPC Regionalists</strong>
            </h1>
            <Card className="quote-card-view">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p style={{ textAlign: "justify" }}>
                    The <span className="purple">International Collegiate Programming Contest (ICPC)</span> is the world's most prestigious algorithmic programming contest. Our journey has been a testament to our dedication and collaborative spirit.
                  </p>
                  <p className="team-heading">
                    <strong>Team Members Across the Years:</strong>
                  </p>
                  <ul className="team-list">
                    <li><ImPointRight /> <strong>2024 Team:</strong> Aakarsh Singh, Ayush Agrawal, Paras Upadhayay</li>
                    <li><ImPointRight /> <strong>2023 Team #1:</strong> Kapish Upadhyay, Shreyansh Mittal, Utkarsh Shukla</li>
                    <li><ImPointRight /> <strong>2023 Team #2:</strong> Satvik Maheshwari, Utkarsh Kumar Yadav, Shreyansh Mohan</li>
                  </ul>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* --- PHOTO GALLERY GRID SECTION --- */}
      <Container className="gallery-section">
        <h1 className="project-heading">
          Photo <strong className="purple">Gallery</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {galleryData.map((item) => (
            <Col lg={4} md={6} className="gallery-card-col" key={item.id}>
              <Card className="gallery-card" onClick={() => handleShowModal(item)}>
                <Card.Img variant="top" src={item.image} alt={item.caption} />
                <Card.Body>
                  <Card.Text>{item.caption}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
      {/* --- MODAL FOR IMAGE VIEW --- */}
      {selectedImageData && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>{selectedImageData.caption}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedImageData.image} alt={selectedImageData.caption} className="img-fluid modal-image" />
            <div className="modal-team-info">
              <h5 className="purple">Team Members:</h5>
              <ul>
                {selectedImageData.team.map((member, index) => (
                  <li key={index}><ImPointRight /> {member}</li>
                ))}
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* --- STYLES --- */}
      <style>{`
        .about-section {
          position: relative;
          padding-top: 120px;
          padding-bottom: 30px;
          background-image: var(--section-background-color) !important;
          color: white !important;
        }
        .purple { 
          color: var(--imp-text-color) !important; 
        }
        .project-heading, .journey-heading {
          color: white !important;
          font-size: 2.3em !important;
          font-weight: 500 !important;
          text-align: center !important;
          margin-bottom: 30px !important;
        }
        .journey-heading {
          text-align: center !important;
          margin-bottom: 20px !important;
        }

        /* Achievement Cards */
        .achievement-card-col { 
          padding-bottom: 20px !important;
          display: flex !important;
        }
                 .achievement-card {
           background-color: transparent !important;
           color: white !important;
           border: 1px solid rgba(230, 137, 159, 0.637) !important;
           border-radius: 10px !important;
           transition: all 0.3s ease-in-out !important;
           text-align: center !important;
           width: 100% !important;
           opacity: 0.9 !important;
         }
         .achievement-card:hover {
           transform: scale(1.02) !important;
           border-color: rgba(230, 115, 138, 0.883) !important;
         }
        .achievement-icon {
          font-size: 2.5rem !important;
          margin-bottom: 10px !important;
        }

        /* ICPC Journey Section */
        .icpc-journey-section { 
          margin-top: 50px !important; 
        }
        .quote-card-view {
          border: none !important;
          color: white !important;
          background-color: transparent !important;
        }
        .team-heading {
          margin-top: 20px !important;
          color: var(--imp-text-color) !important;
        }
        .team-list {
          list-style: none !important;
          padding-left: 0 !important;
        }
        .team-list li {
          padding-bottom: 10px !important;
        }

        /* Photo Gallery */
        .gallery-section {
          padding-top: 50px !important;
        }
        .gallery-card-col {
          padding-bottom: 30px !important;
          display: flex !important;
        }
                 .gallery-card {
           background-color: transparent !important;
           border: 1px solid rgba(230, 137, 159, 0.637) !important;
           border-radius: 10px !important;
           transition: all 0.3s ease-in-out !important;
           width: 100% !important;
           cursor: pointer !important;
           opacity: 0.9 !important;
         }
         .gallery-card:hover {
           transform: scale(1.02) !important;
           border-color: rgba(230, 115, 138, 0.883) !important;
         }
        .gallery-card .card-img-top {
          border-top-left-radius: 10px !important;
          border-top-right-radius: 10px !important;
          object-fit: contain !important;
          background-color: rgba(17, 16, 16, 0.3) !important;
        }
        .gallery-card .card-body {
          text-align: center !important;
          color: white !important;
          padding: 15px !important;
        }
        .gallery-card .card-text {
          margin-bottom: 0 !important;
          font-size: 0.9em !important;
        }

        /* Modal Styles */
        .modal-content {
          background-color: rgba(17, 16, 16, 0.95) !important;
          color: white !important;
          border: 1px solid rgba(230, 137, 159, 0.637) !important;
          border-radius: 10px !important;
        }
        .modal-header {
          border-bottom: 1px solid rgba(230, 137, 159, 0.637) !important;
        }
        .modal-image {
          width: 100% !important;
          border-radius: 10px !important;
        }
        .modal-team-info {
          margin-top: 20px !important;
        }
        .modal-team-info ul {
          list-style: none !important;
          padding-left: 0 !important;
        }
        .modal-team-info li {
          font-size: 1.1em !important;
          padding: 5px 0 !important;
        }
      `}</style>
    </Container>
  );
}

export default About;
