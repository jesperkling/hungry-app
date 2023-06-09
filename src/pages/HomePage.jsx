import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import backgroundImage from "/src/assets/images/bild-4.jpg";

function HomePage() {
  return (
    <Container fluid>
      <Row
        className="justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "90vh",
          height: "90vh",
          paddingTop: "10px",
        }}
      >
        <Col
          xs={10}
          md={8}
          lg={6}
          className="d-flex justify-content-center p-3"
        >
          <Card className="p-5 text-center" style={{ opacity: 0.9 }}>
            <Card.Title
              className="mb-4 fw-bold"
              style={{ fontSize: "3em", letterSpacing: "2px" }}
            >
              Italifind
            </Card.Title>
            <Card.Subtitle className="mb-5 text-muted">
              Upptäck äkta italienska smaker - Hitta de bästa matställena nu!
            </Card.Subtitle>
            <Link to="/map">
              <Button variant="danger" size="lg">
                Upptäck
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
