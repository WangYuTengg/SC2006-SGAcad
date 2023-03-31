import { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = ({ spotId }) => {
  const [reviews, setReviews] = useState([]);
  
  const getReviews = async () => {
    const response = await fetch(`http://localhost:3001/studyspots/${spotId}/reviews`, {
      method: "GET",
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
  }, []); 

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