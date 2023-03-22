import CssBaseline from '@mui/material/CssBaseline';
import {Routes, Route} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import StudySpotPage from './pages/StudySpotPage';
import Layout from './components/Layout';

export default function App() {
  return (
    <CssBaseline>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<IndexPage />} />
          <Route path = '/Login' element={<LoginPage />}/>
          <Route path = '/Register' element={<RegisterPage />} />
          <Route path = '/studyspots/:spotId' element={<StudySpotPage />} />
        </Route>
      </Routes>
    </CssBaseline>
  )
}



