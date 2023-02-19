import React,{useState} from 'react'
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddVisitor() {
    const [stepper, setStepper] = useState(1);
    function Stepper(){
        switch (stepper) {
            case 1:
                return <>
                    <form action="" className='Form'>
                        <TextField fullWidth  label="Type" variant="filled" />
                        <TextField fullWidth  label="Name" variant="filled" />
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Arrival Date" variant="filled" />
                            <TextField fullWidth  label="Departure Date" variant="filled" />
                        </div>
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Purpose" variant="filled" />
                            <TextField fullWidth  label="Note" variant="filled" />
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
                <h3 className='SectionTitleDashboard'><span><a href="/visitors">Visitors</a></span>  > <span>Add Visitors</span></h3>

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

export default AddVisitor