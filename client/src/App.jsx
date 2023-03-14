import CssBaseline from '@mui/material/CssBaseline';
import {Routes, Route} from 'react-router-dom';
import SignInComponent from './components/SignInForm';
import SignUpComponent from './components/SignUpForm';

export default function App() {

  return (
    <CssBaseline>
      <Routes>
        <Route path = '/Login' element={<SignInComponent />}/>
        <Route path = '/Register' element={<SignUpComponent />}/>
      </Routes>
    </CssBaseline>
  )
}

