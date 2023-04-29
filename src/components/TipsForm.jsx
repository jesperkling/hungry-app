import React from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../firebase/index";
import { useForm } from "react-hook-form";

const TipsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onCreateTips = async (data) => {
    await addDoc(collection(database, "tips"), {
      created: serverTimestamp(),
      namn: data.namn,
      email: data.email,
      tips: data.tips,
    });
    alert("Tack för ditt tips!");
    reset();
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>Har du ett tips?</Card.Title>
              </Col>
              <Card.Text>Skicka gärna in ditt tips till oss.</Card.Text>
            </Row>

            <Form onSubmit={handleSubmit(onCreateTips)} noValidate>
              <Form.Group className="mb-3" controlId="namn">
                <Form.Label>Namn</Form.Label>
                <Form.Control
                  {...register("namn", {
                    required: "Namn...",
                    minLength: {
                      value: 2,
                      message: "Namnet måste vara minst 2 tecken långt",
                    },
                  })}
                  size="sm"
                  type="text"
                />
                {errors.namn && <p>{errors.namn.message}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  {...register("email", {
                    required: "Email...",
                    minLength: {
                      value: 2,
                      message: "Email måste vara minst 2 tecken långt",
                    },
                  })}
                  size="sm"
                  type="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="tips">
                <Form.Label>Tips</Form.Label>
                <Form.Control
                  {...register("tips", {
                    required: "Tips...",
                    minLength: {
                      value: 2,
                      message: "Tips måste vara minst 2 tecken långt",
                    },
                  })}
                  size="sm"
                  type="text"
                />
              </Form.Group>
              <Button type="submit">Skicka</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TipsForm;
