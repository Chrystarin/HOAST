import React, {useEffect, useState} from 'react'
import NavBar from '../../layouts/NavBar';
import './Scanner.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Menu from '@mui/material/Menu';
import QrReader from 'react-qr-scanner'
import Fab from '@mui/material/Fab';
import axios from '../../utils/axios';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ScannerConfirmationModal from './ScannerConfirmationModal';
import TextField from '@mui/material/TextField';
import sjcl from '../../layouts/sjcl';

function Scanner() {
    const [data, setData] = useState(null);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openFullScreen, setOpenFullScreen] = useState(false);

    let log = null;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const password = '#WllcDmAgf^SM4qmC%JBG&L95gqU$&MME9X0%XV*g#tKB2psZX';

    useEffect(() => {
        // real time clock
        function currentTime() {
            let date = new Date();

            let hour = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let session = 'AM';

            if (hour == 0) {
                hour = 12;
            }
            if (hour > 12) {
                hour = hour - 12;
                session = 'PM';
            }

            hour = hour < 10 ? '0' + hour : hour;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            let time = hour + ':' + minutes + ':' + seconds + ' ' + session;

            document.getElementById('clock').innerText = time;
            let t = setTimeout(function () {
                currentTime();
            }, 1000);
        };

        // real time date
        function currentDate() {
            let today = new Date();

            let month = today.toLocaleString('default', { month: 'long' });
            let day = today.getDate();
            let year = today.getFullYear();

            let dateToday = month + " " + day + ", " + year;

            document.getElementById('date').innerText = dateToday;
            let d = setTimeout(function (){
                currentDate();
            }, 1000)
        }

        currentTime();
        currentDate();
	}, []);

    // Function upon scanning
    async function handleScan(data){
        if (data) {
            try{
                // log = JSON.parse(decryptData(password, data))
                log = JSON.parse(sjcl.decrypt(password, data.text))
                console.log(log)
                alert("QR Code Detected!")
                
                // Add Record of Log
                await axios
                .post(
                    `logs`,
                    JSON.stringify({
                        objectId: log.objId,
                        logType: log.logType,
                        hoaId: localStorage.getItem('hoaId')
                    })
                )
                .then((response) => {
                    fetch('http://192.168.0.24:80/?header=true')
                    alert("Record Added Successfully!");
                })
            }
            catch(err){
                console.error(err.message);
                fetch('http://192.168.0.24:80/?header=false')
                alert("Record Not Detected!");
            }
        }
    };

    let handleError = (err) => {
        alert(err);
    };

    // Function to decrypt data
    function decryptData(password, encryptedData) {
        return sjcl.decrypt(
            password,
            encryptedData
                .match(/.{2}/g)
                .map(
                    hex =>
                        String.fromCharCode(
                            parseInt(
                                hex,
                                16
                            )
                        )
                )
                .join('')
        );
    }

    return <>
        <NavBar/>
        <div className='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Scanner"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a >Scanner</a></span></h3>
                    <div className='SectionList' id='QRScanner'>
                        <div id="QRScanner__Holder" >
                            <div id={openFullScreen?"ScannerModal":""}>
                                <div id='ScannerModal__Container'>
                                    <QrReader
                                        delay={10000}
                                        onError={handleError}
                                        onScan={handleScan}
                                        style={{ width: '100%' }}
                                        facingmode='front'
                                    />
                                    <div id='ScannerModal__Buttons'>
                                        <Fab  aria-label="add" onClick={()=>{setOpenFullScreen(!openFullScreen)}}>
                                            {!openFullScreen? <FullscreenIcon />:<FullscreenExitIcon/>}
                                        </Fab>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='SidePanel'>
                            <div className='SidePanel__Container' id='DateTime'>
                                <div>
                                    <h6>Time:</h6>
                                    {/* <h5>3:65 PM</h5> */}
                                    <h5 id='clock'></h5>
                                </div>
                                <div>
                                    <h6>Date:</h6>
                                    {/* <h5>June 1, 2019</h5> */}
                                    <h5 id='date'></h5>
                                </div>
                            </div>
                            <Button variant='contained' onClick={handleClick}>Manual Check</Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <div id='ManualInput'>
                                    <TextField className='input' id="filled-basic"  label="Input ID" variant="filled" />
                                    <Button variant='contained' onClick={()=> setOpenConfirmation(true)}>Search</Button>
                                </div>
                            </Menu>
                        </div>
                    </div>
                </div>
            </section>
            <Modal
            open={openConfirmation || openFullScreen}
            onClose={()=>{setOpenConfirmation(false); setOpenFullScreen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <div></div>
            </Modal>
            {openConfirmation?<><ScannerConfirmationModal type={"visitor"} close={()=>setOpenConfirmation(false)}/></>:<></>}
        </div>
    </>
}

export default Scanner