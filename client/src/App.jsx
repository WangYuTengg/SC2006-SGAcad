import CssBaseline from '@mui/material/CssBaseline';
import {Routes, Route} from 'react-router-dom';
import SignInComponent from './components/SignInForm';
import SignUpComponent from './components/SignUpForm';
import IndexPage from './pages/IndexPage';

export default function App() {

  return (
    <CssBaseline>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path = '/Login' element={<SignInComponent />}/>
        <Route path = '/Register' element={<SignUpComponent />} />
      </Routes>
    </CssBaseline>
  )
}

