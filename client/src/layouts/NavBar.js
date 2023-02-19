import React from 'react';
import Logo from '../images/logo.PNG';
import './NavBar.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import AvatarDrowDown from '../components/AvatarDropDown/AvatarDropDown';
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
              <a href="/visitors" className={(props.type==="visitors")?"active":""}>Visitors</a>
            </li>
            <li>
              <IconButton aria-label="delete" size="large">
                <NotificationsIcon />
              </IconButton>
            </li>
            <li><AvatarDrowDown/></li>
          </ul>
        </div>
    </div>
  )
}

export default NavBar