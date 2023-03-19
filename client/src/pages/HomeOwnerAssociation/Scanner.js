import React, {useState} from 'react'
import NavBar from '../../layouts/NavBar';
import './Scanner.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import ScannerImg from '../../images/Placeholder/Scanner.PNG';
import Modal from '@mui/material/Modal';

import QrReader from 'react-qr-scanner'

function Scanner() {
    const [startScan, setStartScan] = useState(false);
    const [loadingScan, setLoadingScan] = useState(false);
    const [data, setData] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleScan = async (scanData) => {
        setLoadingScan(true);
        console.log(`loaded data data`, scanData);
        if (scanData && scanData !== "") {
          console.log(`loaded >>>`, scanData);
          setData(scanData);
          setStartScan(false);
          setLoadingScan(false);
          // setPrecScan(scanData);
        }
    };
    const handleError = (err) => {
        console.error(err);
    };

    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Scanner"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Scanner</a></span></h3>
                    <div className='SectionList' id='QRScanner'>
                        <div id='Scanner'>
                            {/* <img src={ScannerImg} alt="" /> */}
                            <QrReader
                                facingMode="front"
                                delay={1000}
                                onError={handleError}
                                onScan={handleScan}
                                // chooseDeviceId={()=>selected}
                                style={{ width: "100%" }}
                            />
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
                            
                            <Button variant='contained' onClick={handleOpen}>Manual Check</Button>
                            
                        </div>
                    </div>
                </div>
            </section>

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <div id='ManualCheck__Modal'>
                    <div>
                        <h5>#123456</h5>
                        <h5>Harold James Castillo</h5>
                        <p>Homeowner</p>
                        <p>Tue, 07 Feb 20 23 02:37:40 GMT</p>
                    </div>
                    <select name="" id="">
                        <option value="Enter">Enter</option>
                        <option value="Exit">Exit</option>
                    </select>
                    <div>
                        <Button variant='outlined'>Reject</Button>
                        <Button variant='contained'>Accept</Button>
                    </div>
                </div>
            </Modal>
        </div>
    </>
}

export default Scanner