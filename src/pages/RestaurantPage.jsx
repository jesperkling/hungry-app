import { useParams } from "react-router-dom";
import { Container, Card, Row } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import useGetPlace from "../hooks/useGetPlace";

function RestaurantPage() {
  const { id } = useParams();
  const { data: place, isLoading } = useGetPlace(id);

  if (!place) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container className="mt-4">
      {isLoading && <p>Laddar...</p>}
      {place && (
        <Card>
          <Card.Body>
            <Card.Title>{place.namn}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Adress: {place.gatuadress} {place.gatunummer}
            </Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Telefon:{" "}
                <a href={`tel: ${place.telefon}`}>+46{place.telefon}</a>
              </ListGroup.Item>
              <ListGroup.Item>Beskrivning: {place.beskrivning}</ListGroup.Item>
              <ListGroup.Item>Cuisine: {place.cuisine}</ListGroup.Item>
              <ListGroup.Item>Typ: {place.typ}</ListGroup.Item>
              <ListGroup.Item>Utbud: {place.utbud}</ListGroup.Item>
            </ListGroup>
            <div className="m-2 text-center">
              {place.hemsida && (
                <Card.Link
                  href={place.hemsida}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="../src/assets/images/website.svg"
                    alt="website"
                    style={{ width: "32px", height: "32px" }}
                  />
                </Card.Link>
              )}
              {place.facebook && (
                <Card.Link
                  href={place.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="../src/assets/images/fb-logo.svg"
                    alt="facebook"
                    style={{ width: "32px", height: "32px" }}
                  />
                </Card.Link>
              )}
              {place.instagram && (
                <Card.Link
                  href={place.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="../src/assets/images/instagram-logo.svg"
                    alt="instagram"
                    style={{ width: "32px", height: "32px" }}
                  />
                </Card.Link>
              )}
              {place.epost && (
                <Card.Link
                  href={`mailto:${place.epost}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="../src/assets/images/email.svg"
                    alt="email"
                    style={{ width: "32px", height: "32px" }}
                  />
                </Card.Link>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default RestaurantPage;
