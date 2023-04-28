import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import useGetPlace from "../hooks/useGetPlace";

function RestaurantPage() {
  const { id } = useParams();
  const { data: place, isLoading } = useGetPlace(id);
  console.log(place);

  if (!place) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {isLoading && <p>Laddar...</p>}
      <Card>
        <Card.Body>
          <Card.Title>{place.namn}</Card.Title>
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
