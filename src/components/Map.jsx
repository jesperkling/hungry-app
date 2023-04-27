import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import { useQuery } from "react-query";
import MapAPI from "../services/GMapsAPI";

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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState({
    lat: 55.605,
    lng: 13.0038,
  });

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

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userPosition}
      zoom={15}
      onLoad={(map) => setMap(map)}
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
  ) : (
    <></>
  );
};

export default Map;
