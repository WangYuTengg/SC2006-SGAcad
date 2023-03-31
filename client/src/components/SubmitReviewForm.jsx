import {
  Box,
  Typography,
  InputBase,
  useTheme,
  Button,
  Rating,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const isLoggedIn = () => {
  const user = useSelector((state) => state.user);
  if (user) return true;
  else return false;
};

const SubmitReviewForm = ({ spotId, onReviewSubmitted }) => {
  const { palette } = useTheme();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const { _id } = useSelector((state) => state.user) || "";
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleOpenSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleReview = async (e) => {
    e.preventDefault();
    const values = {
      userId: "",
      rating: 0,
      comment: "",
    };
    values.userId = _id;
    values.rating = rating;
    values.comment = review;
    const response = await fetch(
      `http://localhost:3001/studyspots/${spotId}/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (response) {
      const data = await response.json(); // Get the newly created review data
      onReviewSubmitted(data); // Call the callback function with the new review data
      handleOpenSnackbar("Review Posted!", "success");

      // Reset the review body and rating
      setReview("");
      setRating(0);
    } else {
      handleOpenSnackbar("Oops, something went wrong!", "error");
    }
  };

  if (!_id)
    return (
      <WidgetWrapper>
        <Typography>
          Please <Link to="/login">log in</Link> to write a review
        </Typography>
      </WidgetWrapper>
    );
  else
    return (
      <WidgetWrapper>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputBase
              placeholder="Add a review"
              onChange={(e) => setReview(e.target.value)}
              value={review}
              fullWidth
              multiline
              rows={4}
              sx={{
                backgroundColor: palette.neutral.light,
                borderRadius: "0.5rem",
                padding: "1rem",
                borderColor: palette.divider,
                borderWidth: 1,
                borderStyle: "solid",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                onClick={handleReview}
                variant="contained"
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "12px",
                }}
              >
                POST
              </Button>
              <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleCloseSnackbar}
              >
                <Alert
                  sx={{ width: "100%", fontSize: "1rem" }}
                  elevation={6}
                  variant="filled"
                  onClose={handleCloseSnackbar}
                  severity={snackbar.severity}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </Box>
          </Grid>
        </Grid>
      </WidgetWrapper>
    );
};

export default SubmitReviewForm;
