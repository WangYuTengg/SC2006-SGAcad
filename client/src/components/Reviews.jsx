import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Review from "./Review";

/**
 * Reviews component
 *
 * This component fetches and displays a list of reviews for a specific study spot or for the current user's profile.
 * The list of reviews can be updated with newReviews.
 *
 * @component
 * @param {string} spotId - The ID of the study spot for which to fetch the reviews.
 * @param  {object} newReview - New review to be added to the existing list of reviews.
 * @param {boolean} isProfile - If true, fetches the user's reviews instead of the study spot's reviews.
 *
 * @example
 * // Usage
 * <Reviews spotId="123" newReviews={[]} />
 * <Reviews spotId="123" newReviews={[]} isProfile={true} />
 */
const Reviews = ({ spotId, newReview, isProfile = false }) => {
  const [reviews, setReviews] = useState([]);
  const { _id } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token);

  // Fetches the reviews for the given study spot and updates the state.
  const getReviews = async () => {
    const response = await fetch(
      `http://localhost:3001/studyspots/${spotId}/reviews`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (newReview !== null) {
      setReviews([newReview, ...data]);
    } else {
      setReviews(data.reverse());
    }
  };

  // Fetches the user's reviews and updates the state.
  const getUserReviews = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/reviews`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (newReview !== null) {
      setReviews([newReview, ...data]);
    } else {
      setReviews(data.reverse());
    }
  };

  // Fetch data upon change in spot
  useEffect(() => {
    if (isProfile) {
      getUserReviews();
    } else {
      getReviews();
    }
  }, [spotId, isProfile]);

  // Reviews Component
  useEffect(() => {
    if (newReview) {
      setReviews((prevReviews) => [newReview, ...prevReviews]);
    }
  }, [newReview]);

  return (
    <>
      {reviews.map(({ _id, userId, spotId, rating, comment, createdAt }) => (
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
