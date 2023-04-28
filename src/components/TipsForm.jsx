import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase/index";

const TipsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tips, setTips] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(database, "tips"), {
        namn: name,
        email: email,
        tips: tips,
      });
      alert("Tack för ditt tips!");
      setName("");
      setEmail("");
      setTips("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Container>
      <Form className="p-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="namn">
          <Form.Label>Namn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ditt namn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Din email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tips">
          <Form.Label>Tips</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Skriv ditt tips här..."
            value={tips}
            onChange={(e) => setTips(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="danger" type="submit">
          Skicka in
        </Button>
      </Form>
    </Container>
  );
};

export default TipsForm;
