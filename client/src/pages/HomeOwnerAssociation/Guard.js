import React, {useEffect, useState} from 'react'
import './Guard.scss'

import axios from '../../utils/axios';

import NavBar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import SideBar from './SideBar';
import ResidentCard from '../../components/ResidentCard/ResidentCard.js'

function Guard() {

    const [guards, setGuards] = useState()

    useEffect(() => {
		const fetchGuards = async () => {
			await axios
				.get(`hoas/guards`, {
					params: {
						hoaId: localStorage.getItem('hoaId')
					}
				})
				.then((response) => {
					setGuards(response.data)
				});
		};
        fetchGuards();
	}, []);

    if (!guards) return <div>Loading...</div>

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
                            
                                {(guards.length === 0 )?
                                    <p>No guards found!</p>
                                :
                                    <>
                                        
                                        {guards.length > 0 &&
                                        guards.map((guard) => {
                                            return (
                                                <ResidentCard key={guard._id} username={guard.user.name.firstName + ' ' + guard.user.name.lastName} type={"View"}/>
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