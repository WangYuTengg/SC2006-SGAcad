import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import Map from "../components/Map";

const IndexPage = () => {
  const [defaultSpot, setDefaultSpot] = useState(null);
  const defaultSpotId = "641408f9b4b8c89c10e2f0e4";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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

  useEffect(() => {
    getDefaultSpot();
  }, []);

  if (!defaultSpot) return null;
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
