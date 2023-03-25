import { Box, Typography, useTheme } from "@mui/material";
import Favorite from "../components/Favorite.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteSpots } from "../state/index";

const FavoritesListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const favoriteSpots = useSelector((state) => state.user.favoriteSpots);
    //console.log("widget", favoriteSpots);

    const getFavorites = async() => {
        const response = await fetch(
            `http://localhost:3001/users/${userId}/favorite-spots`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const data = await response.json();
        //console.log(data);
        dispatch(setFavoriteSpots({ favoriteSpots: data }));
    }

    useEffect(() => {
        getFavorites();
    }, []);

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
                {favoriteSpots.map((favorite) => (
                    <Favorite
                        key={favorite._id}
                        favoriteId={favorite._id}
                        name={`${favorite.name}`}
                        subtitle={favorite.location.address}
                        picturePath={favorite.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default FavoritesListWidget;