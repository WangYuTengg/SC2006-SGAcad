import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleMapsIconRed, GoogleMapsIconGreen } from "../components/Utils";

const IndexPage = () => {
  const [spots, setSpots] = useState(null);
  const [defaultSpot, setDefaultSpot] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const defaultSpotId = "641ec083982851ff40de0aa3";
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;

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

  const getSpots = async () => {
    const response = await fetch(`http://localhost:3001/studyspots/`, {
      method: "GET",
    });
    const data = await response.json();
    setSpots(data);
  };

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            coordinates: [position.coords.latitude, position.coords.longitude],
            type: "Point",
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      await getDefaultSpot();
      await getSpots();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      )}
      <Box padding="1rem">
        <Typography
          fontWeight="500"
          fontSize="2rem"
          color="primary"
          textAlign="center"
        >
          Welcome to SG Acad!
        </Typography>
        <Typography paddingBottom="0.8rem" fontSize="1.1rem" textAlign="center">
          Find your perfect study spot here at our website :). Explore different
          spots using our map!
        </Typography>
        <Box
          fontSize="0.9rem"
          textAlign="center"
          display="flex"
          alignItems="center"
        >
          Legend: <GoogleMapsIconRed /> - Study Spots, <GoogleMapsIconGreen /> -
          Public Libraries
        </Box>
        <Map
          currentLocation={
            currentLocation ? currentLocation : defaultSpot.location
          }
          width="100%"
          height={isNonMobileScreens ? "500px" : "300px"}
          spots={spots}
        />
      </Box>
      <Divider />
      <Box padding="1rem">
        <Typography
          fontWeight="500"
          fontSize="2rem"
          color="primary"
          textAlign="center"
        >
          Recommended Spots
        </Typography>
        <Grid container spacing={2}>
          {spots.slice(0, 4).map((spot) => (
            <Grid item xs={12} sm={6} md={3} key={spot._id}>
              <Box
                sx={{
                  "&:hover": {
                    transform: "translateY(-0.3em)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate(`/studyspots/${spot._id}`)}
                textAlign="center"
              >
                <Typography
                  fontWeight="bold"
                  fontSize="1.3rem"
                  sx={{
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      color: primaryLight,
                      cursor: "pointer",
                    },
                  }}
                >
                  {spot.name}
                </Typography>
                <Box
                  component="img"
                  src={`${spot.picturePath}`}
                  alt={spot.name}
                  loading="lazy"
                  sx={{ width: "100%", borderRadius: "0.5rem" }}
                />
                <Typography
                  sx={{
                    mt: 1,
                    "&:hover": {
                      color: primaryLight,
                      cursor: "pointer",
                    },
                    textDecoration: "underline",
                  }}
                >
                  View More
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default IndexPage;
