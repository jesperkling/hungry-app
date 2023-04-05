import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container fluid>
      <Row
        className="justify-content-center align-items-center"
        style={{
          backgroundImage: 'url("../src/assets/images/bild-4.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "100vh",
          height: "100vh",
        }}
      >
        <Col
          xs={10}
          md={8}
          lg={6}
          className="d-flex justify-content-center p-5"
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
