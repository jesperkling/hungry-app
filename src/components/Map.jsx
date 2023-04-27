import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import { useQuery } from "react-query";
import MapAPI from "../services/GMapsAPI";
import UsersLocation from "./UsersLocation";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 55.605,
  lng: 13.0038,
};

const libraries = ["places"];

const Map = () => {
  const { data } = useQuery(["places"], MapAPI.getLatLng);
  // console.log(data);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState({
    lat: 55.605,
    lng: 13.0038,
  });
  const [usersLocation, setUsersLocation] = useState();

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  const handleOnSubmit = async (address) => {
    if (!address) {
      return;
    }
    const coordinates = await MapAPI.getLatLng(address);
    console.log(coordinates);
    map.panTo(coordinates);
    setUserPosition(coordinates);
  };

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panToLocation = useCallback(({ lat, lng }) => {
    setUsersLocation({ lat, lng });
    mapRef?.current.panTo({ lat, lng });
    mapRef?.current.setZoom(15);
    console.log(lat, lng);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <div className="d-flex justify-content-center">
        <UsersLocation usersLocation={panToLocation} />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition}
        zoom={15}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeId: "roadmap",
          mapTypeControl: false,
        }}
      >
        <Marker position={userPosition} />
        <SearchBar onSubmit={handleOnSubmit} />
        <></>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default Map;
