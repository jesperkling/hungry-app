import React from "react";
import { Button } from "react-bootstrap";
import { FaLocationArrow } from "react-icons/fa";

const UsersLocation = ({ usersLocation }) => {
  return (
    <Button
      type="submit"
      variant="light"
      className="border d-flex align-items-center justify-content-center"
      style={{ height: "39px" }}
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          usersLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }}
    >
      <FaLocationArrow />
    </Button>
  );
};

export default UsersLocation;
