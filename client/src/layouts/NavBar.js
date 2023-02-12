import React from 'react';
import Logo from '../images/logo.PNG';
import './NavBar.scss';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
function NavBar(props) {
  return (
    <div id='NavBar'>
        <div id='NavBar__Container'>
          <div id="Logo">
              <a href="/homes">
                  <img  src={Logo} alt="" />
              </a>
          </div>
          <ul>
            <li>
              <a href="/homes" className={(props.type==="home")?"active":""}>Homes</a>
            </li>
            <li>
              <a href="/vehicles" className={(props.type==="vehicles")?"active":""}>Vehicles</a>
            </li>
            <li>
              <a href="/">Visitors</a>
            </li>
            <li>
              <a href="/">Homeowners Associations</a>
            </li>
            <li>
              <a href="/">Guard</a>
            </li>
            <li>
              <IconButton aria-label="delete" size="large">
                <NotificationsIcon />
              </IconButton>
            </li>
            <li>
              <IconButton size="small">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default NavBar