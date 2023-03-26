import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function Tips() {
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRestaurant">
          <Form.Label>Restaurant</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the name of the restaurant"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTip">
          <Form.Label>Tip</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Tips;
