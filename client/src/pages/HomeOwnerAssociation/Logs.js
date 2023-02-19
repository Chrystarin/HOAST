import React from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Logs() {
    function createData(name,calories) {
        return { name, calories};
    }
    const rows = [
        createData('Enter', "Tue, 07 Feb 20 23 02:37:40 GMT"),
        createData('Exit', "Tue, 07 Feb 20 23 02:37:40 GMT" ),
    ];
    const Logs = [
        { id : 'MRPL8S', Resident:"Harold James Castillo", LogType:"Vehicle" , AccessType:"Entry",Timestamp:"Tue, 07 Feb 20 23 02:37:40 GMT"},
        { id : '58365G2', Resident:"Jon Angelo Llagas", LogType:"Vehicle" , AccessType:"Entry",Timestamp:"Tue, 07 Feb 20 23 02:37:40 GMT"},
        { id : 'MRPL8S', Resident:"Dianne Chrystalin Brandez", LogType:"Vehicle" , AccessType:"Entry",Timestamp:"Tue, 07 Feb 20 23 02:37:40 GMT"},
    ];
    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Logs"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Logs</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput/>
                        </div>
                        <Button variant="text" startIcon={<FilterAltIcon/>}>Filter</Button>
                        <Button variant="contained" href='addhome'>Add Home</Button>
                    </div>
                    <div id='Manage__Hoa' className='SectionView'>
                        <div className='SectionView__Content'>
                            <TableContainer component={Paper} >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell component="th" align='center'><h6>Plate Number / Visitor ID</h6></TableCell>
                                                <TableCell component="th" align="center"><h6>Resident</h6></TableCell>
                                                <TableCell component="th" align='center'><h6>LogType</h6></TableCell>
                                                <TableCell component="th" align="center"><h6>Access Type</h6></TableCell>
                                                <TableCell component="th" align="center"><h6>Timestamp</h6></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {Logs.map((Log) => (
                                            <TableRow
                                            key={Log.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align='center'>{Log.id} </TableCell>
                                                <TableCell align="center">{Log.Resident}</TableCell>
                                                <TableCell component="th" scope="row" align='center'>{Log.id} </TableCell>
                                                <TableCell align="center">{Log.AccessType}</TableCell>
                                                <TableCell align="center">{Log.Timestamp}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                            </TableContainer>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default Logs