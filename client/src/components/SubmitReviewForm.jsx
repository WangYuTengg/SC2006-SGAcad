import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Rating,
} from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import * as yup from "yup";

const isLoggedIn = () => {
  const user = useSelector((state) => state.user);
  if(user) return true;
  else return false;
}

const SubmitReviewForm = ({spotId}) => {
  const dispatch = useDispatch();
  const {palette} = useTheme();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const {_id} = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  console.log(_id);
  const handleReview = async () => {
    const values = {
      userId: "",
      rating: 0,
      comment: "",
    }
    values.userId = _id;
    values.rating = rating;
    values.comment = review;
    // console.log(values);
    const response = await fetch(`http://localhost:3001/studyspots/${spotId}/reviews`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values),
    });
  }

  if(!_id) return (
    <WidgetWrapper>
      <Typography>
        Please <Link to='/login'>log in</Link> to write a review
      </Typography>
    </WidgetWrapper>
  )
  else return (
    <WidgetWrapper>
      <Rating 
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center" width="20rem">
        <InputBase
          placeholder="Add a review"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </Box>
      
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          // disabled={!post}
          onClick={handleReview}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </Box>
    </WidgetWrapper>
  )
}

export default SubmitReviewForm;