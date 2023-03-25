import React, { useState, useEffect } from "react";

function CurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {currentLocation ? (
        <p>
          {currentLocation.lat}, {currentLocation.lng}
        </p>
      ) : (
        <p>Getting your current location...</p>
      )}
    </div>
  );
}

export default CurrentLocation;