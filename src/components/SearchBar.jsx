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
      <Row>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <InputGroup>
            <Form className="d-flex" onSubmit={handleSubmit}>
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
              <Button className="border" type="submit" variant="light">
                <FaSearch />
              </Button>
            </Form>
          </InputGroup>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title="Typ av matställe"
              variant="light"
              className="border"
            >
              <Dropdown.Item href="#">Café</Dropdown.Item>
              <Dropdown.Item href="#">Restaurang</Dropdown.Item>
              <Dropdown.Item href="#">Snabbmat</Dropdown.Item>
              <Dropdown.Item href="#">Kiosk/Grill</Dropdown.Item>
              <Dropdown.Item href="#">Foodtruck</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>

          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title="Utbud"
              variant="light"
              className="border"
            >
              <Dropdown.Item href="#">Lunch</Dropdown.Item>
              <Dropdown.Item href="#">After Work</Dropdown.Item>
              <Dropdown.Item href="#">Middag</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;
