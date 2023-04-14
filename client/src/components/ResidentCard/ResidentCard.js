import React from 'react';
import './ResidentCard.scss';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
function ResidentCard(props) {
    return <>
        {(props.type == "Edit")?
            <div id='ResidentCard'>
                <a href="">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <h6 id='ResidentCard__Name'>{props.username}</h6>
                </a>
                <div id='ResidentCard__Buttons'>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>:<></>
        }
        {(props.type == "View")?<>
            <a href='/resident/:id'>
                <div id='ResidentCard'>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <div>
                        <h6 id='ResidentCard__Name'>{props.username}</h6>
                        {(props.type==="Homeowner")?<p>Homeowner</p>:""}
                    </div>
                </div>
            </a>
            </>:<></>
        }
        {(props.type == "AcceptOrDenie")?
            <div id='ResidentCard'>
                <a href="">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <h6 id='ResidentCard__Name'>{props.username}</h6>
                </a>
                <div id='ResidentCard__Buttons'>
                    <IconButton aria-label="delete">
                        <ClearIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color='primary'>
                        <CheckCircleIcon />
                    </IconButton>
                </div>
            </div>:<></>
        }
    </>
}

export default ResidentCard