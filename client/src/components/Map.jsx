import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Paper, Tooltip, Typography } from "@mui/material";

const Map = ({ currentLocation, width, height, spots }) => {
  const studySpots = spots;
  const [popupContent, setPopupContent] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleNavigate = (spot) => {
    window.location.href = `/studyspots/${spot._id}`;
  };

  const handleMarkerClick = (spot) => {
    setSelectedMarker(spot);
  };

  const onInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleMarkerMouseOver = (spot) => {
    setPopupContent(spot.name);
  };

  const handleMarkerMouseOut = () => {
    setPopupContent(null);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkfUr4OIICxpi59JLmjMoDCe7zAmWR15k",
  });

  const containerStyle = {
    width: width,
    height: height,
  };

  const center = {
    lat: currentLocation.coordinates[0],
    lng: currentLocation.coordinates[1],
  };

  const onLoad = React.useCallback(function callback(map) {
    // do nothing
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    // do nothing
  }, []);

  return isLoaded ? (
    <>
      {popupContent && (
        <Tooltip title={popupContent}>
          <Paper sx={{ position: "absolute", zIndex: 1 }}>
            <Typography sx={{ p: 2 }}>{popupContent}</Typography>
          </Paper>
        </Tooltip>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        disableDefaultUI={true}
      >
        <Marker
          position={center}
          id="currentLocMarker"
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          onMouseOver={() =>
            handleMarkerMouseOver({ name: "Current Location" })
          }
          onMouseOut={handleMarkerMouseOut}
        />
        {studySpots.map((spot) => {
          const coordObj = {
            lat: spot.location.coordinates[0],
            lng: spot.location.coordinates[1],
          };
          return (
            <Marker
              position={coordObj}
              id={spot.spotId}
              key={spot.spotId}
              onClick={() => handleMarkerClick(spot)}
            >
              {selectedMarker !== null && selectedMarker === spot && (
                <InfoWindow
                  position={coordObj}
                  onCloseClick={onInfoWindowClose}
                >
                  {selectedMarker === spot && (
                    <Typography
                      onClick={() => handleNavigate(spot)}
                      color="black"
                      sx={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      {spot.name}
                    </Typography>
                  )}
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default React.memo(Map);
