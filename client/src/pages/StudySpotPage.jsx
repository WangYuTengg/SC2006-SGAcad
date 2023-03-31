import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import FavoriteButton from "../components/FavoriteButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmitReviewForm from "../components/SubmitReviewForm";
import Reviews from "../components/Reviews";

const StudySpotPage = () => {
  const [spot, setSpot] = useState(null);
  const { spotId } = useParams();
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
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography fontWeight="bold" fontSize="1.6rem" color="primary">
              {spot.name}
            </Typography>
          </Grid>
          <Grid sx={{p: 2}}>
            <FavoriteButton favoriteId={spot._id} />
          </Grid>
        </Grid>
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <img
              src={`${spot.picturePath}`}
              alt={spot.name}
              loading="lazy"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{  p: 2 }}>
              <Typography fontWeight="bold" fontSize="18px" sx={{textDecoration: "underline", pb:1}}>Details</Typography>
              <Typography fontSize="16px">
                Address: {spot.location.address}, {spot.location.postal}
              </Typography>
              <Typography fontSize="16px">Opening Hours: </Typography>
              <li>Weekdays: {spot.misc.openingHours.weekdays}</li>
              <li>Weekends: {spot.misc.openingHours.weekends}</li>
              <Typography fontSize="16px">Phone: {spot.misc.phoneNumber}</Typography>
              <Typography fontSize="16px">Website: {spot.misc.websiteURL}</Typography>
              <Typography fontWeight="bold" fontSize="18px" sx={{textDecoration: "underline", pb:1, pt:1}}>Description</Typography>
              <Typography fontSize="16px">{spot.description}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography fontWeight="bold" fontSize="1.6rem" sx={{pt: 2}} color="primary"> Review Section </Typography>
        <Box my={2}>
          <SubmitReviewForm spotId={spot._id} />
        </Box>
        <Box>
          <Reviews spotId={spotId} />
        </Box>
      </Box>
    </Container>
  );
};

export default StudySpotPage;
