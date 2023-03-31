import { Box, Typography, useTheme } from "@mui/material";
import Favorite from "./Favorite.jsx";
import { WidgetWrapper } from "./Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteSpots } from "../state/index";

const FavoritesListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const favoriteSpots = useSelector((state) => state.user.favoriteSpots);

  const getFavorites = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/favorite-spots`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFavoriteSpots({ favoriteSpots: data }));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const favoritesComponent = favoriteSpots.map((favoriteSpots) => (
    <Favorite
      key={favoriteSpots._id}
      favoriteId={favoriteSpots._id}
      name={favoriteSpots.name}
      picturePath={favoriteSpots.picturePath}
    />
  ));

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Favorited Study Spots
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {favoritesComponent}
      </Box>
    </WidgetWrapper>
  );
};

export default FavoritesListWidget;
