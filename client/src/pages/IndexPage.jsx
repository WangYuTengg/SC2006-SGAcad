import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const [spots, setSpots] = useState(null);
  const [defaultSpot, setDefaultSpot] = useState(null);
  const defaultSpotId = "641ec083982851ff40de0aa3";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();

  // THEME
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

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
    <>
      {isNonMobileScreens && (
        <Box>
          <Box
            padding="2rem 1rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Typography fontWeight="500" fontSize="2rem" color="primary">
              Welcome to SG Acad!
            </Typography>
            <Typography paddingBottom="8px" fontSize="1.1rem">
              Find your perfect study spot here at our website :). Take a look
              around!
            </Typography>
            <Map
              spotLocation={defaultSpot.location}
              width="80%"
              height="500px"
            />
          </Box>
          <Box
            padding="2rem 10%"
            width="100%"
            display="flex"
            flexDirection="column"
          >
            <Typography fontWeight="500" fontSize="2rem" color="primary">
              Recommended Spots
            </Typography>
            <ImageList>
              {spots.slice(0, 4).map((spot) => (
                <Box>
                  <Typography
                    fontWeight="bold"
                    fontSize="1.3rem"
                    onClick={() => navigate(`/studyspots/${spot._id}`)}
                    sx={{
                      "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {spot.name}
                  </Typography>
                  <ImageListItem>
                    <img
                      src={`${spot.picturePath}`}
                      alt={spot.name}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={
                        spot.location.address + ",  " + spot.location.postal
                      }
                      position="below"
                    />
                  </ImageListItem>
                </Box>
              ))}
            </ImageList>
          </Box>
        </Box>
      )}
    </>
  );
};

export default IndexPage;
