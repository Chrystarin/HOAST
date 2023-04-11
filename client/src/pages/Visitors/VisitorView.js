import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './VisitorView.scss'

import Navbar from '../../layouts/NavBar';
import QRCodeCard from '../../layouts/QRCodeCard';

import axios from '../../utils/axios';

function VisitorView() {
    const { id } = useParams();
    const [visitor, setVisitor] = useState();
    const [logs, setLogs] = useState();

    // Runs onLoad
    useEffect(() => {
        // Retrieves Specific Visitor Data 
        const fetchVisitor = async () => {
            await axios
            .get(`visitors`,{
                    params: {
                        visitorId: `${id}`
                    }
                })
            .then((response) => {
                setVisitor(response.data);
            });
        };

        // Retrieves All of Specific Visitor's Logs Data 
        const fetchLogs = async () => {
            await axios
            .get(`logs`,{
                    params: {
                        objId: `${id}`,
                        logType: 'Visitor'
                    }
                })
            .then((response) => {
                setLogs(response.data);
                console.log(response.data)
            });
        };

        // Executes Functions of fetch visitors and fetch logs
        fetchVisitor();
        fetchLogs();
    }, []);

    // Returns loading if data is not yet retrieved
    if (!visitor || !logs) return <div>Loading...</div>

    return <>
        <Navbar type="visitors"/>
        <div id='SectionHolder'>
            <section className='Section'>
            <h3 className='SectionTitleDashboard'><span><a href="/">Visitor</a></span>  > <span>{visitor.name}</span></h3>
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
                                        <h5>{visitor.name}</h5>
                                    </div>
                                    <div className='GeneralInformation__InfoContainer'>
                                        <h6>Arrival Date: </h6>
                                        <h5>{ new Date(visitor.arrival).toLocaleString() }</h5>
                                    </div>
                                </div>
                                <div className='Input__Wrapper2'>
                                    <div className='GeneralInformation__InfoContainer '>
                                        <h6>Purpose:</h6>
                                        <h5>{visitor.purpose}</h5>
                                    </div>
                                    <div className='GeneralInformation__InfoContainer'>
                                        <h6>Departure Date: </h6>
                                        <h5>{new Date(visitor.departure).toLocaleString()}</h5>
                                    </div>
                                </div>
                                <div className='Input__Wrapper2'>
                                    <div className='GeneralInformation__InfoContainer '>
                                        <h6>Note:</h6>
                                        <h5>{visitor.note}</h5>
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
                                                <TableCell component="th" align='center'><h6>Log Id</h6></TableCell>
                                                <TableCell align="center"><h6>Timestamp</h6></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(logs.length === 0 )?
                                                <p>No Logs Recorded</p>
                                                :
                                                <>{logs.length > 0 && logs.map((log) => {
                                                    return (
                                                        <TableRow
                                                            key={log.logId}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row" align='center'>
                                                                {log.logId}
                                                            </TableCell>
                                                            <TableCell align="center">{new Date(log.createdAt).toLocaleString()}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                                </>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                    <div className='SectionView__SidePanel' id="ViewResident__QRCode__Container">
                        <QRCodeCard objId={visitor.visitorId} logType={'Visitor'} hoaId={visitor.hoa.hoaId}/>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default VisitorView