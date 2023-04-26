import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import CreateForm from "../components/CreateForm";
import { collection, getDocs } from "@firebase/firestore";
import { database } from "../firebase";

function EditPage() {
  const [createPlace, setCreatePlace] = useState(false);
  const [editPlace, setEditPlace] = useState(false);
  const [places, setPlaces] = useState([]);

  const handleCreatePlace = () => {
    setCreatePlace(true);
    setEditPlace(false);
  };

  const handleEditPlace = () => {
    setEditPlace(true);
    setCreatePlace(false);
  };

  useEffect(() => {
    const getPlaces = async () => {
      const placesCollection = collection(database, "places");
      const placesSnapshot = await getDocs(placesCollection);
      const placesList = placesSnapshot.docs.map((doc) => doc.data());
      setPlaces(placesList);
    };
    getPlaces();
  }, []);

  return (
    <div className="text-center" style={{ height: "800px", overflowY: "auto" }}>
      <Container>
        <h1>Admin Dashboard</h1>
        <Button onClick={handleCreatePlace} className="m-2">
          Skapa nytt matställe
        </Button>
        <Button onClick={handleEditPlace} className="m-2">
          Redigera matställe
        </Button>
        {createPlace && (
          <div className="text-center">
            <h1>Skapa nytt matställe</h1>
            <CreateForm />
          </div>
        )}

        {editPlace && (
          <div className="text-center">
            <h1>Redigera matställe</h1>
            <ListGroup>
              {places.map((place) => (
                <ListGroup.Item key={place.id}>
                  {place.namn} - {place.typ} - {place.utbud}
                  <Button variant="primary" size="sm" className="mx-2">
                    Redigera
                  </Button>
                  <Button variant="danger" size="sm">
                    Ta bort
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Container>
    </div>
  );
}

export default EditPage;
