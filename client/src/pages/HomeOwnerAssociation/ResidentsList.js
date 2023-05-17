import React,{useState, useEffect} from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import ResidentCard from '../../components/ResidentCard/ResidentCard';

import Filter from '../../components/Filter/filter';
import SearchInput from '../../components/SearchInput/SearchInput';

import NativeSelect from '@mui/material/NativeSelect';
import axios from '../../utils/axios';
import loading from '../../images/loading.gif';
function ResidentsList() {
    const [residents, setResidents] = useState();
    const [data,setData] = useState({});
    const [filterValue,setFilterValue] = useState(
        {
            sortBy:"A_Z"
        }
    );
    useEffect(() => {

        const fetchResidents = async () => {
            await axios
                .get(`residents`, { 
                    params: { 
                        hoaId: localStorage.getItem('hoaId')
                    } 
                })
                .then((response) => {
                    setResidents(response.data);
            });
        };
        fetchResidents();


        // console.log(residents)
        // console.log(data)
    }, [data]);


    // States for Tabs
    const [stepper, setStepper] = useState(1);
    // States for popup filter
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);



    if(!residents)  return <>
        <div className='Loading'>
        <img src={loading} alt="" />
        <h3>Loading...</h3>
        </div>
    </>

    return <>
        <NavBar/>
        <div className='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="ResidentsList"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Residents List</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput setData={setData} data={residents} keys={['user.name.firstName']} filterValue={filterValue}/>
                        </div>
                        <Filter value={filterValue} setValue={setFilterValue}/>
                    </div>
                    <div className='SectionList'>
                        {(data.length === 0 )?
                            <p>No residents found!</p>
                        :<>
                            {data.length > 0 &&
                            data.map((resident) => {
                                return (
                                    <ResidentCard key={resident._id} username={resident['user.name.firstName']+ ' ' + resident['user.name.lastName']} type={"View"} residentId={resident['user.userId']}/>
                                );
                            })}
                        </>
                        }
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default ResidentsList