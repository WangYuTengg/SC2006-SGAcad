import { Rating, useTheme, Typography, Box } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect, useState } from "react";
import Favorite from "./Favorite";
import moment from "moment/moment";

const Review = ({ reviewId, userId, spotId, rating, comment, isProfile=false, createdAt }) => {
  const [user, setUser] = useState(null);
  const [spot, setSpot] = useState(null);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
    });
    const data = await response.json();
    //console.log("userdata", data);
    setUser(data);
  };

  const getSpot = async () => {
    const response = await fetch(`http://localhost:3001/studyspots/${spotId}`, {
      method: "GET",
    });
    const data = await response.json();
    setSpot(data);
  };

  const { palette } = useTheme();
  const main = palette.neutral.main;

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
