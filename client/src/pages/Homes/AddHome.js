import React,{useState} from 'react';

import {useNavigate} from 'react-router';

import './AddHome.scss';

import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchInput from '../../components/SearchInput/SearchInput';
import VillageIcon from '../../images/icons/Village.png'
import ResidentCard from '../../components/ResidentCard/ResidentCard';

import axios from './../../utils/axios';

function AddHome() {
    const navigate = useNavigate();

    const [stepper, setStepper] = useState(1);

    const [form, setForm] = useState({
        hoaId: '',
        houseName: '',
        houseNumber: '',
        street: '',
        phase: ''
    });

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
    });}

    // Submit button for login
    async function Submit(e){
        e.preventDefault();

        try{
            // Login
            await axios
            .post(
                `requests`,
                JSON.stringify({ 
                    hoaId: form.hoaId,
                    houseName: form.houseName,
                    houseNumber: parseInt(form.houseNumber),
                    street: form.street,
                    phase: form.phase
                }),
                {headers: { 'Content-Type': 'application/json' }},
                {withCredentials: true}
                
            )
            .then((response) => {
                console.log(JSON.stringify(response?.data));
                alert("Registered Successfully!");
                navigate("/homes");
            })
        }
        catch(err){
            console.error(err.message);
        }
    }
    function Stepper(){
        switch (stepper) {
            case 1:
                return <>
                    <form  className='Form' id='GeneralInformation'>
                        <div>
                            <SearchInput/>
                            
                        </div>
                        <div className='SectionList'>
                            <div className='Card__Horizontal'>
                                <img src={VillageIcon} alt="" />
                                <div>
                                    <h6>
                                        Villa2
                                    </h6>
                                    <p>San Mateo Rizal</p>
                                </div>
                            </div>
                        </div>
                        <div className='Form__Button'>
                            <Button variant='text'>Back</Button>
                            <Button variant='contained' type='submit' className='Submit'>Next</Button>
                        </div>
                    </form>
                </>
                
                break;
            case 2:
                return <>
                    <form onSubmit={Submit} className='Form' id='GeneralInformation'>
                        <TextField fullWidth  label="HOA ID" variant="filled" onChange={(e)=>updateForm({ hoaId: e.target.value })}/>
                        <TextField fullWidth  label="Home Name" variant="filled" onChange={(e)=>updateForm({ houseName: e.target.value })}/>
                        <TextField fullWidth  label="Home Number" variant="filled" onChange={(e)=>updateForm({ houseNumber: e.target.value })}/>
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Street" variant="filled" onChange={(e)=>updateForm({ street: e.target.value })}/>
                            <TextField fullWidth  label="Phase" variant="filled" onChange={(e)=>updateForm({ phase: e.target.value })}/>
                        </div>
                        {/* <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Postal Code" variant="filled" />
                            <TextField fullWidth  label="Country" variant="filled" />
                        </div> */}
                        <div className='Form__Button'>
                            <Button variant='text'>Back</Button>
                            <Button variant='contained' type='submit' className='Submit'>Next</Button>
                        </div>
                    </form>
                </>
                break;
            case 3:
                return <>
                    <form  className='Form' id='GeneralInformation'>
                        <div>
                            <SearchInput/>
                        </div>
                        <div className='SectionList'>
                            <ResidentCard UserName="Dianne Chrystalin Brandez" Type="Edit"/>
                            <ResidentCard UserName="Vincent Brandez" Type="Edit"/>
                            <ResidentCard UserName="Digi-An Brandez" Type="Edit"/>
                            <ResidentCard UserName="Nicole Dianne Chrystalin Brandes" Type="Edit"/>
                            <ResidentCard UserName="Vinnie Dianne Chrystalin Brandes" Type="Edit"/>
                        </div>
                        <div className='Form__Button'>
                            <Button variant='text'>Back</Button>
                            <Button variant='contained' type='submit' className='Submit'>Submit</Button>
                        </div>
                    </form>
                </>
                break;
        
            default:
                break;
        }
    }
    return<>
        <Navbar type="home"/>
        <div id='SectionHolder'>
            <section className='Section'>
                <h3 className='SectionTitleDashboard'><span><a href="/homes">Homes</a></span>  > <span>Add Home</span></h3>

                <div className='SectionStepper'> 
                    <Button variant='text' className={(stepper === 1)?"active":""} onClick={()=> setStepper(1)}>Homeowners Association</Button>
                    <Button variant='text' className={(stepper === 2)?"active":""} onClick={()=> setStepper(2)}>General Information</Button>
                    <Button variant='text'className={(stepper === 3)?"active":""} onClick={()=> setStepper(3)}>Residents</Button>
                </div>
                <div className='SectionContent'>
                    <Stepper/>
                </div>
            </section>
        </div>
    </>
}

export default AddHome