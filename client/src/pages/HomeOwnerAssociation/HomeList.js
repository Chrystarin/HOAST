import React from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card';

function HomeList() {
    const Houses = [
        { name : 'Llagas', address:"Ucaliptus", residents:"8"},
        { name : 'Castillo', address:"Saint Dominic", residents:"8"},
        { name : 'Brandez', address:"Abuab", residents:"8"}
    ];
    
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="HomesList" access="admin"/>
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
                        
                        {Houses.map((House) => (
                            <Card type="Home" title={House.name +" Residence"} subTitle1={House.address} subTitle2={House.residents} url="viewvisitor" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default HomeList