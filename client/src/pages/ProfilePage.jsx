import { Divider, Typography, useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FavoritesListWidget from "../widgets/FavoritesListWidget.jsx";
import { Avatar } from "@mui/material";
import { FlexBetween } from "../components/Utils";

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

  const {
    firstName,
    lastName,
    email,
    favoriteSpots,
    reviews,
    location,
    picturePath,
  } = user;

  const containerStyle = {
    display: "flex",
  };

  const profileBox = {
    width: "20%",
    height: "20%",
  };

  const favouriteBox = {
    width: "50%",
  };

  return (
    <div className="container" style={containerStyle}>
      <div className="profile" style={profileBox}>
        <Box
          p="1rem 1rem 1rem 1rem"
          m="1rem 0 0 1rem"
          sx={{ border: 2, borderRadius: "10px", color: "secondary.main" }}
        >
          <FlexBetween pl="40%" pb="0.5rem">
            <Avatar sx={{ width: 56, height: 56 }} src={picturePath}></Avatar>
          </FlexBetween>
          <Divider />
          <Typography sx={{ pt: "0.5rem", textAlign: "center" }}>
            Name: {firstName} {lastName}{" "}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>Email: {email} </Typography>
          <Typography sx={{ textAlign: "center" }}>Location: </Typography>
        </Box>
      </div>
      <div className="favourites" style={favouriteBox}>
        <Box p="1rem 1rem 1rem 1rem" m="1rem 0 0 1rem">
          <FavoritesListWidget userId={userId} />
        </Box>
      </div>
    </div>
  );
};

export default ProfilePage;
