import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import { Form, Button, Container } from "react-bootstrap";
import EditForm from "../components/EditForm";

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
      <EditForm
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />
    </Container>
  );
}

export default EditPlacePage;
