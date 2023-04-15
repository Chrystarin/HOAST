import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

import Navbar from '../../layouts/NavBar';
import VillageIcon from '../../images/icons/Village.png';
import House from '../../images/icons/house.png';
import ResidentCard from '../../components/ResidentCard/ResidentCard';
import Card from '../../components/Card/Card.js';

import './ViewHome.scss'

import axios from '../../utils/axios';

function ViewHome() {

    const CarOwner = {
        title:"#ASC231S",
        subTitle1:"Sportivo",
        subTitle2:"ISUZU"
    }

    const { id } = useParams();
    const [home, setHome] = useState();
    const [residents, setResidents] = useState();
    const [vehicles, setVehicles] = useState();

    useEffect(() => {
        // Retrieves Home Data
        const fetchHome = async () => {
            await axios
            .get(`homes`,{
                    params: {
                        homeId: `${id}`
                    }
                })
            .then((response) => {
                // Assign retrieved value to home constant
                setHome(response.data);
                console.log(response.data)
            });
        };

        const fetchVehicles = async () => {
            await axios
                .get(`vehicles`)
                .then((response) => {
                    setVehicles(response.data);
                    console.log(response.data)
                });
          };
          fetchVehicles();

        // Executes Functions
        fetchHome();
    }, []);

    if(!home || !vehicles) return <div>Loading...</div>

    return <>
        <Navbar type="home"/>
        <div id='SectionHolder'>
            <section className='Section'>
            <h3 className='SectionTitleDashboard'><span><a href="/homes">Homes</a></span>  > {home.address.houseName}</h3>
                <div className='SectionContent' id='ViewHome'>
                    <div id='ViewHome__Content'>
                        <div className='ViewHome__Container' id='HOA__Div'>
                            <h5 className='ViewHome__Title'>Homeowners Association</h5>
                            <div id='HOA__Container'>
                                <img src={VillageIcon} alt="" />
                                <div id='HOA__InfoContainer'>
                                    <div>
                                        <h4>{home.hoa.name}</h4>
                                        <p>{home.hoa.address.city}</p>
                                    </div>
                                    <div>
                                        <h4>HOA Dues Paid Until</h4>
                                        <p>{home.paidUntil}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='ViewHome__Container' id='Residents_div'>
                            <h5 className='ViewHome__Title'>Residents</h5>
                            <div id='Residents_div__Container' className='SectionList'>
                                {(home.residents.length === 0 )?
                                    <p>No Residents Available!</p>
                                    :
                                    <>{home.residents.length > 0 && home.residents.map((resident) => {
                                        return (
                                            <ResidentCard key={resident._id} UserName={resident.user.name.firstName}/>
                                        );
                                    })}</>
                                }
                            </div>
                        </div>
                        <div className='ViewHome__Container' id='Vehicles_div'>
                            <h5 className='ViewHome__Title'>Vehicles</h5>
                            <div className='SectionList'>
                                {(vehicles.length === 0 )?
                                    <p>No vehicles</p>
                                    :
                                    <>{vehicles.length > 0 && vehicles.map((vehicle) => {
                                        return (
                                            <Card 
                                                type="Vehicles"
                                                key={vehicle.plateNumber}
                                                id={vehicle.plateNumber}
                                                title={vehicle.plateNumber}
                                                subTitle1={vehicle.brand}
                                                subTitle2={vehicle.model}
                                                url={`/vehicles/${vehicle.plateNumber}`}
                                            />
                                        );
                                    })}</>
                                }
                                <Card type="Vehicles" {...CarOwner}/>
                            </div>
                        </div>
                        <div className='ViewHome__Container' id='Visitors_div'>
                            <h5 className='ViewHome__Title'>Visitors</h5>
                            <div className='SectionList'>
                                {(home.visitors.length === 0 )?
                                    <p>No visitors</p>
                                    :
                                    <>{home.visitors.length > 0 && home.visitors.map((visitor) => {
                                        return (
                                            <Card type="Visitor" key={visitor.visitorId} title={visitor.name} subTitle1={visitor.arrival} subTitle2={visitor.departure}/>
                                        );
                                    })}</>
                                }
                            </div>
                        </div>
                    </div>
                    <div id='ViewHome__OwnerInfo'>
                        <div>
                            <img src={House} alt="" />
                            <div>
                                <h6>Homeowner: </h6>
                                <h5>{home.owner.name.firstName} {home.owner.name.lastName}</h5>
                            </div>
                            <div>
                                <h6>Address: </h6>
                                <h5>{home.address.number} {home.address.phase} {home.address.street}</h5>
                            </div>
                            {/* <div>
                                <h6>Register Since: </h6>
                                <h5>Tue, 07 Feb 20 23 02:37:40 GMT </h5>
                            </div> */}
                            <Button variant='contained'>Edit Home</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default ViewHome