import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Search, DarkMode, LightMode, Menu, Close } from "@mui/icons-material";

export const SubmitSpotFormModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 3,
};

export const Logo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  return (
    <Typography
      fontWeight="bold"
      fontSize="clamp(1rem, 2rem, 2.25rem)"
      color="primary"
      onClick={() => navigate("/")}
      sx={{
        "&:hover": {
          color: primaryLight,
          cursor: "pointer",
        },
      }}
    >
      SG Acad
    </Typography>
  );
};

export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export const SearchBar = () => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  return (
    <FlexBetween
      backgroundColor={neutralLight}
      borderRadius="9px"
      gap="3rem"
      padding="0.1rem 1.5rem"
    >
      <InputBase placeholder="Search..." />
      <IconButton>
        <Search />
      </IconButton>
    </FlexBetween>
  );
};

export const GoogleMapsIconRed = ({ color = "red" }) => {
  const iconSrc = `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;

  return (
    <Box
      component="img"
      src={iconSrc}
      alt="Custom Google Maps Icon"
      sx={{
        width: "24px",
        height: "24px",
      }}
    />
  );
};

export const GoogleMapsIconGreen = ({ color = "green" }) => {
  const iconSrc = `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;

  return (
    <Box
      component="img"
      src={iconSrc}
      alt="Custom Google Maps Icon"
      sx={{
        width: "24px",
        height: "24px",
      }}
    />
  );
};
