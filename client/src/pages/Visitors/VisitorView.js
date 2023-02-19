import React,{useState} from 'react'
import Navbar from '../../layouts/NavBar';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import QRCodeCard from '../../layouts/QRCodeCard';
function VisitorView() {
    const [VisitorInfo, setVisitorInfo] = useState({
        name:"Jon Angelo Llagas",
        arrivalDate: "Tue, 07 Feb 20 23 02:37:40 GMT ",
        purpose: "Visitation",
        departureDate:"Tue, 07 Feb 20 23 02:37:40 GMT",
        note:"nothing"

    });
    function createData(name,calories) {
        return { name, calories};
    }
    const rows = [
        createData('Enter', "Tue, 07 Feb 20 23 02:37:40 GMT"),
        createData('Exit', "Tue, 07 Feb 20 23 02:37:40 GMT" ),
    ];
    return <>
        <Navbar type="visitors"/>
        <div id='SectionHolder'>
            <section className='Section'>
            <h3 className='SectionTitleDashboard'><span><a href="/">Visitor</a></span>  > <span>{VisitorInfo.name}</span></h3>
                {/* <div className='SectionController'>
                    
                    <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
                    <Button variant="contained" href='addhome'>Add Home</Button>
                </div> */}
                <div className='SectionContent SectionView' id='ViewResident'>
                    <div className='SectionView__Content' id="ViewResident__Content__Container" >
                        <div className="SectionView__Sections">
                            <h5 className='SectionView__Sections__Title'>
                                General Information
                            </h5>
                            <div id='GeneralInformation__Car'>
                                <div className='Input__Wrapper2'>
                                    <div className='GeneralInformation__InfoContainer '>
                                        <h6>Owner:</h6>
                                        <h5>{VisitorInfo.name}</h5>
                                    </div>
                                    <div className='GeneralInformation__InfoContainer'>
                                        <h6>Arrival Date: </h6>
                                        <h5>{VisitorInfo.arrivalDate}</h5>
                                    </div>
                                </div>
                                <div className='Input__Wrapper2'>
                                    <div className='GeneralInformation__InfoContainer '>
                                        <h6>Purpose:</h6>
                                        <h5>{VisitorInfo.purpose}</h5>
                                    </div>
                                    <div className='GeneralInformation__InfoContainer'>
                                        <h6>Departure Date: </h6>
                                        <h5>{VisitorInfo.departureDate}</h5>
                                    </div>
                                </div>
                                <div className='Input__Wrapper2'>
                                    <div className='GeneralInformation__InfoContainer '>
                                        <h6>Note:</h6>
                                        <h5>{VisitorInfo.note}</h5>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div className="SectionView__Sections">
                            <h5 className='SectionView__Sections__Title'>
                                Logs
                            </h5>
                            <div id='Logs__Container'>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell component="th" align='center'><h6>Access Type</h6></TableCell>
                                                <TableCell align="center"><h6>Timestamp</h6></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row" align='center'>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.calories}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                    <div className='SectionView__SidePanel' id="ViewResident__QRCode__Container">
                        <QRCodeCard/>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default VisitorView