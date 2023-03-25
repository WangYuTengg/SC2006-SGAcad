import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import Map from "../components/Map";

const IndexPage = () => {
  const [spots, setSpots] = useState(null);
  const [defaultSpot, setDefaultSpot] = useState(null);
  const defaultSpotId = "641ec083982851ff40de0aa3";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // initial spot on map
  const getDefaultSpot = async () => {
    const response = await fetch(
      `http://localhost:3001/studyspots/${defaultSpotId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setDefaultSpot(data);
  };

  // get all spots
  const getSpots = async () => {
    const response = await fetch(`http://localhost:3001/studyspots/`, {
      method: "GET",
    });
    const data = await response.json();
    setSpots(data);
  };

  // initialise
  useEffect(() => {
    getDefaultSpot();
    getSpots();
  }, []);

  if (!defaultSpot) return null;
  if (!spots) return null;

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Map spotLocation={defaultSpot.location} width="600px" height="550px" />
      </Box>
    </Box>
  );
};

export default IndexPage;
