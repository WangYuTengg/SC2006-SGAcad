import { Rating, useTheme, Typography, Box } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect, useState } from "react";

const Review = ({
  reviewId,
  userId,
  spotId,
  rating,
  comment
}) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("userdata",data);
    setUser(data);
  };
  
  const { palette } = useTheme();
  const main = palette.neutral.main;

  useEffect(() => {
    getUser();
  }, []); 

  if(!user) return null;
  return (
    <Box padding="0.5rem" key={{userId, reviewId, spotId}}>
      <WidgetWrapper m="2rem 0">
        <Typography color={main} sx={{ mt: "1rem" }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Rating name="read-only" value={rating} readOnly />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {comment}
        </Typography>
      </WidgetWrapper>
    </Box>
  )
}

export default Review;