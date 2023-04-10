import React,{useState} from 'react'
import './Dashboard.scss';

import NavBar from '../../layouts/NavBar';
import Card from '../../components/Card/Card';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';


function VisitorsList() {
    const visitors = [
        { name : 'Jon Angelo Llagas', type : 'Single', date : 'March 2 - March 5'},
        { name : 'Gian, Mary, John, D...', type : 'Multiple', date : 'May 7 - May 18'},
        { name : 'Gian, Mary, John, D...', type : 'Multiple', date : 'May 7 - May 18'}
    ];
    const history = [
        { name : 'David', type : 'Single', date : 'March 2 - March 5'},
        { name : 'Dianne Chrystalin', type : 'Single', date : 'May 7 - May 18'},
    ];
    
    // States for Tabs
    const [stepper, setStepper] = useState(1);
    // States for popup filter
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);

  
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="VisitorsList"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Visitors List</a></span></h3>
                    
                    <div >
                        <div className='SectionStepper'> 
                            <Button variant='text' className={(stepper === 1)?"active":""} onClick={()=> setStepper(1)}>Incoming</Button>
                            <Button variant='text' className={(stepper === 2)?"active":""} onClick={()=> setStepper(2)}>History</Button>
                        </div>
                        <div>
                            {stepper===1?<>
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
                                    {visitors.map((vistor) => (
                                        <Card type="Visitor" title={vistor.name} subTitle1={vistor.type} subTitle2={vistor.date} url="viewvisitor" />
                                    ))}
                                </div>
                            </>:<></>}
                            {stepper===2?<>
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
                                    {history.map((vistor) => (
                                        <Card type="visitor" title={vistor.name} subTitle1={vistor.type} subTitle2={vistor.date} url="viewvisitor" />
                                    ))}
                                </div>
                            </>:<></>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default VisitorsList