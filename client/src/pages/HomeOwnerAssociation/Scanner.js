import React, {useState} from 'react'
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
    const [manualType, setManualType] = useState();
    const [manualId, setManualId] = useState();
    const [decryptedData, setDecryptedData] = useState();
    const [information, setInformation] = useState();
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

    const fetchVisitor = async (id) => {
        await axios
            .get(`visitors`, {
                params: {
                    visitorId: id,
                    hoaId: localStorage.getItem('hoaId')
                }
            })
            .then((response) => {
                setInformation(response.data);
            });
    };

    const fetchVehicle = async (id) => {
        await axios
            .get(`vehicles`,{
                params: {
                    plateNumber: id,
                    hoaId: localStorage.getItem('hoaId')
                }
            })
            .then((response) => {
                setInformation(response.data);
            });
    };

    const fetchResident = async (id) => {
        await axios
            .get(`residents`, {
                params: {
                    residentId: id,
                    hoaId: localStorage.getItem('hoaId')
                }
            })
            .then((response) => {
                setInformation(response.data);
            });
    };

    // Function upon scanning
    async function handleScan(data){
        if (data) {
            setDecryptedData(JSON.parse(sjcl.decrypt(password, data.text)))
            log = JSON.parse(sjcl.decrypt(password, data.text))
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
        }
    };

    async function manualEntry(){
        switch(manualType){
            case 'visitor':
                await fetchVisitor(manualId);
                break;
            case 'vehicle':
                await fetchVehicle(manualId);
                break;
            case 'user':
                await fetchResident(manualId);
                break;
            default:
                break;
        }
        setOpenConfirmation(true); 
    }

    let handleError = (err) => {
        alert(err);
    };

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
                                    <h5>3:65 PM</h5>
                                </div>
                                <div>
                                    <h6>Date:</h6>
                                    <h5>June 1, 2019</h5>
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
                                    <TextField className='input' id="filled-basic" label="Type" variant="filled" onChange={(e)=>setManualType(e.target.value)}/>
                                    <TextField className='input' id="filled-basic" label="ID" variant="filled" onChange={(e)=>setManualId(e.target.value)} />
                                    <Button variant='contained' onClick={()=> manualEntry()}>Search</Button>
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
            {openConfirmation?<><ScannerConfirmationModal type={manualType ? manualType : decryptedData.logType} info={information} data={decryptedData} close={()=>setOpenConfirmation(false)}/></>:<></>}
        </div>
    </>
}

export default Scanner