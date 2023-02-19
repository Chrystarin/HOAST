import React from 'react'
import './QRCodeCard.scss';
import QRCodeimg from '../images/Placeholder/QRcode.png'
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
function QRCodeCard() {
  return (
    <div className='SidePanel__Container' id='QRCodeContainer'>
        <img src={QRCodeimg} alt="" />
        <IconButton id='DownloadButton' aria-label="add to shopping cart">
            <FileDownloadIcon />
        </IconButton>
    </div>
  )
}

export default QRCodeCard