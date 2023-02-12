import React from 'react'
import './Card.scss'
import CottageIcon from '@mui/icons-material/Cottage';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import KeyIcon from '@mui/icons-material/Key';

function Card(props) {

    return (
        <a href="/">
            <div id='Card'>
                {
                    (props.type ==="Home")?<CottageIcon id="Icon"/>:<DriveEtaIcon id="Icon"/>
                }
                
                <h6>{props.title}</h6>
                <p>{props.subTitle1}</p>
                <p>{props.subTitle2}</p>
                <div>
                    {(props.type ==="Home")?<KeyIcon/>: ""}
                </div>
            </div>
        </a>
    )
}

export default Card