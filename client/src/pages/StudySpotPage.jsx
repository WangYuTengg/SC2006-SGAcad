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
    <Box>
      <Typography fontWeight="bold" fontSize="1.5rem" padding="2rem">
        {spot.name}
      </Typography>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="flex-start"
      >
        <img
          src={`${spot.picturePath}`}
          alt={spot.name}
          loading="lazy"
          style={{ width: "40%" }}
        />
        <Box sx={{ border: 1 }}>
          <Box paddingLeft="1rem" paddingRight="1rem">
            <Typography fontWeight="bold">Details</Typography>
            <Typography>
              Address: {spot.location.address}, {spot.location.postal}
            </Typography>
            <Typography>Opening Hours:</Typography>
            <Typography>Phone:</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudySpotPage;
