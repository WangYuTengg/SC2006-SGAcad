import { Typography, useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FavoritesListWidget from "../widgets/FavoritesListWidget.jsx";

const ProfilePage = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const { firstName, lastName, email, favoriteSpots, reviews, location } = user;
  return (
    <div>
      <Typography>
        Profile page of {firstName} {lastName}
      </Typography>
      <Typography>Email: {email} </Typography>
      <Typography>Location: {location} </Typography>
      <FavoritesListWidget userId={userId} />
    </div>
  );
};

export default ProfilePage;
