import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "../components/Map";

const StudySpotPage = () => {
  const [spot, setSpot] = useState(null);
  const { spotId } = useParams();
  console.log(spotId);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getSpot = async () => {
    const response = await fetch(`http://localhost:3001/studyspots/${spotId}`, {
      method: "GET",
    });
    const data = await response.json();
    setSpot(data);
  };

  useEffect(() => {
    getSpot();
  }, []);

  if (!spot) return null;
  return (
    <Box display="flex">
      <Typography>{spot.name}</Typography>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {spot.name}
      </Box>
    </Box>
  );
};

export default StudySpotPage;
