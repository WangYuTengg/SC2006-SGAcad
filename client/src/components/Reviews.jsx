import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Review from "./Review";


const Reviews = ({ spotId, newReviews, isProfile=false }) => {
  const [reviews, setReviews] = useState([]);
  const { _id } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token);

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
  
  const getUserReviews = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/reviews`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await response.json();
    setReviews([...newReviews, ...data]);
  }

  useEffect(() => {
    if (isProfile) {
      getUserReviews();
    }
    else {
      getReviews();
    }
  }, [spotId, newReviews]);

  return (
    <>
      {reviews.slice(0).reverse().map(({ _id, userId, spotId, rating, comment, createdAt }) => (
        <Review
          key={_id}
          reviewId={_id}
          userId={userId}
          spotId={spotId}
          rating={rating}
          comment={comment}
          isProfile={isProfile}
          createdAt={createdAt}
        />
      ))}
    </>
  );
};

export default Reviews;
