import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Paper, Tooltip, Typography } from "@mui/material";

/**
 * Map
 * This component renders a Google Map with custom markers for study spots and the user's current location.
 * It also provides tooltips and an info window for additional information about each marker.
 *
 * @component
 * @param {Object} currentLocation - The user's current location (latitude and longitude coordinates).
 * @param {string} width - The width of the map container.
 * @param {string} height - The height of the map container.
 * @param {Array} spots - An array of study spots to be displayed as markers on the map.
 *
 * @example
 * // Usage
 * <Map currentLocation={currentLocation} width="100%" height="400px" spots={spots} />
 */
const Map = ({ currentLocation, width, height, spots }) => {
  const studySpots = spots;
  const [popupContent, setPopupContent] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const getMarkerIcon = (isLibrary) => {
    const color = isLibrary ? "green" : "red";
    return {
      url: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    };
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
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        disableDefaultUI={true}
        clickableIcons={false}
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
              icon={getMarkerIcon(spot.isLibrary)}
              onClick={() => handleMarkerClick(spot)}
            />
          );
        })}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.location.coordinates[0],
              lng: selectedMarker.location.coordinates[1],
            }}
            onCloseClick={onInfoWindowClose}
          >
            <Typography
              onClick={() => handleNavigate(selectedMarker)}
              color="black"
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {selectedMarker.name}
            </Typography>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default React.memo(Map);
