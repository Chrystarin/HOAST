import React, { useEffect, useState } from 'react';

import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';

import Card from '../../components/Card/Card.js';

import axios from '../../utils/axios';
function Vehicles() {
    
    const [vehicles, setVehicles] = useState();

    // Retrieve All User Vehicles Data
    useEffect(() => {
      const fetchVehicles = async () => {
        await axios
            .get(`vehicles`)
            .then((response) => {
                setVehicles(response.data);
            });
      };
      fetchVehicles();
    }, []);

    // Returns loading if data is not yet retrieved
    if(!vehicles) return <div>Loading...</div>

    return <>
        <Navbar type="vehicles"/>
        <div id='SectionHolder'>
        <section className='Section'>
            <h3 className='SectionTitleDashboard'> Vehicles</h3>
            <div className='SectionController'>
                <div id='SearchInput__Container'>
                    <SearchInput/>
                </div>
                <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
                <Button variant="contained" href='/vehicles/add'>Add Vehicles</Button>
            </div>

            <div className='SectionList'>
            {(vehicles.length === 0 )?
                <p>No Vehicles found!</p>
                :
                <>
                    {vehicles.length > 0 &&
                    vehicles.map((vehicle) => {
                    return (
                        <Card 
                        type="Vehicles"
                        key={vehicle.plateNumber}
                        id={vehicle.plateNumber}
                        title={vehicle.plateNumber}
                        subTitle1={vehicle.brand}
                        subTitle2={vehicle.model}
                        url={`/vehicles/${vehicle.plateNumber}`}
                        />
                    );
                    })}
                </>
            }
            </div>
        </section>
        </div>
  </>
}

export default Vehicles