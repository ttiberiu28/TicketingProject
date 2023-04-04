import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import splash from "./Images/im2.jpg";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function Home() {

  const [isCircle, setIsCircle] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const [isWelcomeMessage, setIsWelcomeMessage] = useState(false);

  const handleShapeChange = () => {
    setIsTop(true);
    setIsWelcomeMessage(true);
  };

  const handlePositionChange = () => {
    setIsTop(true);
  };

  return (
    <Container fluid className="p-0">
      <Row>
        <Col className="p-0">
          <div
            className={`position-relative bg-primary ${
              isCircle ? "rounded-circle" : ""
            } ${isTop ? "top-0" : ""}`}
            style={{
              height: isCircle ? "100vh" : "100vh",
              transition: "all 0.5s ease",
              backgroundImage: `url(${splash})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              overflow: "hidden",
            }}
            onClick={handlePositionChange}
          >
            <div className="position-absolute top-50 start-50 translate-middle text-center">
              {isWelcomeMessage ? (
                <h1 className="display-1 font-weight-bold text-white">
                  <Link to="/about">
                    <button className="btn btn-primary rounded-pill p-3" style={{backgroundColor: 'black', fontWeight: 'bold'}}>
                      About
                    </button>
                  </Link>

                  <Link to="/locations">
                    <button className="btn btn-primary rounded-pill p-3" style={{backgroundColor: 'black', fontWeight: 'bold'}}>
                      Location
                    </button>
                  </Link>

                  <Link to="/movies-and-standups">
                    <button className="btn btn-primary rounded-pill p-3" style={{backgroundColor: 'black', fontWeight: 'bold'}}>
                      Events
                    </button>
                  </Link>

                  
                </h1>
              ) : (
                <button className="btn btn-primary rounded-pill p-3" onClick={handleShapeChange} style={{backgroundColor: 'black', fontWeight: 'bold', fontSize: '1.75rem'}}>
                 Ticket-to-GO
                </button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

