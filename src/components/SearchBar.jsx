import React, { useRef } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  DropdownButton,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Image,
} from "react-bootstrap";
import { Autocomplete } from "@react-google-maps/api";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSubmit }) => {
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("finding a place");
    if (!searchRef.current.value) {
      return;
    }
    onSubmit(searchRef.current.value);
    console.log(searchRef.current.value);
  };
  return (
    <>
      <Row className="m-2">
        <Col xs={12} md={6} lg={4}>
          <InputGroup>
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-row mt-2 border border-2 rounded"
            >
              <Form.Group>
                <Autocomplete>
                  <Form.Control
                    type="search"
                    placeholder="Sök..."
                    aria-label="Search"
                    ref={searchRef}
                  />
                </Autocomplete>
              </Form.Group>
              <Button type="submit" variant="light">
                <FaSearch />
              </Button>
            </Form>
          </InputGroup>
        </Col>
        <Col
          xs={12}
          md={6}
          lg={8}
          className="d-flex justify-content-md-end mt-2 mt-md-0"
        >
          <ButtonGroup className="mx-2 border border-2 mt-2">
            <DropdownButton
              as={ButtonGroup}
              title="Typ av matställe"
              variant="light"
            >
              <Dropdown.Item href="#">Café</Dropdown.Item>
              <Dropdown.Item href="#">Restaurang</Dropdown.Item>
              <Dropdown.Item href="#">Snabbmat</Dropdown.Item>
              <Dropdown.Item href="#">Kiosk/Grill</Dropdown.Item>
              <Dropdown.Item href="#">Foodtruck</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>

          <ButtonGroup className="mx-2 border border-2 mt-2">
            <DropdownButton as={ButtonGroup} title="Utbud" variant="light">
              <Dropdown.Item href="#">Lunch</Dropdown.Item>
              <Dropdown.Item href="#">After Work</Dropdown.Item>
              <Dropdown.Item href="#">Middag</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>

          <div>
            <Image
              height={40}
              width={40}
              fluid
              className="bg-dark mt-2"
              roundedCircle
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;
