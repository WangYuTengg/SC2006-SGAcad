import {
  AddLocationAltOutlined,
  WrongLocationOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavoriteSpots } from "../state/index";
import { FlexBetween } from "./Utils";

const FavoriteButton = ({favoriteId}) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token);
  // const favoriteSpots = (_id) ? useSelector((state) => state.user.favoriteSpots) : {};
  const favoriteSpots = useSelector((state) => {
    if(_id)
      return state.user.favoriteSpots;
    return null;
  })

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  //console.log("fav", favoriteSpots);

  const isFavorite = (_id) ? favoriteSpots.find(
    (favorite) => favorite._id === favoriteId
  ) : false;

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
    <IconButton
        onClick={() => patchFavorite()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFavorite ? (
          <WrongLocationOutlined sx={{ color: primaryDark }} />
        ) : (
          <AddLocationAltOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
  )
}

export default FavoriteButton;