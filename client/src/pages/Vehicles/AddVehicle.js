import React,{useState} from 'react';
import {useNavigate} from 'react-router';
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';

import axios from './../../utils/axios';

function AddVehicle() {
    const navigate = useNavigate();

    const [stepper, setStepper] = useState(1);

    const [form, setForm] = useState({
        plateNumber: '',
        model: '',
        brand: '',
        type: '',
        color: ''
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
                `vehicles`,
                JSON.stringify({ 
                    plateNumber: form.plateNumber,
                    model: form.model,
                    brand: form.brand,
                    type: form.type,
                    color: form.color
                })
            )
            .then((response) => {
                console.log(JSON.stringify(response?.data));
                alert("Registered Successfully!");
                navigate("/vehicles");
            })
        }
        catch(err){
            console.error(err.message);
        }
    }

    const carTypes = ["Micro", "Sedan", "Hatchback", "SUV", "Pickup", "Crossover", "Van", "Minivan", "4WD", "Mini Truck", "Wagon", "Liftback", "Coupe", "Sport Car", "Convertible", "CUV"];

    function Stepper(){
        switch (stepper) {
            case 1:
                return <>
                    <form onSubmit={Submit} className='Form'>
                        <TextField fullWidth  label="Plate Number" variant="filled"  onChange={(e)=>updateForm({ plateNumber: e.target.value })}/>
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Model" variant="filled" onChange={(e)=>updateForm({ model: e.target.value })}/>
                            <TextField fullWidth  label="Brand" variant="filled" onChange={(e)=>updateForm({ brand: e.target.value })}/>
                        </div>
                        <div className='FormWrapper__2'>
                            {/* <TextField fullWidth  label="Type" variant="filled" onChange={(e)=>updateForm({ type: e.target.value })}/> */}
                            <NativeSelect defaultValue={null} inputProps={{ name: 'age', id: 'uncontrolled-native', }} onChange={(e)=>updateForm({ type: e.target.value })}>
                                <option aria-label="None" value="" />
                                {carTypes.map((type, index) => {
                                    return <option key={index} value={type}>{type}</option>
                                })}
                            </NativeSelect>
                            <TextField fullWidth  label="Color" variant="filled" onChange={(e)=>updateForm({ color: e.target.value })}/>
                        </div>
                        <div className='Form__Button'>
                            <Button variant='text'>Cancel</Button>
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
        <Navbar type="vehicle"/>
        <div className='SectionHolder'>
            <section className='Section'>
                <h3 className='SectionTitleDashboard'><span><a href="/vehicles">Vehicles</a></span>  > <span>Add Vehicle</span></h3>

                <div className='SectionStepper'> 
                    <Button variant='text' className={(stepper === 1)?"active":""} onClick={()=> setStepper(1)}>General Information</Button>
                </div>
                <div className='SectionContent'>
                    <Stepper/>
                </div>
            </section>
        </div>
    </>
}

export default AddVehicle