import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { useAuthContext } from "../contexts/Authentication";

const CreateForm = () => {
  const { currentUser } = useAuthContext();
  const [name, setName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [offers, setOffers] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Skapar nytt matställe...");

    const newPlace = {
      name,
      streetName,
      streetNumber,
      postcode,
      city,
      description,
      cuisine,
      category,
      offers,
      email,
      website,
      phone,
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
    setName("");
    setStreetName("");
    setStreetNumber("");
    setPostcode("");
    setCity("");
    setDescription("");
    setCuisine("");
    setCategory("");
    setOffers("");
    setEmail("");
    setWebsite("");
    setPhone("");
    setFacebook("");
    setInstagram("");
  };

  return (
    <div style={{ overflow: "auto" }}>
      <Form className="p-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="name">
          <Form.Control
            type="text"
            placeholder="Namn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="streetName">
          <Form.Control
            type="text"
            placeholder="Gatuadress..."
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="streetNumber">
          <Form.Control
            type="number"
            placeholder="Gatunummer..."
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="postcode">
          <Form.Control
            type="number"
            placeholder="Postnummer..."
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="city">
          <Form.Control
            type="text"
            placeholder="Ort..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="description">
          <Form.Control
            type="text"
            placeholder="Beskrivning..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

        <Form.Group className="mb-2" controlId="category">
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Välj kategori...</option>
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Café</option>
            <option value="fast-food">Fast Food</option>
            <option value="food-truck">Food Truck</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2" controlId="offers">
          <Form.Select
            value={offers}
            onChange={(e) => setOffers(e.target.value)}
          >
            <option>Välj utbud...</option>
            <option value="lunch">Lunch</option>
            <option value="after-work">After Work</option>
            <option value="middag">Middag</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2" controlId="email">
          <Form.Control
            type="email"
            placeholder="E-Post..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="website">
          <Form.Control
            type="text"
            placeholder="Hemsida..."
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="phone">
          <Form.Control
            type="number"
            placeholder="Telefonnummer..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
