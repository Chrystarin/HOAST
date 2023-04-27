import React from 'react'
import './QRCodeCard.scss';
import QRCodeimg from '../images/Placeholder/QRcode.png'
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';

function QRCodeCard(props) {

    // download QR Code
    const DownloadQRCode = (divId, filename) => {
        // Get the div element
        const element = document.getElementById(divId);

        // Get the HTML content of the div
        const html = element.innerHTML;
    
        // Create a blob from the HTML content
        // const blob = new Blob([html], { type: "text/html" });
    
        // // Create a URL from the blob
        // const url = URL.createObjectURL(blob);
    
        // // Create a link element
        // const link = document.createElement("a");
    
        // // Set the URL and download attributes of the link element
        // link.href = url;
        // link.download = filename;
    
        // // Append the link element to the body
        // document.body.appendChild(link);
    
        // // Click the link to trigger the download
        // link.click();
    
        // // Remove the link element from the body
        // document.body.removeChild(link);

        html2canvas(element).then(function(canvas) {
            const createImage = canvas.toDataURL("image/png");
            var anchor = document.createElement('a');

            anchor.setAttribute("href", createImage);
            anchor.setAttribute("download", filename);
            anchor.click();
            anchor.remove();
        });
    };

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
            <IconButton onClick={()=>DownloadQRCode("QRCodeContainer", "QRCode.png")} id='DownloadButton' aria-label="add to shopping cart" >
                <FileDownloadIcon />
            </IconButton>
        </div>
    )
}

export default QRCodeCard