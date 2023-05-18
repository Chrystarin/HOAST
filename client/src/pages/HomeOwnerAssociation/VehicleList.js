import React, {useEffect, useState} from 'react'

import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';
import loading from '../../images/loading.gif'
import Filter from '../../components/Filter/Filter';
import axios from '../../utils/axios';

function VehicleList() {

    // States for popup filter
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);

    const [vehicles, setVehicles] = useState();
    const [data,setData] = useState({});
    const [filterValue,setFilterValue] = useState(
        {
            sortBy:"A_Z"
        }
    );
    // Retrieve All User Vehicles Data
    useEffect(() => {
      const fetchVehicles = async () => {
        await axios
            .get(`vehicles`, {
                params: {
                    hoaId: localStorage.getItem('hoaId')
                }
            })
            .then((response) => {
                setVehicles(response.data);
            });
         };
        fetchVehicles();
    }, []);

    if (!vehicles) return <>
    <div className='Loading'>
      <img src={loading} alt="" />
      <h3>Loading...</h3>
    </div>
  </>

    return <>
        <NavBar/>
        <div className='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="VehiclesList"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Vehicles List</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput setData={setData} data={vehicles} keys={["homeId","name","owner.name.firstName","owner.name.lastName","status"]}  filterValue={filterValue} />
                        </div>
                        <Filter value={filterValue} setValue={setFilterValue}/>
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
                </div>
            </section>
        </div>
    </>
}

export default VehicleList