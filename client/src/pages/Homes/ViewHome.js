import React from 'react'
import './ViewHome.scss'
import Navbar from '../../layouts/NavBar';
import VillageIcon from '../../images/icons/Village.png';
import House from '../../images/icons/house.png';
import Button from '@mui/material/Button';
import ResidentCard from '../../components/ResidentCard/ResidentCard';
import Card from '../../components/Card/Card.js';
function ViewHome() {
    const CarOwner = {
        title:"#ASC231S",
        subTitle1:"Sportivo",
        subTitle2:"ISUZU"
    }
    return <>
        <Navbar type="home"/>
        <div id='SectionHolder'>
            <section className='Section'>
            <h3 className='SectionTitleDashboard'><span><a href="/homes">Homes</a></span>  > <span>Castillo's</span> Residents</h3>
                {/* <div className='SectionController'>
                    
                    <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
                    <Button variant="contained" href='addhome'>Add Home</Button>
                </div> */}
                <div className='SectionContent' id='ViewHome'>
                    <div id='ViewHome__Content'>
                        <div className='ViewHome__Container' id='HOA__Div'>
                            <h5 className='ViewHome__Title'>Homeowners Association</h5>
                            <div id='HOA__Container'>
                                <img src={VillageIcon} alt="" />
                                <div id='HOA__InfoContainer'>
                                    <div>
                                        <h4>Villa 2</h4>
                                        <p>San Mateo Rizal</p>
                                    </div>
                                    <div>
                                        <h4>Monthly Dues Status</h4>
                                        <p>Fully Paid</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='ViewHome__Container' id='Residents_div'>
                            <h5 className='ViewHome__Title'>Residents</h5>
                            <div id='Residents_div__Container' className='SectionList'>
                                <ResidentCard UserName="Harold James H. Castillo"/>
                                <ResidentCard UserName="Dianne Chrystalin B. Castillo"/>
                                <ResidentCard UserName="Damian Criston Castillo"/>
                                <ResidentCard UserName="Historia Jalicent Castillo"/>
                            </div>
                        </div>
                        <div className='ViewHome__Container' id='Vehicles_div'>
                            <h5 className='ViewHome__Title'>Vehicles</h5>
                            <div className='SectionList'>
                                <Card type="Vehicles" {...CarOwner}/>
                            </div>
                        </div>
                        <div className='ViewHome__Container' id='Visitors_div'>
                            <h5 className='ViewHome__Title'>Visitors</h5>
                            <div className='SectionList'>
                                <Card type="Visitor" title="Jon Angelo Llagas" subTitle1="Single" subTitle2="March 2 - March 5"/>
                            </div>
                        </div>
                    </div>
                    <div id='ViewHome__OwnerInfo'>
                        <div>
                            <img src={House} alt="" />
                            <div>
                                <h6>Homeowner: </h6>
                                <h5>Harold James H. Castillo</h5>
                            </div>
                            <div>
                                <h6>Address: </h6>
                                <h5>#25 Abuab Road Block 18 Lot 26 Villa 2 Guitnang Bayan 2 San Mateo, Rizal</h5>
                            </div>
                            <div>
                                <h6>Register Since: </h6>
                                <h5>Tue, 07 Feb 20 23 02:37:40 GMT </h5>
                            </div>
                            <Button variant='contained'>Edit Home</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default ViewHome