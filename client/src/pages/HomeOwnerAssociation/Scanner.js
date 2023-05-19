import React, {useState, useEffect} from 'react'
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
import { AES, enc } from 'crypto-js';
import moment from 'moment';
import SnackbarComp from '../../components/SnackBar/SnackbarComp'

function Scanner() {
    const [scanned, setScanned] = useState(null);
    const [manualType, setManualType] = useState(null);
    const [manualId, setManualId] = useState();
    const [decryptedData, setDecryptedData] = useState();
    const [information, setInformation] = useState();
    const [hoa, setHoa] = useState();
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openFullScreen, setOpenFullScreen] = useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });

    let log = null;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        fetchHoa()
    }, []);

    const fetchVisitor = async (id) => {
        if(id){
            await axios
            .get(`visitors`, {
                params: {
                    visitorId: id,
                    hoaId: localStorage.getItem('hoaId')
                }
            })
            .then((response) => {
                setInformation(response.data);
                if(manualId) setManualType('visitor')
            })
            .catch(()  => {
                console.log("error")
            });
        }
       
    }; 

    const fetchVehicle = async (id) => {
        if(id){
            await axios
                .get(`vehicles`,{
                    params: {
                        plateNumber: id,
                        hoaId: localStorage.getItem('hoaId')
                    }
                })
                .then((response) => {
                    setInformation(response.data);
                })
                .catch(()  => {
                    console.log("error")
                });
        }
    }; 

    const fetchResident = async (id) => {
        if(id){
            await axios
                .get(`residents`, {
                    params: {
                        residentId: id,
                        hoaId: localStorage.getItem('hoaId')
                    }
                })
                .then((response) => {
                    setInformation(response.data);
                })
                .catch(()  => {
                    console.log("error")
                });
        }
    }; 

    const fetchHoa = async (id) => {
        await axios
            .get(`hoas`, {
                params: {
                    hoaId: localStorage.getItem('hoaId')
                }
            })
            .then((response) => {
                setHoa(response.data);
                console.log(response.data)
            });
    };

    // Function upon scanning
    async function handleScan(data){
        if (data) {
            if (!scanned){
                setDecryptedData(
                    JSON.parse(
                        AES.decrypt(
                            data.text, 
                            process.env.REACT_APP_ENCRYPT_KEY
                        )
                        .toString(enc.Utf8)
                    )
                )
    
                log=JSON.parse(AES.decrypt(
                    data.text, 
                    process.env.REACT_APP_ENCRYPT_KEY
                ).toString(enc.Utf8))
                
                switch(log.logType){
                    case 'visitor':
                        await fetchVisitor(log.objId);
                        break;
                    case 'vehicle':
                        await fetchVehicle(log.objId);
                        break;
                    case 'user':
                        await fetchResident(log.objId);
                        break;
                    default:
                        break;
                }
                setOpenConfirmation(true); 
                setScanned(true)
            }
        }
    };

    async function manualEntry(){
        await fetchResident(manualId);
        await fetchVisitor(manualId);
        await fetchVehicle(manualId);
        if(manualType){
            setOpenConfirmation(true);  
        }
    }

    let handleError = (err) => {
        setOpenSnackBar(openSnackBar => ({
            ...openSnackBar,
            open:true,
            type:'error',
            note:err.message,
        }));
    };

    if(!hoa) return <div>Loading...</div>

    if(!hoa.deviceIP) return <div>No Device Connected</div>

    function QRCodeReader(){
        return <>
            {scanned?
                <div>
                    <QrReader
                        onError={handleError}
                        onScan={console.log("closed")}
                        style={{ width: '100%' }}
                        facingmode='front'
                    />
                </div>
            :
            <div>
                <QrReader
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                    facingmode='front'
                />
            </div>   
            }
        </>
    }

    

    

    return <>
        <NavBar/>
        <div className='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Scanner"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a >Scanner</a></span></h3>
                    {(!hoa.deviceIP)? 
                        <div> No Device Connected </div>
                    :
                    <div className='SectionList' id='QRScanner'>
                        <div id="QRScanner__Holder" >
                            <div id={openFullScreen?"ScannerModal":""}>
                                <div id='ScannerModal__Container'>
                                    <QRCodeReader/>
                                    
                                    <div id='ScannerModal__Buttons'>
                                        <Fab  aria-label="add" onClick={()=>{setOpenFullScreen(!openFullScreen)}}>
                                            {!openFullScreen? <FullscreenIcon />:<FullscreenExitIcon/>}
                                        </Fab>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='SidePanel'>
                            {/* <div className='SidePanel__Container' id='DateTime'>
                                <div>
                                    <h6>Time:</h6>
                                    <h5>{moment().format('MMMM Do YYYY, h:mm:ss a')}</h5>
                                </div>
                                <div>
                                    <h6>Date:</h6>
                                    <h5>June 1, 2019</h5>
                                </div>
                            </div> */}
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
                                    {/* <TextField className='input' id="filled-basic" label="Type" variant="filled" onChange={(e)=>setManualType(e.target.value)}/> */}
                                    <TextField className='input' id="filled-basic" label="ID" variant="filled" onChange={(e)=>setManualId(e.target.value)} />
                                    <Button variant='contained' onClick={()=> manualEntry()}>Search</Button>
                                </div>
                            </Menu> 
                        </div>
                    </div>
                    }
                    
                </div>
            </section>
            <Modal
                open={openConfirmation || openFullScreen}
                onClose={()=>{
                    setOpenConfirmation(false); 
                    setOpenFullScreen(false);
                    setScanned(null);
                    setManualType(null);
                    setManualId(null);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <div></div>
            </Modal>
            {openConfirmation?<>
            <ScannerConfirmationModal 
                // type={manualType ? manualType : decryptedData?.logType} 
                type={decryptedData?.logType ?? manualType} 
                info={information} 
                data={decryptedData ?? 
                    JSON.parse(JSON.stringify({
                        logType: manualType,
                        objId: manualId
                    }))
                } 
                ipAdd={hoa.deviceIP} 
                close={()=>{
                    setOpenConfirmation(false);
                    setScanned(null);
                    setManualType(null);
                    setManualId(null);
                }}
            /></>:<></>}
        </div>
    </>
}

export default Scanner