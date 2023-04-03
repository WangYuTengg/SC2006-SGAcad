import { Typography, useTheme, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteSpots } from "../state/index";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

/**
 * FavoriteButton Component.
 *
 * This component renders a button that allows users to add or remove a study spot
 * from their list of favorite spots. It uses the user's ID and study spot's ID to
 * make a PATCH request to update the user's favoriteSpots state.
 * 
 * @component
 * @example
 * // Usage
 * <FavoriteButton favoriteId="60a2c932cf57e00015fa0d42" />
 *
 * @param {string} favoriteId - The study spot's ID to be added or removed from the user's favorite spots list.
 */
const FavoriteButton = ({ favoriteId }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token);
  const favoriteSpots = useSelector((state) => {
    if (_id) return state.user.favoriteSpots;
    return null;
  });

  // Check if the spot is already in the user's list of favorite spots
  const isFavorite = _id
    ? favoriteSpots.find((favorite) => favorite._id === favoriteId)
    : false;

  
  // Function to send a PATCH request to update the user's favorite spots list
  const patchFavorite = async () => {
    const response = await fetch(
      `http://localhost:3001/studyspots/${favoriteId}/${_id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFavoriteSpots({ favoriteSpots: data }));
  };

  if(!_id) return null;
  else return (
    <Button
      onClick={() => patchFavorite()}
      sx={{ backgroundColor: primaryLight, p: "1rem" }}
    >
      {isFavorite ? (
        <>
          <FavoriteIcon sx={{ color: primaryDark }} />
          <Typography sx={{ pl: 2 }}>Remove location from favorites</Typography>
        </>
      ) : (
        <>
          <FavoriteBorderIcon sx={{ color: primaryDark }} />
          <Typography sx={{ pl: 2 }}>Add location to favorites</Typography>
        </>
      )}
    </Button>
  );
};

export default FavoriteButton;
