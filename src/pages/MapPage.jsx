import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

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
  const [isMapReady, setIsMapReady] = useState(false);

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
    setIsMapReady(true);
    map.setZoom(12);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      {!isLoaded && !loadError && <div>Loading...</div>}
      {loadError && <div>Map cannot be loaded right now, sorry.</div>}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Add a marker */}
          {isMapReady && (
            <Marker
              position={{ lat: 55.606158395718786, lng: 13.024105474863351 }}
              onClick={() => {
                map.setZoom(16);
                map.panTo({ lat: 55.606158395718786, lng: 13.024105474863351 });
              }}
            />
          )}
        </GoogleMap>
      )}
    </>
  );
}

export default MapPage;
