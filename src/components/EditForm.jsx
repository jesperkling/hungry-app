import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { updateDoc, doc } from "firebase/firestore";
import { database } from "../firebase";
import { useForm } from "react-hook-form";
import GMapsAPI from "../services/GMapsAPI";

const EditForm = ({ place }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [updatedPlace, setUpdatedPlace] = useState(place);

  const onUpdatePlace = async (data) => {
    await updateDoc(doc(database, "places", place.id), {
      namn: data.namn,
      gatuadress: data.gatuadress,
      ort: data.ort,
      beskrivning: data.beskrivning,
      cuisine: data.cuisine,
      typ: data.typ,
      utbud: data.utbud,
      epost: data.epost,
      hemsida: data.hemsida,
      telefon: data.telefon,
      facebook: data.facebook,
      instagram: data.instagram,
      coordinates: await GMapsAPI.getLatLng(data.gatuadress + data.ort),
    });

    setUpdatedPlace({
      ...updatedPlace,
      ...data,
      coordinates: await GMapsAPI.getLatLng(data.gatuadress + data.ort),
    });

    alert("Matställe uppdaterat!");
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Redigera ställe</Card.Title>
            <Form onSubmit={handleSubmit(onUpdatePlace)} noValidate>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="namn">
                  <Form.Label>Namn</Form.Label>
                  <Form.Control
                    {...register("namn", {
                      required: "Namn...",
                      minLength: {
                        value: 2,
                        message: "Namnet måste vara minst 2 tecken långt",
                      },
                    })}
                    defaultValue={place.namn}
                    size="sm"
                    type="text"
                  />
                  {errors.namn && <p>{errors.namn.message}</p>}
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="telefon">
                  <Form.Label>Telefonnummer</Form.Label>
                  <Form.Control
                    {...register("telefon", {
                      minLength: {
                        value: 5,
                        message: "Telefonnumret måste vara minst 5 siffror",
                      },
                    })}
                    defaultValue={place.telefon}
                    size="sm"
                    type="number"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="gatuadress">
                  <Form.Label>Gatuadress</Form.Label>
                  <Form.Control
                    {...register("gatuadress", {
                      required: "Gatuadress...",
                      minLength: {
                        value: 2,
                        message: "Gatuadressen måste vara minst 2 tecken lång",
                      },
                    })}
                    defaultValue={place.gatuadress}
                    size="sm"
                    type="text"
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="ort">
                  <Form.Label>Ort</Form.Label>
                  <Form.Control
                    {...register("ort", {
                      required: "Ort...",
                      minLength: {
                        value: 2,
                        message: "Orten måste vara minst 2 tecken lång",
                      },
                    })}
                    defaultValue={place.ort}
                    size="sm"
                    type="text"
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="beskrivning">
                <Form.Label>Beskrivning</Form.Label>
                <Form.Control
                  {...register("beskrivning", {
                    required: "Beskrivning...",
                    minLength: {
                      value: 2,
                      message: "Beskrivningen måste vara minst 2 tecken lång",
                    },
                  })}
                  defaultValue={place.beskrivning}
                  size="sm"
                  as="textarea"
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="cuisine">
                <Form.Label>Cuisine</Form.Label>
                <Form.Control
                  {...register("cuisine", {
                    required: "Cuisine...",
                    minLength: {
                      value: 2,
                      message: "Cuisine måste vara minst 2 tecken långt",
                    },
                  })}
                  defaultValue={place.cuisine}
                  size="sm"
                  type="text"
                  as="textarea"
                />
              </Form.Group>

              <Row>
                <Form.Group as={Col} className="mb-3" controlId="typ">
                  <Form.Label as="legend">Typ</Form.Label>
                  <Form.Select
                    {...register("typ", {
                      required: "Typ...",
                    })}
                    defaultValue={place.typ}
                  >
                    <option value="cafe">Café</option>
                    <option value="restaurang">Restaurang</option>
                    <option value="snabbmat">Snabbmat</option>
                    <option value="kiosk-grill">Kiosk/Grill</option>
                    <option value="foodtruck">Foodtruck</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="utbud">
                  <Form.Label as="legend">Utbud</Form.Label>
                  <Form.Select
                    {...register("utbud", {
                      required: "Utbud...",
                    })}
                    defaultValue={place.utbud}
                  >
                    <option value="lunch">Lunch</option>
                    <option value="after-work">After Work</option>
                    <option value="middag/Á-la-carte">Middag/Á la carte</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} className="mb-3" controlId="epost">
                  <Form.Label>E-post</Form.Label>
                  <Form.Control
                    {...register("epost")}
                    defaultValue={place.epost}
                    size="sm"
                    type="email"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="hemsida">
                  <Form.Label>Hemsida</Form.Label>
                  <Form.Control
                    {...register("hemsida")}
                    defaultValue={place.hemsida}
                    size="sm"
                    type="url"
                  />
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="facebook">
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    {...register("facebook")}
                    defaultValue={place.facebook}
                    size="sm"
                    type="url"
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="instagram">
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    {...register("instagram")}
                    defaultValue={place.instagram}
                    size="sm"
                    type="url"
                  />
                </Form.Group>
              </Row>
              <Button type="submit">Spara</Button>
              <Button onClick={reset} type="cancel">
                Ångra
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditForm;
