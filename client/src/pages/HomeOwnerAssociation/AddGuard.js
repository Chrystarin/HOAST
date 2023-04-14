import React, {useState} from 'react';
import {useNavigate} from 'react-router';

import Navbar from '../../layouts/NavBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import axios from '../../utils/axios';
import SideBar from './SideBar';

export default function AddGuard() {

    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [form, setForm] = useState({
        userId: '',
        hoaId: '',
    });
    const [stepper, setStepper] = useState(1);
    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
        
    });}

    // Submit button for adding guard
    async function Submit(e){
        e.preventDefault();

        try{
            await axios
            .post(
                `/hoas/guards`,
                JSON.stringify({ 
                    userId: form.userId,
                    hoaId: form.hoaId
                })
            )
            .then((response) => {
                console.log(JSON.stringify(response?.data));
                alert("Added Guard Succesfully!");
                navigate("/homes");
            })
        }
        catch(err){
            alert("Error Occured!");
            console.error(err.message);
        }

    }

    return <>
        <Navbar type="vehicle"/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Guard"/>
                <div>
                    <h3 className='SectionTitleDashboard'><span>Add Guard</span></h3>
                    <div className='SectionContent'>
                        <form onSubmit={Submit} className='Form'>

                            <div>
                                <SearchInput onChange={(e)=>setSearchText(e.target.value)} value={searchText} placeholder="Search User"/>
                                
                            </div>
                            <p>Selected User:</p>

                            {/* <div className='SectionList'>
                                {(hoas.length === 0 )?
                                    <p>No HOAs Available!</p>
                                    :
                                    <>
                                        {(!searchText) ?
                                            hoas.length > 0 && hoas.map((hoa) => {
                                                return (
                                                    <div className='Card__Horizontal' onClick={()=>{setSelectedHoa(hoa.name); updateForm({ hoaId: hoa.hoaId }) }} key={hoa._id} id={hoa._id}>
                                                        <img src={VillageIcon} alt="" />
                                                        <div>
                                                            <h6>{hoa.name}</h6>
                                                            <p>{hoa.city}</p>
                                                        </div>
                                                    </div> 
                                                );
                                            })
                                        :
                                            filteredHoa.length > 0 && filteredHoa.map((hoa) => {
                                                return (
                                                    <div className='Card__Horizontal' onClick={()=>{setSelectedHoa(hoa.name); updateForm({ hoaId: hoa.hoaId }) }} key={hoa._id} id={hoa._id}>
                                                        <img src={VillageIcon} alt="" />
                                                        <div>
                                                            <h6>{hoa.name}</h6>
                                                            <p>{hoa.city}</p>
                                                        </div>  
                                                    </div> 
                                                );
                                            })
                                        }
                                        
                                    </>
                                }
                            </div> */}
                            <TextField
                                id="filled-password-input"
                                label="HOA ID"
                                type="text"
                                autoComplete="current-password"
                                variant="filled"
                                onChange={(e)=>updateForm({ hoaId: e.target.value })}
                            />
                            <div className='Form__Button'>
                                <Button variant='text' onClick={()=> setStepper(1)}>Back</Button>
                                <Button variant='contained' type='submit' className='Submit'>Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </>
}
