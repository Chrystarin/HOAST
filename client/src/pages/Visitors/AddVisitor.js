import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router';
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import axios from './../../utils/axios';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddVisitor() {
    const navigate = useNavigate();

    const [stepper, setStepper] = useState(1);
    const [homes, setHomes] = useState();

    // Collection of form data
    const [form, setForm] = useState({
        homeId: '',
        name: '',
        purpose: '',
        arrival: '',
        departure: '',
        note: '',
    });

    // Retrieves All User Homes Data onLoad
    useEffect(() => {
        const fetchHomes = async () => {
            await axios
                .get(`homes`)
                .then((response) => {
                    setHomes(response.data);
                });
        };
        fetchHomes();
    }, []);

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
    });}

    // Submit button for Adding Visitor
    async function Submit(e){
        e.preventDefault();
        try{
            await axios
            .post(
                `visitors`,
                JSON.stringify({ 
                    homeId: form.homeId,
                    name: form.name,
                    purpose: form.purpose,
                    arrival: form.arrival,
                    departure: form.departure,
                    note: form.note
                })
            )
            .then((response) => {
                console.log(JSON.stringify(response?.data));
                alert("Registered Successfully!");
                navigate("/visitors");
            })
        }
        catch(err){
            console.error(err.message);
        }
    }

    function Stepper(props){
        switch (stepper) {
            case 1:
                return <>
                    <form onSubmit={Submit} className='Form'>
                        <FormControl fullWidth>
                            <InputLabel variant="filled" id="home-select">Home</InputLabel>
                            <Select
                                labelId="home-select"
                                value={form.homeId}
                                label="Home"
                                onChange={(e)=>setForm({...form, homeId: e.target.value})}
                            >
                                {props.homes.length > 0 &&
                                    props.homes.map((home) => {
                                    return (
                                        <MenuItem key={home.homeId} value={home.homeId}>
                                            {home.address.houseName}
                                        </MenuItem> 
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <TextField fullWidth  label="Name" variant="filled" onChange={(e)=>updateForm({ name: e.target.value })}/>
                        <div className='FormWrapper__2'>
                            <TextField fullWidth type="date" label="Arrival Date" variant="filled" onChange={(e)=>updateForm({ arrival: e.target.value })}/>
                            <TextField fullWidth type="date" label="Departure Date" variant="filled" onChange={(e)=>updateForm({ departure: e.target.value })}/>
                        </div>
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Purpose" variant="filled" onChange={(e)=>updateForm({ purpose: e.target.value })}/>
                            <TextField fullWidth  label="Note" variant="filled" onChange={(e)=>updateForm({ note: e.target.value })}/>
                        </div>
                        <div className='Form__Button'>
                            <Button variant='text'>Cancel</Button>
                            <Button variant='text' onClick={()=>console.log(form)}>Check Value</Button>
                            <Button variant='contained' type='submit' className='Submit'>Submit</Button>
                        </div>
                    </form>
                </>
                break;
            default:
                break;
        }
    }

    if(!homes) return <div>Loading...</div>

    return<>
        <Navbar type="vehicle"/>
        <div id='SectionHolder'>
            <section className='Section'>
                <h3 className='SectionTitleDashboard'><span><a href="/visitors">Visitors</a></span> <span>Add Visitors</span></h3>

                <div className='SectionStepper'> 
                    <Button variant='text' className={(stepper === 1)?"active":""} onClick={()=> setStepper(1)}>General Information</Button>
                </div>
                <div className='SectionContent'>
                    <Stepper homes={homes}/>
                </div>
            </section>
        </div>
    </>
}

export default AddVisitor