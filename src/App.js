import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './Routes/landingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
