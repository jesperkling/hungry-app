import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Form, FormControl, Button } from "react-bootstrap";

function MapPage() {
  const containerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = {
    lat: 55.605,
    lng: 13.003,
  };

  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(async function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);

    // Wait for 500 milliseconds before setting the map
    await new Promise((resolve) => setTimeout(resolve, 500));

    setMap(map);
    map.setZoom(12);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!map) {
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        if (map.getZoom() > 12) {
          map.panTo(location);
        } else {
          map.panTo(location);
          map.setZoom(16);
        }
      } else {
        alert("Could not find location");
      }
    });
  };

  const geocodeAddress = (geocoder, address) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };

  useEffect(() => {
    if (map) {
      map.setZoom(12);
    }
  }, [map]);

  return (
    <>
      {!isLoaded && !loadError && <div>Loading...</div>}
      {loadError && <div>Map cannot be loaded right now, sorry.</div>}
      {isLoaded && (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {map && (
              <Marker
                position={{ lat: 55.606158395718786, lng: 13.024105474863351 }}
                onClick={() => {
                  map.setZoom(16);
                  map.panTo({
                    lat: 55.606158395718786,
                    lng: 13.024105474863351,
                  });
                }}
              />
            )}
          </GoogleMap>
          <div>
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Sök efter namn..."
                style={{ border: "none", borderBottom: "1px solid black" }}
                onFocus={(e) => (e.target.placeholder = "")}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={(e) => (e.target.placeholder = "Sök efter namn...")}
              />
              <Button
                variant="danger"
                type="submit"
                onClick={handleSearch}
                size="lg"
                style={{ width: "120px" }}
              >
                Sök
              </Button>
            </Form>
          </div>
        </>
      )}
    </>
  );
}

export default MapPage;
