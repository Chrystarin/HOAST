import React,{useState} from 'react';

import {useNavigate} from 'react-router';
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import NativeSelect from '@mui/material/NativeSelect';
import image from '../../images/Placeholder/QRcode.png'
import SnackbarComp from '../../components/SnackBar/SnackbarComp';
import axios from './../../utils/axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddVehicle() {
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
    const [stepper, setStepper] = useState(1);

    const [frontImage, setFrontImage] = useState();
    const [backImage, setBackImage] = useState();

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
            console.log(form)
            return prev;
        
    });}

    // Submit button for login
    async function Submit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append('frontImage', frontImage);
        formData.append('backImage', backImage);
        formData.append('plateNumber', form.plateNumber);
        formData.append('model', form.model);
        formData.append('brand', form.brand);
        formData.append('type', form.type);
        formData.append('color', form.color);

        try{
            // Login
            await axios
            .post(
                `vehicles`,
                formData,
                {headers: { 'Content-Type': 'multipart/form-data' }}
            )
            .then((response) => {
                console.log(JSON.stringify(response?.data));
                navigate("/vehicles");
            })
        }
        catch(err){
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:'error',
                note:err.message,
            }));
        }
    }

    const carTypes = ["Sedan", "SUV", "CUV", "Van", "Truck", "Motorcycle", "Micro", "Hatchback", "Jeep", "Wagon", "Pick-Up", "Mini Van", "Coupe", "Crossover", "Sport Car", "Super Car"];

    return<>
        <Navbar type="vehicle"/>
        <div className='SectionHolder'>
            <section className='Section'>
                <h3 className='SectionTitleDashboard'><span><a href="/vehicles">Vehicles</a></span> > <span>Vehicle Form</span></h3>
                <div className='SectionStepper'> 
                    <Button variant='text' className={(stepper === 1)?"active":""} onClick={()=> setStepper(1)}>General Information</Button>
                </div>
                <div className='SectionContent'>
                    <form onSubmit={Submit} className='Form'>
                        <TextField required fullWidth  label="Plate Number" variant="filled"  onChange={(e)=>updateForm({ plateNumber: e.target.value })}/>
                        <div className='FormWrapper__2'>
                            <TextField required fullWidth  label="Model" variant="filled" onChange={(e)=>updateForm({ model: e.target.value })}/>
                            <TextField required fullWidth  label="Brand" variant="filled" onChange={(e)=>updateForm({ brand: e.target.value })}/>
                        </div>
                        <div className='FormWrapper__2'>
                            {/* <TextField fullWidth  label="Type" variant="filled" onChange={(e)=>updateForm({ type: e.target.value })}/> */}
                            {/* <NativeSelect defaultValue={null} inputProps={{ name: 'age', id: 'uncontrolled-native', }} onChange={(e)=>updateForm({ type: e.target.value })}>
                                <option aria-label="None" value="" />
                                {carTypes.map((type, index) => {
                                    return <option key={index} value={type}>{type}</option>
                                })}
                            </NativeSelect> */}


                            <FormControl variant="filled" required>
                                <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    label="Type"
                                    value={form.type}
                                    onChange={(e)=>setForm({...form, type: e.target.value})}
                                >
                                    {carTypes.map((type, index) => {
                                        return <MenuItem key={index} value={type}>{type}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            
                            <TextField required fullWidth label="Color" variant="filled" onChange={(e)=>updateForm({ color: e.target.value })}/>
                        </div>
                        
                        <div className='FormWrapper__2'>
                            {(!frontImage)?
                                <div className='FormWrapper__2'>
                                    <div className='UploadDocument__Holder'>
                                            <input 
                                                className='UploadDocument__Input' 
                                                accept="image/png, image/jpeg" 
                                                type="file" name="" 
                                                id="upload" 
                                                required
                                                onChange={(e)=>setFrontImage(e.target.files[0])}
                                            />
                                            
                                            <label htmlFor='upload' className='UploadDocument__Holder'  style={{width:"300px"}}>
                                                <div className='UploadDocumentInput__Container'>
                                                    <h6>Upload front picture of the vehicle</h6>
                                                    <p>Make sure the plate number is visible</p>
                                                </div>
                                            </label>
                                        <br />
                                        <img src="" alt="" />
                                    </div>
                                    <div></div>
                                </div>
                                :<>
                            <div>
                                {/* <div className='FormWrapper__2'>
                                    <div className='UploadDocument__Holder'>
                                        <input 
                                            className='UploadDocument__Input' 
                                            accept="image/png, image/jpeg" 
                                            type="file" name="" 
                                            id="upload_front" 
                                            required
                                            onChange={(e)=>setFrontImage(e.target.files[0])}
                                        />
                                        
                                        <label htmlFor='upload_front' className='UploadDocument__Holder'  style={{width:"300px"}}>
                                            <div className='UploadDocumentInput__Container'>
                                                <h6>Upload front picture of the vehicle</h6>
                                                <p>Make sure the plate number is visible</p>
                                            </div>
                                        </label>
                                        <br />
                                        <img src="" alt="" />
                                    </div>
                                    <div></div>
                                </div> */}
                                <img style={{width:"100%"}} src={URL.createObjectURL(frontImage)} alt="" />
                            </div>
                                

                            </>
                            }


                            {(!backImage)?
                                <div className='FormWrapper__2'>
                                    <div className='UploadDocument__Holder'>
                                            <input 
                                                className='UploadDocument__Input' 
                                                accept="image/png, image/jpeg" 
                                                type="file" name="" 
                                                id="upload_Back" 
                                                required
                                                onChange={(e)=>setBackImage(e.target.files[0])}
                                            />
                                            
                                            <label htmlFor='upload_Back' className='UploadDocument__Holder'  style={{width:"300px"}}>
                                                <div className='UploadDocumentInput__Container'>
                                                    <h6>Upload back picture of the vehicle</h6>
                                                    <p>Make sure the plate number is visible</p>
                                                </div>
                                            </label>
                                        <br />
                                    </div>
                                    <div></div>
                                </div>
                            :
                                <div>
                                    {/* <div className='FormWrapper__2'>
                                        <div className='UploadDocument__Holder'>
                                                <input 
                                                    className='UploadDocument__Input' 
                                                    accept="image/png, image/jpeg" 
                                                    type="file" name="" 
                                                    id="upload_Back" 
                                                    required
                                                    onChange={(e)=>setBackImage(e.target.files[0])}
                                                />
                                                
                                                <label htmlFor='upload_Back' className='UploadDocument__Holder'  style={{width:"300px"}}>
                                                    <div className='UploadDocumentInput__Container'>
                                                        <h6>Upload back picture of the vehicle</h6>
                                                        <p>Make sure the plate number is visible</p>
                                                    </div>
                                                </label>
                                            <br />
                                            <img src="" alt="" />
                                        </div>
                                        <div></div>
                                    </div> */}
                                    <img style={{width:"100%"}} src={URL.createObjectURL(backImage)} alt="" />
                                </div>
                            }
                        </div>

                        <div className='Form__Button'>
                            <Button variant='text'>Cancel</Button>
                            <Button variant='contained' type='submit' className='Submit'>Submit</Button>
                        </div>
                    </form>
                </div>
            </section>
            <SnackbarComp open={openSnackBar} setter={setOpenSnackBar}/>
        </div>
    </>
}

export default AddVehicle