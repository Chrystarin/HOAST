import React, {useState, useEffect} from 'react'

import {useNavigate} from 'react-router';

import './AddHome.scss';
import './../../components/SearchInput/SearchInput.scss'

import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchInput from '../../components/SearchInput/SearchInput';
import VillageIcon from '../../images/icons/Village.png'
import loading from '../../images/loading.gif';


import axios from './../../utils/axios';

function AddHome() {
    const navigate = useNavigate();
    
    const [stepper, setStepper] = useState(1);
    const [hoas, setHoas] = useState();
    const [filteredHoa, setFilteredHoa] = useState([])
    const [searchText, setSearchText] = useState("");
    const [selectedHoa, setSelectedHoa] = useState(null);
    const [data,setData] = useState({});
    // Collection of form data
    const [form, setForm] = useState({
        hoaId: '',
        houseName: '',
        houseNumber: '',
        street: '',
        phase: ''
    });

    // Retrieves All HOA Data onLoad
    useEffect(() => {
        const fetchHoas = async () => {
            await axios
            .get(`hoas`)
            .then((response) => {
                setHoas(response.data);
            });
        };
        fetchHoas();
    }, []);

    // Runs search function onLoad for hoa
    

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
    });}

    // Submit Function for Adding Home Request
    async function Submit(e){
        e.preventDefault();
        console.log(form)
        try{
            await axios
            .post(
                `hoas/join`,
                JSON.stringify({ 
                    hoaId: form.hoaId,
                    name: form.houseName,
                    number: form.houseNumber,
                    street: form.street,
                    phase: form.phase
                })
            )
            .then((response) => {
                alert("Request Submitted! Wait for admin to approve your request.");
                navigate("/homes");
            })
        }
        catch(err){
            alert(err.message);
        }
    }
    if(!hoas) return <>
        <div className='Loading'>
            <img src={loading} alt="" />
            <h3>Loading...</h3>
        </div>
    </>
    return<>
        <Navbar type="home"/>
        <div className='SectionHolder'>
            <section className='Section'>
                <h3 className='SectionTitleDashboard'><span><a href="/homes">Homes</a></span> <span>Add Home</span></h3>

                <div className='SectionStepper'> 
                    <Button variant='text' className={(stepper === 1)?"active":""} onClick={()=> setStepper(1)}>General Information</Button>
                    <Button variant='text' className={(stepper === 2)?"active":""} onClick={()=> setStepper(2)}>Join Homeowners Association</Button>
                </div>
                <div className='SectionContent'>
                    {/* <Stepper hoas={hoas}/> */}
                    {stepper==1?<>
                        <div className='Form' id='GeneralInformation'>
                            <TextField fullWidth label="Home Name" variant="filled" onChange={(e)=>updateForm({ houseName: e.target.value })} defaultValue={form.houseName}/>
                            <TextField fullWidth label="Home Number" variant="filled" onChange={(e)=>updateForm({ houseNumber: e.target.value })} defaultValue={form.houseNumber}/>
                            <div className='FormWrapper__2'>
                                <TextField fullWidth  label="Street" variant="filled" onChange={(e)=>updateForm({ street: e.target.value })} defaultValue={form.street}/>
                                <TextField fullWidth  label="Phase" variant="filled" onChange={(e)=>updateForm({ phase: e.target.value })} defaultValue={form.phase}/>
                            </div>
                            <div className='Form__Button'>
                                <Button variant='contained' type='submit' className='Submit' onClick={()=> {setStepper(2);console.log(form)}}>Next</Button>
                            </div>
                        </div>
                    </>:<></>}
                    {stepper==2?<>
                        <form onSubmit={Submit} className='Form' id='GeneralInformation'>
                            <div>
                                <SearchInput setData={setData} data={hoas} keys={["name"]}/>
                            </div>
                            <div className='SectionList'>
                                {(hoas.length === 0 )?
                                    <p>No HOAs Available!</p>
                                    :
                                    <>
                                        {
                                            data.length > 0 && data.map((hoa) => {
                                                return (
                                                    <div className={hoa._id===selectedHoa?'Card__Horizontal Active': 'Card__Horizontal'}  onClick={()=>{setSelectedHoa(hoa._id); updateForm({ hoaId: hoa.hoaId }) }} key={hoa._id} id={hoa._id}>
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
                            </div>
                            <div className='Form__Button'>
                            <Button variant='text' onClick={()=> setStepper(1)}>Back</Button>
                                <Button variant='contained' type='submit' className='Submit' >Submit</Button>
                            </div>
                        </form>
                    </>:<></>}
                </div>
            </section>
        </div>
    </>
}

export default AddHome