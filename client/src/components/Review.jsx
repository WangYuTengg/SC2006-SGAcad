import { Rating, useTheme, Typography, Box } from "@mui/material";
import {WidgetWrapper} from "./Utils";
import { useEffect, useState } from "react";
import Favorite from "./Favorite";
import moment from "moment/moment";

/**
 * Review Component
 * This component displays a review, including the user's name, the rating, the comment, and the date it was posted.
 * It can be displayed with or without the associated study spot details, depending on the context.
 *
 * @component
 * @param {string} reviewId - The unique identifier of the review.
 * @param {string} userId - The unique identifier of the user who posted the review.
 * @param {string} spotId - The unique identifier of the study spot being reviewed.
 * @param {number} rating - The rating given by the user for the study spot (from 1 to 5).
 * @param {string} comment - The review text provided by the user.
 * @param {boolean} isProfile - Optional. Determines if the component should display study spot details. Default is false.
 * @param {string} createdAt - The timestamp of when the review was created.
 *
 * @example
 * // Usage
 * <Review reviewId="1" userId="2" spotId="3" rating={4} comment="Great study spot!" createdAt="2022-05-25T10:30:00" />
 */
const Review = ({ reviewId, userId, spotId, rating, comment, isProfile=false, createdAt }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const [user, setUser] = useState(null);
  const [spot, setSpot] = useState(null);

  // Fetch user data based on the userId
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
    });
    const data = await response.json();
    setUser(data);
  };

  // Fetch spot data based on the spotId
  const getSpot = async () => {
    const response = await fetch(`http://localhost:3001/studyspots/${spotId}`, {
      method: "GET",
    });
    const data = await response.json();
    setSpot(data);
  };

  // Fetch user and study spot data upon mounting of Review component
  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await getSpot();
    };
    fetchData();
  }, []);

  if (!user || !spot) return null;
  if(isProfile) return (
    <Box padding="0.5rem" key={{ userId, reviewId, spotId }}>
      <Favorite 
        key={reviewId}
        favoriteId={spotId}
        name={spot.name}
        picturePath={spot.picturePath}
      />
      <WidgetWrapper m="2rem 0">
        <Typography color={main} sx={{ mt: "1rem" }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography color={main} sx={{ mt: "1rem", mb: "1rem" }}>
          Posted on {moment(createdAt).format('DD-MM-YYYY HH:mm:ss')}
        </Typography>
        <Rating name="read-only" value={rating} readOnly />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {comment}
        </Typography>
      </WidgetWrapper>
    </Box>
  );
  else return (
    <Box padding="0.5rem" key={{ userId, reviewId, spotId }}>
      <WidgetWrapper m="2rem 0">
        <Typography color={main} sx={{ mt: "1rem" }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography color={main} sx={{ mt: "1rem", mb: "1rem" }}>
          Posted on {moment(createdAt).format('LLLL')}
        </Typography>
        <Rating name="read-only" value={rating} readOnly />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {comment}
        </Typography>
      </WidgetWrapper>
    </Box>
  );
};

export default Review;
