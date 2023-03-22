import { CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import { useMemo } from "react";
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';

export default function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<IndexPage />} />
              <Route path = '/Login' element={<LoginPage />}/>
              <Route path = '/Register' element={<RegisterPage />} />
            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  )
}



