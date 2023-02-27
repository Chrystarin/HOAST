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

import RequireAuth from './authentication/RequireAuth.js'

const ROLES = {
    'User': 'user',
    'Admin': 'admin',
    'Guard': 'guard'
  }

  console.log(ROLES.User)

function App() {
  return (
    <Routes>

    {/* Public Routes */}
        <Route path='/' element={<LandingPage/>}/>
        <Route path='*' element={<Error404/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

    {/* Private Routes for Users */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>} >
            <Route path='/homes'>
                <Route path='' element={<Homes/>}/>
                <Route path='add' element={<AddHome/>}/>
                <Route path=':id' element={<ViewHome/>}/>
                <Route path='resident/:id' element={<ResidentsView/>}/>
            </Route>

            <Route path='/vehicles'>
                <Route path='' element={<Vehicles/>}/>
                <Route path='add' element={<AddVehicle/>}/>
                <Route path=':id' element={<VehicleView/>}/>
            </Route>

            <Route path='/visitors'>
                <Route path='' element={<Visitors/>}/>
                <Route path='add' element={<AddVisitor/>}/>
                <Route path=':id' element={<VisitorView/>}/>
            </Route>

            {/* Private Routes for Admin */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>} >
                <Route path='/associationdues' element={<AssociationDues/>}/>
            </Route>

            {/* Private Routes for Guard */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Guard]}/>} >
                <Route path='/scanner' element={<Scanner/>}/>
            </Route>

            {/* Private Routes for Admin and Guard */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Guard]}/>} >
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/visitorslist' element={<VisitorsList/>}/>
                <Route path='/logs' element={<Logs/>}/>
                <Route path='/residentslist' element={<ResidentsList/>}/>
                <Route path='/vehiclelist' element={<VehicleList/>}/>
                <Route path='/homelist' element={<HomeList/>}/>
            </Route>

        </Route>

    </Routes>
    
  );
}

export default App;
