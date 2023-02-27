import React from 'react';
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card.js';
import './Homes.scss'
function Homes() {
  const HomeOwner = {
    title:"Castillo's Residence",
    subTitle1:"Saint Dominic",
    subTitle2:"8 Residents"
  }
  return <>
    <Navbar type="home"/>
    <div id='SectionHolder'>
      <section className='Section'>
        <h3 className='SectionTitleDashboard'> Homes</h3>
        <div className='SectionController'>
          <div id='SearchInput__Container'>
            <SearchInput/>
          </div>
          <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
          <Button variant="contained" href='/homes/add'>Add Home</Button>
        </div>

        <div className='SectionList'>
          <Card type="Home" {...HomeOwner} url="/homes/:id"/>
          <Card type="Home" {...HomeOwner} url="/homes/:id"/>
          <Card type="Home" {...HomeOwner} url="/homes/:id"/>
          <Card type="Home" {...HomeOwner} url="/homes/:id"/>
          <Card type="Home" {...HomeOwner} url="/homes/:id"/>
        </div>
      </section>
    </div>
  </>
}

export default Homes;
