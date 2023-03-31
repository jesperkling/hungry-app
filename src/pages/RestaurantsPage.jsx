import { Link } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";

function RestaurantsPage() {
  const restaurants = [
    { id: 1, name: "Restaurant A" },
    { id: 2, name: "Restaurant B" },
    { id: 3, name: "Restaurant C" },
  ];

  return (
    <Container>
      <h1>Restaurants</h1>
      <ListGroup>
        {restaurants.map((restaurant) => (
          <ListGroup.Item key={restaurant.id}>
            <Link
              to={{
                pathname: `/restaurants/${restaurant.id}`,
                search: `name=${restaurant.name}`,
              }}
            >
              {restaurant.name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default RestaurantsPage;
