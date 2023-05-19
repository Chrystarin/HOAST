import React, {useEffect, useState} from 'react'
import './Guard.scss'

import axios from '../../utils/axios';
import {useAuth} from './../../utils/AuthContext.js';

import NavBar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import SideBar from './SideBar';
import ResidentCard from '../../components/ResidentCard/ResidentCard.js'
import loading from '../../images/loading.gif';
import Filter from '../../components/Filter/Filter';
function Guard() {

    const [guards, setGuards] = useState();
    const {isRole} = useAuth();
    const [data,setData] = useState({});
    const [filterValue,setFilterValue] = useState(
        {
            sortBy:"A_Z"
        }
    );
    
    useEffect(() => {
		const fetchGuards = async () => {
			await axios
				.get(`hoas/guards`, {
					params: {
						hoaId: localStorage.getItem('hoaId'),
                        hoaId: (isRole('admin') || isRole('guard')) ? localStorage.getItem('hoaId') : null
					}
				})
				.then((response) => {
					setGuards(response.data)
				});
		};
        fetchGuards();
	}, []);

    if (!guards) return <>
    <div className='Loading'>
      <img src={loading} alt="" />
      <h3>Loading...</h3>
    </div>
  </>

    return <>
        <NavBar/>
        <div className='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Guard"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Guard</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput setData={setData} data={guards} keys={["user.name.firstName","user.name.lastName"]} filterValue={filterValue}/>
                        </div>
                        <Filter value={filterValue} setValue={setFilterValue}/> 
                        <Button variant="contained" href='/addguard'>Add Guard</Button>
                    </div>
                    <div id='Guard' className='SectionView'>
                        <div className='SectionList'>
                            
                                {(data.length === 0 )?
                                    <p>No guards found!</p>
                                :
                                    <>
                                        
                                        {data.length > 0 &&
                                        data.map((guard) => {
                                            return (
                                                <ResidentCard key={guard._id} username={guard["user.name.firstName"] + ' ' + guard["user.name.lastName"]} type={"View"}/>
                                            );
                                        })}
                                    </>
                                }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default Guard