import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SubmitSpotPage from "./pages/SubmitSpotPage";
import Layout from "./components/Layout";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";

export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
              <Route path="/SubmitStudySpot" element={<SubmitSpotPage />} />
            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
}
