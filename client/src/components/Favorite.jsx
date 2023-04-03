import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavoriteSpots } from "../state/index";
import { FlexBetween } from "./Utils";
import FavoriteButton from "./FavoriteButton";

/**
 * Favorite Component
 * This component displays a favorite study spot item with its image, name, subtitle,
 * and a favorite button to add or remove the spot from the user's favorite spots list.
 * 
 * @component
 * @example
 * // Usage
 * <Favorite
 *   favoriteId="60a2c932cf57e00015fa0d42"
 *   name="Library"
 *   subtitle="Location"
 *   picturePath="https://example.com/image.jpg"
 * />
 * @param {string} favoriteId - The study spot's ID to be added or removed from the user's favorite spots list.
 * @param {string} name - The study spot's name.
 * @param {string} subtitle - The study spot's subtitle or location.
 * @param {string} picturePath - The URL of the study spot's image.
 */
const Favorite = ({ favoriteId, name, subtitle, picturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const favoriteSpots = useSelector((state) => state.user.favoriteSpots);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check if the spot is already in the user's list of favorite spots
  const isFavorite = favoriteSpots.find(
    (favorite) => favorite._id === favoriteId
  );

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

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Box
          onClick={() => {
            navigate(`/studyspots/${favoriteId}`);
            navigate(0);
          }}
        >
          <Box
            width={"55px"}
            height={"55px"}
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            <img
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                height: "55px",
              }}
              width={"55px"}
              height={"55px"}
              alt="user"
              src={picturePath}
            />
          </Box>
        </Box>
        <Box
          onClick={() => {
            navigate(`/studyspots/${favoriteId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <FavoriteButton favoriteId={favoriteId} />
    </FlexBetween>
  );
};

export default Favorite;
