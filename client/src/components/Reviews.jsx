import { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = ({ spotId, newReviews }) => {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    const response = await fetch(
      `http://localhost:3001/studyspots/${spotId}/reviews`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setReviews([...newReviews, ...data]);
  };

  useEffect(() => {
    getReviews();
  }, [spotId, newReviews]);

  return (
    <>
      {reviews.map(({ _id, userId, spotId, rating, comment }) => (
        <Review
          key={_id}
          reviewId={_id}
          userId={userId}
          spotId={spotId}
          rating={rating}
          comment={comment}
        />
      ))}
    </>
  );
};

export default Reviews;
