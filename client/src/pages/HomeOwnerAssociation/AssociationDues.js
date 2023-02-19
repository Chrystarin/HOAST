import React from 'react'
import NavBar from '../../layouts/NavBar'
import './Dashboard.scss';
import DuesIcon from '../../images/icons/due-date.png'
import SideBar from './SideBar';

function AssociationDues() {
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="AssociationDues"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Association Dues</a></span></h3>
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
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default AssociationDues