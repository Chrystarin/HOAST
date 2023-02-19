import React,{useState} from 'react';
import './AddHome.scss';
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchInput from '../../components/SearchInput/SearchInput';
import VillageIcon from '../../images/icons/Village.png'
import ResidentCard from '../../components/ResidentCard/ResidentCard';
function AddHome() {
    const [stepper, setStepper] = useState(1);
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
                    <form  className='Form' id='GeneralInformation'>
                        <TextField fullWidth  label="Home Name" variant="filled" />
                        <TextField fullWidth  label="Address Line 1" variant="filled" />
                        <TextField fullWidth  label="Address Line 2" variant="filled" />
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Town or City" variant="filled" />
                            <TextField fullWidth  label="State or Province" variant="filled" />
                        </div>
                        <div className='FormWrapper__2'>
                            <TextField fullWidth  label="Postal Code" variant="filled" />
                            <TextField fullWidth  label="Country" variant="filled" />
                        </div>
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