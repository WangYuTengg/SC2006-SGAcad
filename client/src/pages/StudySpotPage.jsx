import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Map from "../components/Map";

const StudySpotPage = () => {
    const [spot, setSpot] = useState(null); // setSpot is a function used to update spot
    const { spotId } = useParams();
    //const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getSpot = async () => {
        const response = await fetch(`http://localhost:3001/studyspots/${spotId}`, {
            method: "GET",
            //headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setSpot(data);
    }

    useEffect(() => {
        getSpot();
    }, [])

    if(!spot) return null;
    //console.log(spot.location.coordinates);

    return (
        <Box>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Map spotLocation={spot.location} />
            </Box>
        </Box>
    )
}

export default StudySpotPage;