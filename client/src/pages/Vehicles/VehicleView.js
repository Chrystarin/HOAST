import React,{useState, useEffect} from 'react'
import Navbar from '../../layouts/NavBar';

import './VehicleView.scss'

import Card from '../../components/Card/Card.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import QRCodeCard from '../../layouts/QRCodeCard';

import axios from '../../utils/axios';

function VehicleView() {


    const [vehicle, setVehicle] = useState();

    useEffect(() => {
      // Retrieves Vehicles
      const fetchVehicle = async () => {
        const response = await axios
          .get(`vehicles`,{
                params: {
                    plateNumber: '123f',
                    hoaId: 'h4Np5mlWesojCl6'
                }
            })
          .then((response) => {
            setVehicle(response.data);
          });
      };

      fetchVehicle();
    }, []);

    console.log(vehicle);

    const [VehicleInfo, setVehicleInfo] = useState({
        owner:"Harold James H. Castillo",
        brand: "Ford",
        plateNumber: "MRPL8S",
        color:"Black",
        model:"Raptor",
        register:"Tue, 07 Feb 20 23 02:37:40 GMT "
    });
    function createData(name,calories) {
        return { name, calories};
    }
    const rows = [
        createData('Enter', "Tue, 07 Feb 20 23 02:37:40 GMT"),
        createData('Exit', "Tue, 07 Feb 20 23 02:37:40 GMT" ),
    ];
    return <>
        <Navbar type="vehicles"/>
        <div id='SectionHolder'>
            <section className='Section'>
            <h3 className='SectionTitleDashboard'><span><a href="/vehicles">Vehicles</a></span>  > <span>{VehicleInfo.plateNumber}</span></h3>
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
                                        <h5>{VehicleInfo.owner}</h5>
                                    </div>
                                    <div className='GeneralInformation__InfoContainer'>
                                        <h6>Brand: </h6>
                                        <h5>{VehicleInfo.brand}</h5>
                                    </div>
                                </div>
                                <div className='Input__Wrapper2'>
                                    <div className='GeneralInformation__InfoContainer '>
                                        <h6>Plate Number:</h6>
                                        <h5>{VehicleInfo.plateNumber}</h5>
                                    </div>
                                    <div className='GeneralInformation__InfoContainer'>
                                        <h6>Color: </h6>
                                        <h5>{VehicleInfo.color}</h5>
                                    </div>
                                </div>
                                <div className='Input__Wrapper2'>
                                    <div className='GeneralInformation__InfoContainer '>
                                        <h6>Model:</h6>
                                        <h5>{VehicleInfo.model}</h5>
                                    </div>
                                    <div className='GeneralInformation__InfoContainer'>
                                        <h6>Registered Since: </h6>
                                        <h5>{VehicleInfo.register}</h5>
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

export default VehicleView