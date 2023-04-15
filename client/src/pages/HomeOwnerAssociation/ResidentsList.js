import React,{useState, useEffect} from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import ResidentCard from '../../components/ResidentCard/ResidentCard';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';
import axios from '../../utils/axios';
function ResidentsList() {
    const Residents = [
        { name : 'David', type : 'Homeowner'},
        { name : 'Harold James Castillo', type : 'Homeowner'},
        { name : 'Damian Criston Castillo', type : 'Resident'},
        { name : 'Dianne Chrystalin', type : 'Homeowner'},
        { name : 'Historia Jalicent Castillo ', type : 'Resident'},
    ];
    const Requests = [
        { name : 'Jon Angelo Llagas', type : 'Homeowner'},
        { name : 'Mary Joyce Reparip', type : 'Resident'},
        { name : 'Gian Carlo Dela Cruz', type : 'Resident'},
        { name : 'John Michael Hipolito', type : 'Resident'},
    ];

    const hoaId = JSON.parse(localStorage.getItem("role")).hoas[0].hoaId;


    const [requests, setRequests] = useState();
    let id = "g1w_aRCLesmE7de1"

    useEffect(() => {
        // Retrieves Requests
        const fetchRequests = async () => {
            await axios
                .get(`requests`, { 
                    params: { 
                        hoaId: hoaId
                    } 
                })
                .then((response) => {
                    setRequests(response.data);
                    console.log(response.data)
            });
        };
        fetchRequests();
        
    }, []);

    async function approveRequest(hoaId, reqId){
        try{
            await axios
            .patch(`requests`, 
                JSON.stringify({
                    hoaId: hoaId,
                    requestId: reqId,
                    status: 'approved'
                })
            )
            .then((response) => {
                setRequests(response.data);
                alert("Request Approved!")
                window.location.reload(true);
            });
        }
        catch(err){
            console.log(err)
        }
    }

    // States for Tabs
    const [stepper, setStepper] = useState(1);
    // States for popup filter
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);

    if(!requests) return <div>Requests Loading...</div>

    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="ResidentsList"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Residents List</a></span></h3>
                    
                    <div className='SectionStepper'> 
                        <Button variant='text' className={stepper== 1? "active":""} onClick={()=>setStepper(1)}>Residents</Button>
                        <Button variant='text' className={stepper== 2? "active":""} onClick={()=>setStepper(2)}>Join Requests</Button>
                        {/* <Button variant='text' className={(stepper === 1)?"active":""} onClick={()=> setStepper(1)}>Incoming</Button>
                        <Button variant='text' className={(stepper === 2)?"active":""} onClick={()=> setStepper(2)}>History</Button> */}
                    </div>
                        {stepper==1?<>
                            <div className='SectionController'>
                                <div id='SearchInput__Container'>
                                    <SearchInput/>
                                </div>
                                <Button variant="" startIcon={<FilterAltIcon/>} onClick={(event) => setAnchorElFilter(event.currentTarget)}>Filter</Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorElFilter}
                                    open={openFilter}
                                    onClose={() => {
                                        setAnchorElFilter(null);
                                    }}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className='Filter'>
                                        <h6 className='Filter__Title'>Filter</h6>
                                        <ul>
                                            <li>
                                            <p className="BodyText3 Filter__Titles">Sort by</p>
                                            <div>
                                            <NativeSelect
                                                defaultValue={null}
                                                inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                                }}
                                            >
                                                <option value={10}>A to Z</option>
                                                <option value={20}>Recent Register</option>
                                                <option value={30}>More Residents</option>
                                            </NativeSelect>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className='Filter__Buttons'>
                                            <div>
                                            <Button variant=''>Reset All</Button>
                                            </div>
                                            <Button variant=''>Cancel</Button>
                                            <Button variant='contained' onClick={() => {setAnchorElFilter(null)}}>Apply</Button>
                                        </div>
                                    </div>
                                </Menu>
                                <Button variant="contained">Add Resident</Button>
                            </div>
                            <div className='SectionList'>
                                {Residents.map((resident) => (
                                    <ResidentCard username={resident.name} type={"View"}/>
                                ))}
                            </div>

                        </>:<></>}
                        {stepper==2?<>
                            <div className='SectionController'>
                                <div id='SearchInput__Container'>
                                    <SearchInput/>
                                </div>
                                <Button variant="" startIcon={<FilterAltIcon/>} onClick={(event) => setAnchorElFilter(event.currentTarget)}>Filter</Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorElFilter}
                                    open={openFilter}
                                    onClose={() => {
                                        setAnchorElFilter(null);
                                    }}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className='Filter'>
                                        <h6 className='Filter__Title'>Filter</h6>
                                        <ul>
                                            <li>
                                            <p className="BodyText3 Filter__Titles">Sort by</p>
                                            <div>
                                            <NativeSelect
                                                defaultValue={null}
                                                inputProps={{
                                                name: 'age',
                                                id: 'uncontrolled-native',
                                                }}
                                            >
                                                <option value={10}>A to Z</option>
                                                <option value={20}>Recent Register</option>
                                                <option value={30}>More Residents</option>
                                            </NativeSelect>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className='Filter__Buttons'>
                                            <div>
                                            <Button variant=''>Reset All</Button>
                                            </div>
                                            <Button variant=''>Cancel</Button>
                                            <Button variant='contained' onClick={() => {setAnchorElFilter(null)}}>Apply</Button>
                                        </div>
                                    </div>
                                </Menu>
                            </div> 
                            <div className='SectionList'>
                                {(requests.length === 0 )?
                                    <p>No Requests found!</p>
                                :
                                    <>
                                        
                                        {requests.length > 0 &&
                                        requests.map((request) => {
                                            if (request.status=='pending'){
                                                return (
                                                    <div key={request.requestId} style={{ border: '1px solid rgba(0, 0, 0, 1)', padding: "5px", margin: "5px" }}>
                                                        <h3>{request.details.name}</h3>
                                                        <h4>{request.requestor.name.firstName}{' '}{request.requestor.name.lastName}</h4>
                                                        <button onClick={()=>approveRequest(request.hoa.hoaId,request.requestId)}>Approve</button>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </>
                                }
                            </div>
                        </>:<></>}
                    </div>
            </section>
        </div>
    </>
}

export default ResidentsList