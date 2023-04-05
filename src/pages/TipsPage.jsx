import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function TipsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [tip, setTip] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Name: ${name} Email: ${email} Restaurant: ${restaurant} Tip: ${tip}`
    );
    setName("");
    setEmail("");
    setRestaurant("");
    setTip("");
  };

  return (
    <Container>
      <Form className="p-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Namn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ditt namn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Din email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRestaurant">
          <Form.Label>Matställe</Form.Label>
          <Form.Control
            type="text"
            placeholder="Namn på matställe..."
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTip">
          <Form.Label>Tips</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Skriv ditt tips här..."
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="danger" type="submit">
          Skicka in
        </Button>
      </Form>
    </Container>
  );
}

export default TipsPage;
