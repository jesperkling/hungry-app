import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { database } from "../firebase/index";

const EditTipsForm = ({ tips, onTipsUpdated, selectedTip }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onUpdateTips = async (data) => {
    await updateDoc(doc(database, "tips", tips.id), {
      created: serverTimestamp(),
      namn: data.namn,
      email: data.email,
      tips: data.tips,
    });

    onTipsUpdated();
  };

  return (
    <>
      <Row>
        <Col>
          <h2>Redigera tips</h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(onUpdateTips)} noValidate>
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
            defaultValue={selectedTip.namn}
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
            defaultValue={selectedTip.email}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="tips">
          <Form.Label>Tips</Form.Label>
          <Form.Control
            {...register("tips", {
              required: "Tips...",
              minLength: {
                value: 2,
                message: "Tipset måste vara minst 2 tecken långt",
              },
            })}
            size="sm"
            type="text"
            defaultValue={selectedTip.tips}
          />
          {errors.beskrivning && <p>{errors.beskrivning.message}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Spara
        </Button>
      </Form>
    </>
  );
};

export default EditTipsForm;
