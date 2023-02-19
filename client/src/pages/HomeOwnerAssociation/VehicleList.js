import React from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card';
function VehicleList() {
    const Vehicles = [
        { plateNumber : 'ASC231S', model:"Sportivo", brand:"Isuzu"},
        { plateNumber : 'ABC231', model:"Sivic", brand:"Honda"},
        { plateNumber : 'BEW231', model:"L300", brand:"Toyota"}
    ];
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="VehiclesList"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Vehicles List</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput/>
                        </div>
                        <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
                        <Button variant="contained" href='addhome'>Add Home</Button>
                    </div>
                    <div className='SectionList'>
                        {Vehicles.map((Vehicle) => (
                            <Card type="Vehicles" title={Vehicle.plateNumber} subTitle1={Vehicle.model} subTitle2={Vehicle.brand} url="viewvisitor" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default VehicleList