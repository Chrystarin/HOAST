import React, {useState, useEffect} from 'react';
import axios from '../../utils/axios';

import Navbar from '../../layouts/NavBar';
import Card from '../../components/Card/Card.js';
import SearchInput from '../../components/SearchInput/SearchInput';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';

function Visitors() {

    const [visitors, setVisitors] = useState();
    
    // States for popup filter
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);


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
                                subTitle1={visitor.arrival}
                                subTitle2={visitor.departure}
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