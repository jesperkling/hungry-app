import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/index";

function RestaurantsPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getPlaces() {
      const placesRef = collection(database, "places");
      const snapshots = await getDocs(placesRef);
      const places = snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaces(places);
    }
    getPlaces();
  }, []);

  return (
    <Container>
      <h1>Matställen</h1>
      <ListGroup>
        {places.map((place) => (
          <ListGroup.Item key={place.id}>
            <Link
              to={{
                pathname: `/places/${place.id}`,
                search: `name=${place.namn}`,
              }}
            >
              {place.namn}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default RestaurantsPage;
