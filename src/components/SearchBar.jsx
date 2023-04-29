import React, { useRef, useState } from "react";
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

const SearchBar = ({ onSubmit, onFilter, onClearFilters }) => {
  const searchRef = useRef();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchRef.current.value) {
      return;
    }
    onSubmit(searchRef.current.value);
  };

  const handleTypeFilter = (value) => {
    setSelectedType(value);
    onFilter(value, selectedOffer);
  };

  const handleOfferFilter = (value) => {
    setSelectedOffer(value);
    onFilter(selectedType, value);
  };

  const handleClearFilters = () => {
    setSelectedType(null);
    setSelectedOffer(null);
    onClearFilters();
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
              onSelect={handleTypeFilter}
            >
              <Dropdown.Item eventKey="cafe">Café</Dropdown.Item>
              <Dropdown.Item eventKey="restaurang">Restaurang</Dropdown.Item>
              <Dropdown.Item eventKey="snabbmat">Snabbmat</Dropdown.Item>
              <Dropdown.Item eventKey="kiosk/grill">Kiosk/Grill</Dropdown.Item>
              <Dropdown.Item eventKey="foodtruck">Foodtruck</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>

          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title="Utbud"
              variant="light"
              className="border"
              onSelect={handleOfferFilter}
            >
              <Dropdown.Item eventKey="lunch">Lunch</Dropdown.Item>
              <Dropdown.Item eventKey="after work">After Work</Dropdown.Item>
              <Dropdown.Item eventKey="middag">Middag</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>

          <Button
            variant="light"
            className="border"
            onClick={handleClearFilters}
          >
            Rensa filter
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;
