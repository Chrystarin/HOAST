import React,{useState} from 'react';
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchInput from '../../components/SearchInput/SearchInput';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import VillageIcon from '../../images/icons/Village.png'
import ResidentCard from '../../components/ResidentCard/ResidentCard';
function AddVehicle() {
    const [stepper, setStepper] = useState(1);
    function Stepper(){
        switch (stepper) {
            case 1:
                return <>
                    <form action="" className='Form'>
                        <TextField fullWidth  label="Plate Number" variant="filled" />
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Model" variant="filled" />
                            <TextField fullWidth  label="Brand" variant="filled" />
                        </div>
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Type" variant="filled" />
                            <TextField fullWidth  label="Color" variant="filled" />
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
        <div id='SectionHolder'>
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