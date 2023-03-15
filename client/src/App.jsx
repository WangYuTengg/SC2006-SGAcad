import CssBaseline from '@mui/material/CssBaseline';
import {Routes, Route} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <CssBaseline>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path = '/Login' element={<LoginPage />}/>
        <Route path = '/Register' element={<RegisterPage />} />
      </Routes>
    </CssBaseline>
  )
}



