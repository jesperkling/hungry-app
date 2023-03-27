import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center">
        <Col
          xs={10}
          md={8}
          lg={6}
          className="d-flex justify-content-center p-5"
        >
          <div className="text-center">
            <h1 className="p-5">HungryApp</h1>
            <h3 className="p-5 text-muted">
              Find the perfect restaurant for your cravings
            </h3>
            <Link to="/map">
              <Button variant="primary" size="lg">
                Find Restaurants
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
