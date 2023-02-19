import React,{useState} from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import Card from '../../components/Card/Card';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
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

    const [stepper, setStepper] = useState(1);
    function Stepper(){
        switch (stepper) {
            case 1:
                return <>
                    <div className='SectionList'>
                        {visitors.map((vistor) => (
                            <Card type="Visitor" title={vistor.name} subTitle1={vistor.type} subTitle2={vistor.date} url="viewvisitor" />
                        ))}
                    </div>
                </>
                break;
            case 2:
                return <>
                    <div className='SectionList'>
                        {history.map((vistor) => (
                            <Card type="Home" title={vistor.name} subTitle1={vistor.type} subTitle2={vistor.date} url="viewvisitor" />
                        ))}
                    </div>
                </>
                break;
            
            default:
                break;
        }
    }
    
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="VisitorsList"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Visitors List</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput/>
                        </div>
                        <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
                        <Button variant="contained" href='addhome'>Add Home</Button>
                    </div>
                    <div >
                        <div className='SectionStepper'> 
                            <Button variant='text' className={(stepper === 1)?"active":""} onClick={()=> setStepper(1)}>Incoming</Button>
                            <Button variant='text' className={(stepper === 2)?"active":""} onClick={()=> setStepper(2)}>History</Button>
                        </div>
                        <div>
                            <Stepper/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default VisitorsList