import React from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import ResidentCard from '../../components/ResidentCard/ResidentCard';
function ResidentsList() {
    const Residents = [
        { name : 'David', type : 'Homeowner'},
        { name : 'Harold James Castillo', type : 'Homeowner'},
        { name : 'Damian Criston Castillo', type : 'Resident'},
        { name : 'Dianne Chrystalin', type : 'Homeowner'},
        { name : 'Historia Jalicent Castillo ', type : 'Resident'},
        { name : 'Jon Angelo Llagas', type : 'Homeowner'},
        { name : 'Mary Joyce Reparip', type : 'Resident'},
        { name : 'Gian Carlo Dela Cruz', type : 'Resident'},
        { name : 'John Michael Hipolito', type : 'Resident'},
    ];
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="ResidentsList"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Residents List</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput/>
                        </div>
                        <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
                        <Button variant="contained" href='addhome'>Add Home</Button>
                    </div>
                    <div className='SectionList'>
                        {Residents.map((resident) => (
                            <ResidentCard UserName={resident.name} type={resident.type}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default ResidentsList