import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Error404 from './pages/Error/Error404.js';
import LandingPage from './pages/LandingPage/LandingPage.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import Homes from './pages/Homes/Homes';
import AddHome from './pages/Homes/AddHome.js';
import ResidentsView from './pages/ResidentsView/ResidentsView.js';
import ViewHome from './pages/Homes/ViewHome.js';

import Vehicles from './pages/Vehicles/Vehicles.js';
import AddVehicle from './pages/Vehicles/AddVehicle.js';
import VehicleView from './pages/Vehicles/VehicleView.js';

import Visitors from './pages/Visitors/Visitors.js';
import AddVisitor from './pages/Visitors/AddVisitor.js';
import VisitorView from './pages/Visitors/VisitorView.js';

import Dashboard from './pages/HomeOwnerAssociation/Dashboard.js';
import AssociationDues from './pages/HomeOwnerAssociation/AssociationDues.js';
import Logs from './pages/HomeOwnerAssociation/Logs.js';
import VisitorsList from './pages/HomeOwnerAssociation/VisitorsList.js';
import ResidentsList from './pages/HomeOwnerAssociation/ResidentsList.js';
import VehicleList from './pages/HomeOwnerAssociation/VehicleList.js';
import HomeList from './pages/HomeOwnerAssociation/HomeList.js';

import Scanner from './pages/HomeOwnerAssociation/Scanner.js';
function App() {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='*' element={<Error404/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
        <Route path='/homes' element={<Homes/>}/>
        <Route path='/addhome' element={<AddHome/>}/>
        <Route path='/viewhome' element={<ViewHome/>}/>
        <Route path='/resident/view' element={<ResidentsView/>}/>

        <Route path='/vehicles' element={<Vehicles/>}/>
        <Route path='/addvehicle' element={<AddVehicle/>}/>
        <Route path='/vehicleview' element={<VehicleView/>}/>
        
        <Route path='/visitors' element={<Visitors/>}/>
        <Route path='/addvisitor' element={<AddVisitor/>}/>
        <Route path='/viewvisitor' element={<VisitorView/>}/>

        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/associationdues' element={<AssociationDues/>}/>

        <Route path='/scanner' element={<Scanner/>}/>

        <Route path='/visitorslist' element={<VisitorsList/>}/>
        <Route path='/logs' element={<Logs/>}/>
        <Route path='/residentslist' element={<ResidentsList/>}/>
        <Route path='/vehiclelist' element={<VehicleList/>}/>
        <Route path='/homelist' element={<HomeList/>}/>

        
    </Routes>
    
  );
}

export default App;
