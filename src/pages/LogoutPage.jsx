import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function LogoutPage() {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Logga ut</Card.Title>
              <p>Du är nu utloggad.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LogoutPage;