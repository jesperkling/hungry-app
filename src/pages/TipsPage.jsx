import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../firebase";

function TipsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tips, setTips] = useState("");
  const [tipsList, setTipsList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(database, "tips"), {
        name: name,
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

  // update tipsList
  useEffect(() => {
    async function getTips() {
      const tipsRef = collection(database, "tips");
      const snapshots = await getDocs(tipsRef);
      const tips = snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(tips);
      setTipsList(tips);
    }
    getTips();
  }, []);

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

        <Form.Group className="mb-3" controlId="formTips">
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
      <Container>
        <h3>Senaste Tipsen</h3>
        <ul>
          {tipsList.slice(0, 5).map((tip) => (
            <li key={tip.id}>{tip.tips}</li>
          ))}
        </ul>
      </Container>
    </Container>
  );
}

export default TipsPage;
