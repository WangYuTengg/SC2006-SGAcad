import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
// import UserImage from "components/UserImage";
// import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Review from "./Review";

const Reviews = ({ spotId }) => {
  //const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [reviews, setReviews] = useState([{}]);
  
  const getReviews = async () => {
    const response = await fetch(`http://localhost:3001/studyspots/${spotId}/reviews`, {
      method: "GET",
      //headers:
    })
    const data = await response.json();
    console.log("reviews", data);
    setReviews(data);
  }

  // const getUserReviews = async () => {
  //   const response = await fetch(`http://localhost:3001/${id}/reviews`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}`}
  //   })
  //   const data = await response.json();
  //   setReviews(data);
  // }

  useEffect(() => {
    getReviews();
    //console.log("reviews", reviews)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {reviews.map(
        ({
          _id,
          userId,
          spotId,
          rating,
          comment
        }) => (
          <Review
            key={_id}
            reviewId={_id}
            userId={userId}
            spotId={spotId}
            rating={rating}
            comment={comment}
          />
        )
      )}
    </>
  )
}

export default Reviews;