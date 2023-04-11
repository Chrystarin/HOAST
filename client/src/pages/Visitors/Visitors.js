import React, {useState, useEffect} from 'react'
import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card.js';
import axios from '../../utils/axios';
function Visitors() {

    const [visitors, setVisitors] = useState();

    // Retrieves All User Visitors Data onLoad
    useEffect(() => {
        const fetchVisitors = async () => {
            await axios
                .get(`visitors`)
                .then((response) => {
                    setVisitors(response.data);
                });
            };
        fetchVisitors();
    }, []);

    // Returns loading if data is not yet retrieved
    if(!visitors) return <div>Loading...</div>

    return <>
        <Navbar type="visitors"/>
        <div id='SectionHolder'>
            <section className='Section'>
                <h3 className='SectionTitleDashboard'>Visitors</h3>
                <div className='SectionController'>
                <div id='SearchInput__Container'>
                    <SearchInput/>
                </div>
                <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
                <Button variant="contained" href='/visitors/add'>Add Visitors</Button>
                </div>

                <div className='SectionList'>
                    {/* Displays All User's Visitors */}
                    {(visitors.length === 0 )?
                        <p>No Visitors Available!</p>
                        :
                        <>{visitors.length > 0 && visitors.map((visitor) => {
                            return (
                                <Card 
                                type="Vehicles"
                                key={visitor.visitorId}
                                title={visitor.name}
                                subTitle1={new Date(visitor.arrival).toLocaleDateString()}
                                subTitle2={new Date(visitor.departure).toLocaleDateString()}
                                url={`/visitors/${visitor.visitorId}`}
                                />
                            );
                        })}</>
                    }
                </div>
            </section>
        </div>
  </>
}

export default Visitors