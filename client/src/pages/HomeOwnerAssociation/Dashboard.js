import React from 'react'
import NavBar from '../../layouts/NavBar'
import './Dashboard.scss';
import DuesIcon from '../../images/icons/due-date.png'
import Avatar from '@mui/material/Avatar';
import SideBar from './SideBar';
import Card from '../../components/Card/Card';
import HouseIcon from '../../images/icons/villageSide.png';
function HomeOwnerAssociation() {
    const House = [
        { name : 'Llagas', address:"Ucaliptus", residents:"8"},
        { name : 'Castillo', address:"Saint Dominic", residents:"8"},
        { name : 'Brandez', address:"Abuab", residents:"8"}
    ];
    const Cars = [
        { plateNumber : 'ASC231S', model:"Sportivo", brand:"Isuzu"},
        { plateNumber : 'ABC231', model:"Sivic", brand:"Honda"},
        { plateNumber : 'BEW231', model:"L300", brand:"Toyota"}
    ];
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Dashboard"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Dashboard</a></span></h3>
                    <div id='Manage__Hoa' className='SectionView'>
                        <div className='SectionView__Content'>
                            <div className='SectionView__Sections' id='AssociatoinDues__Container'>
                                <h5 className='SectionView__Sections__Title'>Association Dues</h5>
                                <div id='AssociatoinDues__Content'>
                                    <div id='AssociationDues__Card'>
                                        <img src={DuesIcon} alt="" />
                                        <div id=''>
                                            <h6>Monthly</h6>
                                            <p>1,000 Pesos</p>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            <div className='SectionView__Sections'>
                                <h5 className='SectionView__Sections__Title'>Homes</h5>
                                <div className='SectionList'>
                                    {House.map((House) => (
                                        <Card type="Home" title={House.name} subTitle1={House.address} subTitle2={House.residents} url="viewvisitor" />
                                    ))}
                                </div>
                            </div>
                            <div className='SectionView__Sections'>
                                <h5 className='SectionView__Sections__Title'>Vehicles</h5>
                                <div className='SectionList'>
                                    {Cars.map((Car) => (
                                        <Card type="Vehicles" title={Car.plateNumber} subTitle1={Car.model} subTitle2={Car.brand} url="viewvisitor" />
                                    ))}
                                </div>
                            </div>
                            <div className='SectionView__Sections'>
                                <h5 className='SectionView__Sections__Title'>Guard</h5>
                                <div id='Guard__Content'>
                                    <div id='Guard__Card'>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        <div id=''>
                                            <h6>Juan Dela Cruz</h6>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>  
                        </div>
                        <div className='SectionView__SidePanel' id='SectionView_Sidebar'>
                            <div className="SidePanel__Container SidePanelShowInfo" >
                                <img src={HouseIcon} alt="" />
                                <div>
                                    <h6>Homeowner Association: </h6>
                                    <h5>Suburbia East</h5>
                                </div>
                                <div>
                                    <h6>Address: </h6>
                                    <h5>Suburbia Concepcion Uno Marikina City</h5>
                                </div>
                                <div>
                                    <h6>Register Since: </h6>
                                    <h5>Tue, 07 Feb 20 23 02:37:40 GMT </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default HomeOwnerAssociation