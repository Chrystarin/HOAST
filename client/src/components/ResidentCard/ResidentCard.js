import React from 'react';
import './ResidentCard.scss';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { display } from '@mui/system';
function ResidentCard(props) {
    return <>
        {(props.Type == "Edit")?
        <div id='ResidentCard'>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <h6 id='ResidentCard__Name'>{props.UserName}</h6>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </div>
        :
        <a href='/resident/:id'>
            <div id='ResidentCard'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <div>
                    <h5 id='ResidentCard__Name'>{props.UserName}</h5>
                    {(props.type==="Homeowner")?<p>Homeowner</p>:""}
                </div>
            </div>
        </a>
        }
        
    </>
}

export default ResidentCard