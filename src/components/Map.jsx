import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import SearchBar from "./SearchBar";
import MapAPI from "../services/GMapsAPI";
import UsersLocation from "./UsersLocation";
import { Col, Row } from "react-bootstrap";
import useGetAllPlaces from "../hooks/useGetAllPlaces";

const containerStyle = {
  width: "100vw",
  height: "80vh",
};

const libraries = ["places"];

const Map = () => {
  const { data: places, isLoading } = useGetAllPlaces("places");
  const { isLoaded } = useLoadScript({
    // id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState({
    lat: 55.605,
    lng: 13.0038,
  });
  const [usersLocation, setUsersLocation] = useState();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleOnSubmit = async (address) => {
    if (!address) {
      return;
    }
    const coordinates = await MapAPI.getLatLng(address);
    console.log(coordinates);
    map?.panTo(coordinates);
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

  const onMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const onInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition}
        zoom={13}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeId: "roadmap",
          mapTypeControl: false,
        }}
      >
        {isLoading && <h1>Loading...</h1>}
        {places &&
          places.map((place) => {
            const { coordinates } = place;

            if (!coordinates || !coordinates.lat || !coordinates.lng) {
              return null;
            }

            return (
              <Marker
                key={place.id}
                onClick={() => onMarkerClick(place)}
                position={{
                  lat: coordinates?.lat,
                  lng: coordinates?.lng,
                }}
              />
            );
          })}
        {selectedPlace &&
          (console.log(selectedPlace),
          (
            <InfoWindow
              position={{
                lat: selectedPlace.coordinates.lat,
                lng: selectedPlace.coordinates.lng,
              }}
              onCloseClick={onInfoWindowClose}
            >
              <div>
                <h2>{selectedPlace.namn}</h2>
                <p>{selectedPlace.beskrivning}</p>
                <p>
                  {selectedPlace.gatuadress}
                  {", "} {selectedPlace.ort}
                </p>
              </div>
            </InfoWindow>
          ))}
        <></>
      </GoogleMap>
      <Row>
        <Col className="d-flex">
          <SearchBar onSubmit={handleOnSubmit} />
          <UsersLocation usersLocation={panToLocation} />
        </Col>
      </Row>
    </>
  ) : (
    <></>
  );
};

export default Map;
