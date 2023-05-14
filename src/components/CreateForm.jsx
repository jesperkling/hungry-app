import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { useAuthContext } from "../contexts/Authentication";
import { useForm } from "react-hook-form";
import GMapsAPI from "../services/GMapsAPI";

const CreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onCreatePlace = async (data) => {
    await addDoc(collection(database, "places"), {
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
    alert("Matställe tillagt!");
    reset();
  };

  return (
    <div style={{ overflow: "auto" }}>
      <Form onSubmit={handleSubmit(onCreatePlace)} noValidate>
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
        </Form.Group>
        {errors.namn && <p>{errors.namn.message}</p>}

        <Form.Group as={Col} className="mb-3" controlId="telefon">
          <Form.Label>Telefonnummer</Form.Label>
          <Form.Control
            {...register("telefon", {
              minLength: {
                value: 5,
                message: "Telefonnumret måste vara minst 5 siffror långt",
              },
            })}
            size="sm"
            type="number"
          />
        </Form.Group>

        <Form.Group controlId="gatuadress" className="mb-3">
          <Form.Label>Gatuadress</Form.Label>
          <Form.Control
            {...register("gatuadress", {
              required: "Gatuadress...",
              minLength: {
                value: 2,
                message: "Gatuadressen måste vara minst 2 tecken långt",
              },
            })}
            size="sm"
            type="text"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="ort" className="mb-3">
          <Form.Label>Ort</Form.Label>
          <Form.Control
            {...register("ort", {
              required: "Ort...",
              minLength: {
                value: 2,
                message: "Orten måste vara minst 2 tecken långt",
              },
            })}
            size="sm"
            type="text"
          />
        </Form.Group>

        <Form.Group controlId="beskrivning" className="mb-3">
          <Form.Label>Beskrivning</Form.Label>
          <Form.Control
            {...register("beskrivning", {
              required: "Beskrivning...",
              minLength: {
                value: 2,
                message: "Beskrivningen måste vara minst 2 tecken långt",
              },
            })}
            size="sm"
            as="textarea"
            type="text"
          />
        </Form.Group>

        <Form.Group controlId="cuisine" className="mb-3">
          <Form.Label>Cuisine</Form.Label>
          <Form.Control
            {...register("cuisine", {
              required: "Cuisine...",
              minLength: {
                value: 2,
                message: "Cuisine måste vara minst 2 tecken långt",
              },
            })}
            size="sm"
            type="text"
          />
        </Form.Group>
        <Row>
          <Form.Group as={Col} controlId="typ" className="mb-3">
            <Form.Label as="legend">Typ</Form.Label>
            <Form.Select
              {...register("typ", {
                required: "Typ...",
              })}
            >
              <option value="restaurang">Restaurang</option>
              <option value="cafe">Café</option>
              <option value="snabbmat">Snabbmat</option>
              <option value="kiosk-grill">Kiosk/Grill</option>
              <option value="foodtruck">Foodtruck</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="utbud" className="mb-3">
            <Form.Label as="legend">Utbud</Form.Label>
            <Form.Select
              {...register("utbud", {
                required: "Utbud...",
              })}
            >
              <option value="lunch">Lunch</option>
              <option value="after-work">After Work</option>
              <option value="middag">Middag/Á la carte</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="epost" className="mb-3">
            <Form.Label>E-post</Form.Label>
            <Form.Control {...register("epost")} size="sm" type="email" />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="hemsida" className="mb-3">
            <Form.Label>Hemsida</Form.Label>
            <Form.Control {...register("hemsida")} size="sm" type="text" />
          </Form.Group>

          <Form.Group as={Col} controlId="facebook" className="mb-3">
            <Form.Label>Facebook</Form.Label>
            <Form.Control {...register("facebook")} size="sm" type="text" />
          </Form.Group>

          <Form.Group as={Col} controlId="instagram" className="mb-3">
            <Form.Label>Instagram</Form.Label>
            <Form.Control {...register("instagram")} size="sm" type="text" />
          </Form.Group>
        </Row>

        <Button type="submit">Lägg till</Button>
      </Form>
    </div>
  );
};

export default CreateForm;
