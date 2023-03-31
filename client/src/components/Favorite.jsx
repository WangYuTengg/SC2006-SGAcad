import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavoriteSpots } from "../state/index";
import { FlexBetween } from "./Utils";
import FavoriteButton from "./FavoriteButton";

const Favorite = ({ favoriteId, name, subtitle, picturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const favoriteSpots = useSelector((state) => state.user.favoriteSpots);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFavorite = favoriteSpots.find(
    (favorite) => favorite._id === favoriteId
  );

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
