import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Error404 from './pages/Error/Error404.js';
import LandingPage from './pages/LandingPage/LandingPage.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import Homes from './pages/Homes/Homes';
import Vehicles from './pages/Vehicles/Vehicles.js';

function App() {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='*' element={<Error404/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/homes' element={<Homes/>}/>
        <Route path='/vehicles' element={<Vehicles/>}/>
    </Routes>
  );
}

export default App;
