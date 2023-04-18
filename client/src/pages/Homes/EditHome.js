import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import {useAuth} from '../../utils/AuthContext.js';
import Navbar from '../../layouts/NavBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ResidentCard from '../../components/ResidentCard/ResidentCard';
function EditHome() {
    const { id } = useParams();
    const {isHomeowner} = useAuth();
    
    console.log(isHomeowner(id));

    const [name, setName] = useState()
    const [home, setHome] = useState()
    const [residents, setResidents] = useState()
    const [residentAdd, setResidentAdd] = useState()

    // Retrieve Home Info
    const fetchHome = async () => {
        await axios
        .get(`homes`,{
                params: {
                    homeId: id
                }
            })
        .then((response) => {
            setHome(response.data);
            let [owner, ...reds] = response.data.residents;
            setResidents(reds)
            console.log(residents)
        })
    }
    
    async function Submit(e){
        e.preventDefault();
        try {
            await axios
                .patch(
                    `homes`,
                    JSON.stringify({ 
                        name: name,
                        homeId: id
                    })
                )
                .then((response) => {
                    alert("Name Updated")
                    console.log(response.data)
                })
        } catch(err){

        }
    }

    async function AddResident(e){
        e.preventDefault();
        try {
            await axios
                .post(
                    `residents`,
                    JSON.stringify({ 
                        userId: residentAdd,
                        homeId: id
                    })
                )
                .then((response) => {
                    alert("Resident Added")
                    fetchHome()
                })
        } catch(err){
            console.log(err)
        }
    }

    async function RemoveResident(residentId){
        console.log(id)
        try {
            await axios
                .patch(
                    `residents`,
                    JSON.stringify({ 
                        residentId: residentId,
                        homeId: id
                    })
                )
                .then((response) => {
                    alert("Resident Removed")
                    
                    fetchHome()
                })
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchHome();
	}, []);


    if(!home || !residents) return <div>Loading...</div>

    return (
        <div>
            <Navbar type="home"/>
            <div className='SectionHolder'>
            <section className='Section'>
                <h3 className='SectionTitleDashboard'>Edit Home</h3>
                    <div className='SectionContent' id='ViewHome'>
                        <div id='ViewHome__Content'>
                            <div className='ViewHome__Container' id='HOA__Div'>>
                            <div className='FormWrapper__2'>
                                <TextField
                                    id="filled-password-input"
                                    label="Name"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="filled"
                                    defaultValue={home.name}
                                    onChange={(e)=>setName(e.target.value )}
                                />
                                <Button variant="contained" size="large" type='submit' onClick={Submit}>
                                    Save
                                </Button>
                            </div>
                            <div className='FormWrapper__2'>
                                <TextField
                                    id="filled-password-input"
                                    label="Residents"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="filled"
                                    onChange={(e)=>setResidentAdd(e.target.value)}
                                />
                                <Button variant="contained" size="large" type='submit' onClick={AddResident}>
                                    Add
                                </Button>
                            </div>
                            {(residents.length === 0 )?
                                    <p>No Residents Available!</p>
                                    :
                                    <>
                                        <h3>Active Residents</h3>
                                        {residents.length > 0 && residents.map((resident) => {
                                            if(resident.status=="active")
                                            return (
                                                // <p>{JSON.stringify(resident.user.name.firstName)}</p>
                                                <ResidentCard 
                                                    key={resident._id} 
                                                    username={resident.user.name.firstName + ' ' + resident.user.name.lastName} 
                                                    type="Edit"
                                                    action={()=>RemoveResident(resident.user.userId)}
                                                />
                                            );
                                        })}
                                        <h3>Inactive Residents</h3>
                                        {residents.length > 0 && residents.map((resident) => {
                                            if(resident.status=="inactive")
                                            return (
                                                // <p>{JSON.stringify(resident.user.name.firstName)}</p>
                                                <ResidentCard 
                                                    key={resident._id} 
                                                    username={resident.user.name.firstName + ' ' + resident.user.name.lastName} 
                                                    type="View"
                                                    action={()=>RemoveResident(resident.user.userId)}
                                                />
                                            );
                                        })}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
            </section>
            </div>
        </div>
        
    )
}

export default EditHome