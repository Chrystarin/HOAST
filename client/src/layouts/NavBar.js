import React,{useState} from 'react';
import './NavBar.scss';
import Logo from '../images/logo.PNG';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from '@mui/material/ListItemIcon';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SecurityIcon from '@mui/icons-material/Security';
import CottageIcon from '@mui/icons-material/Cottage';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import {useAuth} from '../utils/AuthContext.js';

function NavBar(props) {
    const {isRole} = useAuth();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const role = JSON.parse(localStorage.getItem("role"));

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const hoaButton = () => {
        // console.log(role.role == 'admin')
        if (isRole('admin')){
            navigate("/dashboard");
        }
        else if (isRole('guard')){
            navigate("/scanner");
        }
        else {
            navigate("/hoa");
        }
        
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setState({ ...state, [anchor]: open });
    };



    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton href="/homes">
                        <ListItemIcon>
                            <CottageIcon /> 
                        </ListItemIcon>
                        <ListItemText primary={"Homes"} />
                    </ListItemButton>
                </ListItem>
                <ListItem  disablePadding>
                    <ListItemButton href="/vehicles">
                        <ListItemIcon>
                            <DirectionsCarIcon /> 
                        </ListItemIcon>
                        <ListItemText primary={"Vehicle"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/visitors">
                        <ListItemIcon>
                            <DirectionsWalkIcon /> 
                        </ListItemIcon>
                        <ListItemText primary={"Visitor"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton href="/profile">
                        <ListItemIcon>
                            <Avatar sx={{ width: 24, height: 24 }}/>
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={hoaButton}>
                        <ListItemIcon>
                            <HomeWorkIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Homeowner Association"} />
                    </ListItemButton>
                </ListItem>
            </List>
            
        </Box>
    );

    const [anchorAvatarDropDown, setAnchorAvatarDropDown] = useState(null);
    const openAvatarDropDown = Boolean(anchorAvatarDropDown);

    const [anchorNotificationDropDown, setAnchorNotificationDropDown] = useState(null);
    const openNotificationDropDown = Boolean(anchorNotificationDropDown);
    return (
        <div id='NavBar'>
            <div id='NavBar__Container'>
                <div id="Logo">
                    <a href="/homes">
                        <img  src={Logo} alt="" />
                    </a>
                </div>
                <ul id='UL_DefaultList'>
                    <li>
                        <a href="/homes" className={(props.type==="home")?"active":""}>Homes</a>
                    </li>
                    <li>
                    <a href="/vehicles" className={(props.type==="vehicles")?"active":""}>Vehicles</a>
                    </li>
                    <li>
                        <a href="/visitors" className={(props.type==="visitors")?"active":""}>Visitors</a>
                    </li>
                    {/* <li>
                        <IconButton onClick={(event)=>setAnchorNotificationDropDown(event.currentTarget)}>
                            <NotificationsIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorNotificationDropDown}
                            id="account-menu"
                            open={openNotificationDropDown}
                            onClose={()=>setAnchorNotificationDropDown(null)}
                            onClick={()=>setAnchorNotificationDropDown(null)}
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                            <div id='Notification'>
                                <h5 id='Notification__Title'>Notification</h5>
                                <ul>
                                <li>
                                    <a href="/" className='active'>
                                    <Avatar/>
                                    <p className="BodyText3">Notification daw kuno</p> 
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                    <Avatar/>
                                    <p className="BodyText3">Notification daw kuno</p> 
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                    <Avatar/>
                                    <p className="BodyText3">Notification daw kuno</p> 
                                    </a>
                                </li>
                                </ul>
                            </div>
                        </Menu>
                    </li> */}
                    <li>
                        <IconButton onClick={(event)=>setAnchorAvatarDropDown(event.currentTarget)}>
                            <Avatar/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorAvatarDropDown}
                            id="account-menu"
                            open={openAvatarDropDown}
                            onClose={()=>setAnchorAvatarDropDown(null)}
                            onClick={()=>setAnchorAvatarDropDown(null)}
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                            <a href={"/profile"}>
                                <MenuItem >
                                    <Avatar /> {user.user.name.firstName}{' '}{user.user.name.lastName}
                                </MenuItem>
                            </a>
                            <Divider />
                                <MenuItem onClick={hoaButton}>
                                    <ListItemIcon>
                                        <MapsHomeWorkIcon fontSize="small" />
                                    </ListItemIcon>
                                    Homeowners Associations
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                        </Menu>
                    </li>
                    
                </ul>
                <ul>
                    <li id='MoreButtom'>
                        <React.Fragment>
                        <IconButton onClick={toggleDrawer('right', true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            {list('right')}
                        </Drawer>
                        </React.Fragment>
                        
                    </li>
                </ul>
            
            </div>
        </div>
    )
}

export default NavBar