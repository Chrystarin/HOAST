import React from 'react'
import './QRCodeCard.scss';
import QRCodeimg from '../images/Placeholder/QRcode.png'
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import QRCode from "react-qr-code";
function QRCodeCard(props) {
    function createQrData(objId, logType, hoaId){
        return JSON.stringify({
            objId: objId,
            logType: logType,
            hoaId: hoaId
        })
    }

    function CardInfo(category){
        switch(category) {
            case 'Vehicle':
                return <div>
                        <h3>Vehicle Pass</h3>
                        <h4>{props.objId}</h4>
                    </div>
            case 'Visitor':
                return <div>
                        <h3>Visitor Pass</h3>
                        <h4>{props.objId}</h4>
                    </div>
            case 'Resident':
                return <div>
                        <h3>Resident Pass</h3>
                        <h4>{props.objId}</h4>
                    </div>
            default: 
                return <div>
                    <h3>Empty Pass</h3>
                </div>
        }

    }

    return (
        <div className='SidePanel__Container' id='QRCodeContainer'>
            {/* <img src={QRCodeimg} alt="" /> */}
            {/* <CardInfo category={props.logType}/> */}
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={createQrData(props.objId, props.logType, props.hoaId)}
                viewBox={`0 0 256 256`}
            />
            <IconButton id='DownloadButton' aria-label="add to shopping cart">
                <FileDownloadIcon />
            </IconButton>
        </div>
  )
}

export default QRCodeCard