import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

export default function App() {
  return (
    <CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<IndexPage />} />
            <Route path = '/Login' element={<LoginPage />}/>
            <Route path = '/Register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CssBaseline>
  )
}



