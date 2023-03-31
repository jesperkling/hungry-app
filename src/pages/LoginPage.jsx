import React from "react";
import { Button, Card, Container, Col, Form, Row } from "react-bootstrap";

function LoginPage() {
  return (
    <Container>
      <Row className="p-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>

              <Form>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required />
                </Form.Group>

                <div className="p-2 text-center">
                  <Button type="submit">Login</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
