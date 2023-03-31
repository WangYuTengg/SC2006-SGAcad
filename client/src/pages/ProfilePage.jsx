import { Divider, Typography, useTheme, Grid } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FavoritesListWidget from "../components/FavoritesList.jsx";
import { Avatar } from "@mui/material";

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

  return (
    <Box pt={3} px={isNonMobileScreens ? 8 : 2}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            p={2}
            sx={{
              border: 2,
              borderRadius: "10px",
              color: "secondary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 56, height: 56 }} src={picturePath}></Avatar>
            <Divider />
            <Typography fontSize="1rem" sx={{ pt: "0.5rem", textAlign: "center" }}>
              Name: {firstName} {lastName}
            </Typography>
            <Typography fontSize="1rem" sx={{ textAlign: "center" }}>Email: {email}</Typography>
            <Typography fontSize="1rem" sx={{ textAlign: "center" }}>Location: {location || "Not provided"}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h5" fontWeight="bold" fontSize="1.6rem" mb={2}>
              Favorite Spots
            </Typography>
            <FavoritesListWidget userId={userId} />
          </Box>
          <Box mt={4}>
            <Typography variant="h5" fontWeight="bold" fontSize="1.6rem" mb={2}>
              Reviews Given
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;