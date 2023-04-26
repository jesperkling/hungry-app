import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import { Form, Button, Container } from "react-bootstrap";

function EditPlacePage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    namn: "",
    gatuadress: "",
    gatunummer: "",
    postnummer: "",
    ort: "",
    beskrivning: "",
    cuisine: "",
    typ: "",
    utbud: "",
    epost: "",
    hemsida: "",
    telefon: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    const getPlaceData = async () => {
      const placeRef = doc(database, "places", id);
      const docSnap = await getDoc(placeRef);
      if (docSnap.exists()) {
        const placeData = docSnap.data();
        setFormData(placeData);
      } else {
        console.log("No such document!");
      }
    };
    getPlaceData();
  }, [id]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const placeRef = doc(database, "places", id);
      await updateDoc(placeRef, formData);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <Container>
      <h1>Edit Place</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Label>Namn</Form.Label>
        <Form.Group controlId="namn">
          <Form.Control
            type="text"
            name="namn"
            value={formData.namn}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="gatuadress">
          <Form.Label>Gatuadress</Form.Label>
          <Form.Control
            type="text"
            name="gatuadress"
            value={formData.gatuadress}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="gatunummer">
          <Form.Label>Gatunummer</Form.Label>
          <Form.Control
            type="number"
            name="gatunummer"
            value={formData.gatunummer}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="postnummer">
          <Form.Label>Postnummer</Form.Label>
          <Form.Control
            type="number"
            name="postnummer"
            value={formData.postnummer}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="ort">
          <Form.Label>Ort</Form.Label>
          <Form.Control
            type="text"
            name="ort"
            value={formData.ort}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="beskrivning">
          <Form.Label>Beskrivning</Form.Label>
          <Form.Control
            type="text"
            name="beskrivning"
            value={formData.beskrivning}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="cuisine">
          <Form.Label>Cuisine</Form.Label>
          <Form.Control
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="typ">
          <Form.Label>Typ</Form.Label>
          <Form.Control
            as="select"
            name="typ"
            value={formData.typ}
            onChange={handleOnChange}
          >
            <option value="restaurang">Restaurang</option>
            <option value="cafe">Café</option>
            <option value="bar">Bar</option>
            <option value="fast-food">Fast Food</option>
            <option value="food-truck">Food Truck</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="utbud">
          <Form.Label>Utbud</Form.Label>
          <Form.Control
            as="select"
            name="utbud"
            value={formData.utbud}
            onChange={handleOnChange}
          >
            <option value="lunch">Lunch</option>
            <option value="after-work">After Work</option>
            <option value="middag">Middag</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="e-post">
          <Form.Label>E-post</Form.Label>
          <Form.Control
            type="email"
            name="epost"
            value={formData.epost}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="hemsida">
          <Form.Label>Hemsida</Form.Label>
          <Form.Control
            type="text"
            name="hemsida"
            value={formData.hemsida}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="telefon">
          <Form.Label>Telefon</Form.Label>
          <Form.Control
            type="number"
            name="telefon"
            value={formData.telefon}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="facebook">
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="instagram">
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Button className="m-2" variant="primary" type="submit">
          Ändra
        </Button>
      </Form>
    </Container>
  );
}

export default EditPlacePage;
