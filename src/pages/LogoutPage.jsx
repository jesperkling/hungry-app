import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function LogoutPage() {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Logout</Card.Title>
              <p>You have been logged out.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LogoutPage;
