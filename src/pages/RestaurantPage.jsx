import { useParams } from "react-router-dom";
import { Container, Card, Row } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import useGetPlace from "../hooks/useGetPlace";
import facebook from "/src/assets/images/fb-logo.svg";
import instagram from "/src/assets/images/instagram-logo.svg";
import hemsida from "/src/assets/images/website.svg";
import email from "/src/assets/images/email.svg";

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
              Adress: {place.gatuadress} {place.gatunummer} {place.ort}
            </Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Telefon: <a href={`tel: ${place.telefon}`}>{place.telefon}</a>
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
                    src={hemsida}
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
                    src={facebook}
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
                    src={instagram}
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
                    src={email}
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
