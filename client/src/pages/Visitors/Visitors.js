import React, {useState, useEffect} from 'react';
import axios from '../../utils/axios';

import Navbar from '../../layouts/NavBar';
import Card from '../../components/Card/Card.js';
import SearchInput from '../../components/SearchInput/SearchInput';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Pagination from '../../components/Pagination/Pagination';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';
import loading from '../../images/loading.gif';
import Filter from '../../components/Filter/Filter';
function Visitors() {
    const [stepper, setStepper] = useState(1);
    const [visitors, setVisitors] = useState();
    const [data, setData] = useState({});

    const [activeVisitor,setActiveVisitor] = useState({});
    const [paginationDataActiveVisitor,setPaginationDataActiveVisitor]=useState({})
    const [historyVisitor,setHistoryVisitor] = useState({});
    const [paginationDataHistoryVisitor,setPaginationDataHistoryVisitor]=useState({})
    const valueSetter = (data) => {
        setActiveVisitor(data.filter((item)=> new Date(item.departure) >= new Date()))
        setHistoryVisitor(data.filter((item)=> new Date(item.departure) < new Date()))
    }


    const [filterValue,setFilterValue] = useState(
        {
            sortBy:"A_Z"
        }
    );


    

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

        if(data instanceof Array && data.length > 0)
            valueSetter(data)


    }, [data]);

    // Returns loading if data is not yet retrieved
    if(!visitors) return <>
        <div className='Loading'>
            <img src={loading} alt="" />
            <h3>Loading...</h3>
        </div>
    </>

    return <>
        <Navbar type="visitors"/>
        <div className='SectionHolder'>
            <section className='Section'>
                <h3 className='SectionTitleDashboard'>Visitors</h3>
                <div className='SectionStepper'> 
                        <Button variant='text' className={stepper== 1? "active":""} onClick={()=>setStepper(1)}>My Visitors</Button>
                        <Button variant='text' className={stepper== 2? "active":""} onClick={()=>setStepper(2)}>History</Button>
                    </div>
                <div className='SectionController'>
                <div id='SearchInput__Container'>
                    <SearchInput setData={setData} data={visitors} keys={["name","hoa"]} filterValue={filterValue}/>
                </div>
                <Filter value={filterValue} setValue={setFilterValue}/>

                <Button variant="contained" href='/visitors/add'>Add Visitors</Button>
                </div>

                
                    {/* Displays All User's Visitors */}
                    {stepper === 1?<>
                        <div className='SectionList'>
                            {(paginationDataActiveVisitor.length > 0)&&paginationDataActiveVisitor.map((visitor) => {
                                return (
                                    <Card 
                                        type="Visitor"
                                        key={visitor.visitorId}
                                        title={visitor.name}
                                        subTitle1={new Date(visitor.arrival).toLocaleDateString()}
                                        subTitle2={new Date(visitor.departure).toLocaleDateString()}
                                        url={`/visitors/${visitor.visitorId}`}
                                    />
                                );
                            })}
                        </div>
                        <div className='Pagination__Container'>
                            <Pagination data={activeVisitor} setter={setPaginationDataActiveVisitor}/>
                        </div>
                    </>:<></>}
                    {stepper === 2?<>
                        <div className='SectionList'>
                            {(paginationDataHistoryVisitor.length > 0)&&paginationDataHistoryVisitor.map((visitor) => {
                                return (
                                    <Card 
                                        type="Visitor"
                                        key={visitor.visitorId}
                                        title={visitor.name}
                                        subTitle1={new Date(visitor.arrival).toLocaleDateString()}
                                        subTitle2={new Date(visitor.departure).toLocaleDateString()}
                                        url={`/visitors/${visitor.visitorId}`}
                                    />
                                );
                            })}
                        </div>
                        <div className='Pagination__Container'>
                            <Pagination data={historyVisitor} setter={setPaginationDataHistoryVisitor}/>
                        </div>
                    </>:<></>}
                
            </section>
        </div>
    </>
}

export default Visitors