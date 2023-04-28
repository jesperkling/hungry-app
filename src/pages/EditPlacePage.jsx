import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import { Container } from "react-bootstrap";
import EditForm from "../components/EditForm";
import useGetPlace from "../hooks/useGetPlace";

function EditPlacePage() {
  const { id } = useParams();
  const { data: place, isLoading } = useGetPlace(id);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (place) {
      setFormData(place);
    }
  }, [place]);

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
      {isLoading && <p>Laddar...</p>}
      {place && Object.keys(place).length > 0 && (
        <EditForm
          formData={formData}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </Container>
  );
}

export default EditPlacePage;
