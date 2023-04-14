import React from 'react'
import './Guard.scss'

import NavBar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import SideBar from './SideBar';
import ResidentCard from '../../components/ResidentCard/ResidentCard.js'
function Guard() {

    const Residents = [
        { name : 'David', type : 'Homeowner'},
        { name : 'Harold James Castillo'},
        { name : 'Damian Criston Castillo'},
        { name : 'Dianne Chrystalin'},
        { name : 'Historia Jalicent Castillo '},
    ];
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Guard"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Guard</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput/>
                        </div>
                        <Button variant="contained" href='/addguard'>Add Guard</Button>
                        
                    </div>
                    <div id='Guard' className='SectionView'>
                        <div className='SectionList'>
                            
                            {Residents.map((resident) => (
                                <ResidentCard    username={resident.name} type={"Edit"}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default Guard