import React from 'react'
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card.js';
function Vehicles() {
    const CarOwner = {
        title:"#ASC231S",
        subTitle1:"Sportivo",
        subTitle2:"ISUZU"
    }
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
            <Button variant="contained">Add Vehicles</Button>
        </div>

        <div className='SectionList'>
            <Card type="vehicles" {...CarOwner}/>
            <Card type="vehicles"  {...CarOwner}/>
            <Card type="vehicles"  {...CarOwner}/>
            <Card type="vehicles"  {...CarOwner}/>
            <Card type="vehicles"  {...CarOwner}/>
        </div>
      </section>
    </div>
  </>
}

export default Vehicles