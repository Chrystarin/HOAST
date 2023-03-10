
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SecurityIcon from '@mui/icons-material/Security';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

export default function AvatarDrowDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
                <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar></Avatar>
            </IconButton>
            </Tooltip>
        </Box>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
            <a href='/profile'>
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
            </a>
            <Divider />
            <a href='/dashboard'>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <MapsHomeWorkIcon fontSize="small" />
                    </ListItemIcon>
                    Homeowners Associations
                </MenuItem>
            </a>
            <a href='/scanner'>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SecurityIcon fontSize="small" />
                    </ListItemIcon>
                    Guard
                </MenuItem>
            </a>
            <a href='/'>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </a>
            
        </Menu>
    </React.Fragment>
  );
}