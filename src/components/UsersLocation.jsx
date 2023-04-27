import React from "react";

const UsersLocation = ({ usersLocation }) => {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          usersLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }}
    >
      Get users location
    </button>
  );
};

export default UsersLocation;
