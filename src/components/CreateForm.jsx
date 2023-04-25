import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { useAuthContext } from "../contexts/Authentication";

const CreateForm = () => {
  const { currentUser } = useAuthContext();
  const [namn, setNamn] = useState("");
  const [gatuadress, setGatuadress] = useState("");
  const [gatunummer, setGatunummer] = useState("");
  const [postnummer, setPostnummer] = useState("");
  const [ort, setOrt] = useState("");
  const [beskrivning, setBeskrivning] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [typ, setTyp] = useState("");
  const [utbud, setUtbud] = useState("");
  const [epost, setEpost] = useState("");
  const [hemsida, setHemsida] = useState("");
  const [telefon, setTelefon] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Skapar nytt matställe...");

    const newPlace = {
      namn,
      gatuadress,
      gatunummer,
      postnummer,
      ort,
      beskrivning,
      cuisine,
      typ,
      utbud,
      epost,
      hemsida,
      telefon,
      facebook,
      instagram,
    };

    try {
      const docRefResult = await addDoc(
        collection(database, "places"),
        newPlace
      );
      console.log("Document written with ID: ", docRefResult.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    handleReset();
  };

  const handleReset = () => {
    setNamn("");
    setGatuadress("");
    setGatunummer("");
    setPostnummer("");
    setOrt("");
    setBeskrivning("");
    setCuisine("");
    setTyp("");
    setUtbud("");
    setEpost("");
    setHemsida("");
    setTelefon("");
    setFacebook("");
    setInstagram("");
  };

  return (
    <div style={{ overflow: "auto" }}>
      <Form className="p-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="namn">
          <Form.Control
            type="text"
            placeholder="Namn..."
            value={namn}
            onChange={(e) => setNamn(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="gatuadress">
          <Form.Control
            type="text"
            placeholder="Gatuadress..."
            value={gatuadress}
            onChange={(e) => setGatuadress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="gatunummer">
          <Form.Control
            type="number"
            placeholder="Gatunummer..."
            value={gatunummer}
            onChange={(e) => setGatunummer(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="postnummer">
          <Form.Control
            type="number"
            placeholder="Postnummer..."
            value={postnummer}
            onChange={(e) => setPostnummer(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="ort">
          <Form.Control
            type="text"
            placeholder="Ort..."
            value={ort}
            onChange={(e) => setOrt(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="beskrivning">
          <Form.Control
            type="text"
            placeholder="Beskrivning..."
            value={beskrivning}
            onChange={(e) => setBeskrivning(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="cuisine">
          <Form.Control
            type="text"
            placeholder="Cuisine..."
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="typ">
          <Form.Select value={typ} onChange={(e) => setTyp(e.target.value)}>
            <option>Välj kategori...</option>
            <option value="restaurang">Restaurang</option>
            <option value="cafe">Café</option>
            <option value="fast-food">Fast Food</option>
            <option value="food-truck">Food Truck</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2" controlId="utbud">
          <Form.Select value={utbud} onChange={(e) => setUtbud(e.target.value)}>
            <option>Välj utbud...</option>
            <option value="lunch">Lunch</option>
            <option value="after-work">After Work</option>
            <option value="middag">Middag</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2" controlId="e-post">
          <Form.Control
            type="email"
            placeholder="E-Post..."
            value={epost}
            onChange={(e) => setEpost(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="hemsida">
          <Form.Control
            type="text"
            placeholder="Hemsida..."
            value={hemsida}
            onChange={(e) => setHemsida(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="telefon">
          <Form.Control
            type="number"
            placeholder="Telefonnummer..."
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="facebook">
          <Form.Control
            type="text"
            placeholder="Facebook..."
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="instagram">
          <Form.Control
            type="text"
            placeholder="Instagram..."
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="m-3">
          Skapa
        </Button>
        <Button
          onClick={handleReset}
          variant="danger"
          type="reset"
          className="m-3"
        >
          Rensa
        </Button>
      </Form>
    </div>
  );
};

export default CreateForm;
