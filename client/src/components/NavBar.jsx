import { useEffect, useState } from "react";
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
  Modal,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state/index";
import { useNavigate } from "react-router-dom";
import SubmitSpotForm from "./SubmitSpotForm";
import {
  SubmitSpotFormModalStyle,
  Logo,
  FlexBetween,
  SearchBar,
} from "./Utils";

/**
 * NavBar Component
 * This component represents the navigation bar used throughout the application.
 * It includes a search bar, user authentication menu, theme toggle, and other navigation options.
 *
 * @component
 * @example
 * // Usage
 * <NavBar />
 */
const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [submitSpotModalOpen, setSubmitSpotModalOpen] = useState(false);
  const handleSubmitSpotModalOpen = () => setSubmitSpotModalOpen(true);
  const handleSubmitSpotModalClose = () => setSubmitSpotModalOpen(false);

  // Update isLoggedIn state and user information whenever user state changes
  useEffect(() => {
    if (user && user !== null && token !== null) {
      setIsLoggedIn(true);
      if (user.firstName && user.lastName)
        setFullName(`${user.firstName} ${user.lastName}`);
      if (user._id) setUserId(`${user._id}`);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  // Render submit spot modal
  const renderSubmitSpotModal = () => {
    return (
      <Modal
        title="Submit a Study Spot"
        open={submitSpotModalOpen}
        onClose={handleSubmitSpotModalClose}
        footer={null}
        sx={{ zIndex: 2000 }}
      >
        <Box sx={SubmitSpotFormModalStyle} textAlign="center">
          <Typography sx={{ pb: 2 }}>Submit a study Spot!</Typography>
          <SubmitSpotForm />
        </Box>
      </Modal>
    );
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Logo />
        {isNonMobileScreens && <SearchBar />}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {isLoggedIn ? (
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "fit-content",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>Current User: {fullName}</MenuItem>
                <MenuItem onClick={() => navigate(`/profile/${userId}`)}>
                  View Profile
                </MenuItem>
                <MenuItem onClick={handleSubmitSpotModalOpen}>
                  Submit Study Spot
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography
              fontWeight="500"
              fontSize="1.1rem"
              onClick={() => navigate("/login")}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              Login/Register
            </Typography>
          )}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {isLoggedIn ? (
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>Current User: {fullName}</MenuItem>
                  <MenuItem onClick={() => navigate(`/profile/${userId}`)}>
                    View Profile
                  </MenuItem>
                  <MenuItem onClick={() => handleSubmitSpotModalOpen}>
                    Submit Study Spot
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Typography
                fontWeight="500"
                fontSize="1.1rem"
                onClick={() => navigate("/login")}
                sx={{
                  "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                  },
                }}
              >
                Login
              </Typography>
            )}
          </FlexBetween>
        </Box>
      )}
      {submitSpotModalOpen && renderSubmitSpotModal()}
    </FlexBetween>
  );
};

export default NavBar;
