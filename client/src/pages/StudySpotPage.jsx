import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import FavoriteButton from "../components/FavoriteButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmitReviewForm from "../components/SubmitReviewForm";
import Reviews from "../components/Reviews";

/**
 * StudySpotPage
 * This page displays the details of each individual study spot.
 * The page is dynamically rendered depending on the url which corresponds to the spotId of the study spot we are rendering.
 *
 * @page
 * @example
 * // Usage
 * <StudySpotPage />
 */
const StudySpotPage = () => {
  const [spot, setSpot] = useState(null);
  const { spotId } = useParams();
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState(null);

  // function to send a GET request to get study spot's data
  const getSpot = async () => {
    const response = await fetch(`http://localhost:3001/studyspots/${spotId}`, {
      method: "GET",
    });
    const data = await response.json();
    setSpot(data);
  };

  // fetch data of study spot upon loading into page
  useEffect(() => {
    const fetchData = async () => {
      await getSpot();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleNewReview = (newReview) => {
    setNewReview(newReview);
  };

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
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography fontWeight="bold" fontSize="1.6rem" color="primary">
              {spot.name}
            </Typography>
          </Grid>
          <Grid sx={{ p: 2 }}>
            <FavoriteButton favoriteId={spot._id} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={6}>
            <img
              src={`${spot.picturePath}`}
              alt={spot.name}
              loading="lazy"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography
                fontWeight="bold"
                fontSize="18px"
                sx={{ textDecoration: "underline", pb: 1 }}
              >
                Details
              </Typography>
              <Typography fontSize="16px">
                Address: {spot.location.address}, {spot.location.postal}
              </Typography>
              <Typography fontSize="16px">Opening Hours: </Typography>
              <li>Weekdays: {spot.misc.openingHours.weekdays}</li>
              <li>Weekends: {spot.misc.openingHours.weekends}</li>
              <Typography fontSize="16px">
                Phone: {spot.misc.phoneNumber}
              </Typography>
              <Typography fontSize="16px">
                Website: {spot.misc.websiteURL}
              </Typography>
              <Typography fontSize="16px" color="primary">
                {spot.isLibrary ? (
                  <a href="https://www.nlb.gov.sg/visitors" target="_blank">
                    Check crowd
                  </a>
                ) : (
                  ""
                )}
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize="18px"
                sx={{ textDecoration: "underline", pb: 1, pt: 1 }}
              >
                Description
              </Typography>
              <Typography fontSize="16px">{spot.description}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography
          fontWeight="bold"
          fontSize="1.6rem"
          sx={{ pt: 2 }}
          color="primary"
        >
          {" "}
          Review Section{" "}
        </Typography>
        <Box my={2}>
          <SubmitReviewForm
            spotId={spot._id}
            onReviewSubmitted={handleNewReview}
          />
        </Box>
        <Box>
          <Reviews spotId={spotId} isProfile={false} newReview={newReview} />
        </Box>
      </Box>
    </Container>
  );
};

export default StudySpotPage;
