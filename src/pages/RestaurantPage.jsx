import { useLocation, useParams } from "react-router-dom";
import { Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";

function RestaurantPage() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            {name} - {id}
          </Card.Title>
          <Card.Subtitle>Address</Card.Subtitle>
          <Card.Text>Phone number</Card.Text>
          <Card.Link>Website</Card.Link>
        </Card.Body>
      </Card>

      <ListGroup className="mt-4">
        <ListGroupItem>Menu Item 1</ListGroupItem>
        <ListGroupItem>Menu Item 2</ListGroupItem>
        <ListGroupItem>Menu Item 3</ListGroupItem>
      </ListGroup>
    </Container>
  );
}

export default RestaurantPage;
