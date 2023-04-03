import { Box, Typography, useTheme } from "@mui/material";
import Favorite from "./Favorite.jsx";
import { WidgetWrapper } from "./Utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteSpots } from "../state/index";

/**
 * FavoritesList Component.
 *
 * This component renders a widget that displays the user to view their list of favorite spots.
 * Users can also remove their favorited spots from the list using the user's ID and study spot's ID to
 * make a PATCH request to update the user's favoriteSpots state.
 *
 * @component
 * @example
 * // Usage
 * <FavoritesListWidget userId="60a2c932cf57e00015fa0d42" />
 *
 * @param {string} userId - The ID of the user whose favorite list we are rendering
 */
const FavoritesListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const favoriteSpots = useSelector((state) => state.user.favoriteSpots);

  // function that sends a GET request to get list of favorite spots of user
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
