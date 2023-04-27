import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase/index";

function RestaurantPage() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const [place, setPlace] = useState(null);

  useEffect(() => {
    async function getPlace() {
      const placeRef = doc(database, "places", id);
      const docSnap = await getDoc(placeRef);
      if (docSnap.exists()) {
        setPlace({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("Place not found!");
      }
    }
    getPlace();
  }, [id]);

  if (!place) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>
            {place.gatuadress} {place.gatunummer}
          </Card.Subtitle>
          <Card.Text>+46{place.telefon}</Card.Text>
          <Card.Link href={place.hemsida}>Hemsida</Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RestaurantPage;
