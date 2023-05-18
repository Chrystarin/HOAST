import React,{useEffect, useState} from 'react'
import './Dashboard.scss';
import {useAuth} from '../../utils/AuthContext.js';
import SpeedDial from '@mui/material/SpeedDial';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CottageIcon from '@mui/icons-material/Cottage';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
function SideBar(props) {
    const {isRole} = useAuth();
    return (
        <div className='SectionManage__SideNav'>
            <ul>
                {(isRole('admin'))? <>
                        <li>
                            <a href="/dashboard" className={(props.active=="Dashboard")?"active":""}><h6>Dashboard</h6></a>
                        </li>
                        <li>
                            <a href="/associationdues" className={(props.active=="AssociationDues")?"active":""}><h6>Association Dues</h6></a>
                        </li>
                        <li>
                            <a href="guard" className={(props.active=="Guard")?"active":""}><h6>Guards</h6></a>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <a href="/scanner" className={(props.active=="Scanner")?"active":""}><h6>Scanner</h6></a>
                        </li>
                </>}
                <li>
                    <a href="/logs" className={(props.active=="Logs")?"active":""}><h6>Logs</h6></a>
                </li>
                
                <li>
                    <a href="/visitorslist" className={(props.active=="VisitorsList")?"active":""}><h6>Visitors List</h6></a>
                </li>
                <li>
                    <a href="/residentslist" className={(props.active=="ResidentsList")?"active":""}><h6>Residents List</h6></a>
                </li>
                <li>
                    <a href="vehiclelist" className={(props.active=="VehiclesList")?"active":""}><h6>Vehicles List</h6></a>
                </li>
                <li>
                    <a href="homelist" className={(props.active=="HomesList")?"active":""}><h6>Homes List</h6></a>
                </li>
            </ul>
            <div id='SpeedDial'>
                {(isRole('admin')?<>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                        icon={<MoreHorizIcon/>}
                    >
                        <SpeedDialAction
                            icon={<DashboardIcon/>}
                            tooltipTitle={"Dashboard"}
                            href="/dashboard"
                        />
                        <SpeedDialAction
                            icon={<AccountBalanceWalletIcon/>}
                            tooltipTitle={"Dues"}
                            href="/associationdues"
                        />
                        <SpeedDialAction
                            icon={<LocalPoliceIcon/>}
                            tooltipTitle={"Guard"}
                            href="/guard"
                        />
                        <SpeedDialAction
                            icon={<NavigateNextIcon/>}
                            tooltipTitle={"Logs"}
                            href="/logs"
                        />
                        <SpeedDialAction
                            icon={<DirectionsRunIcon/>}
                            tooltipTitle={"Visitor List"}
                            href="/visitorslist"
                        />
                        <SpeedDialAction
                            icon={<PeopleAltIcon/>}
                            tooltipTitle={"Resident List"}
                            href="/residentslist"
                        />
                        <SpeedDialAction
                            icon={<DirectionsCarIcon/>}
                            tooltipTitle={"Vehicle List"}
                            href="/vehiclelist"
                        />
                        <SpeedDialAction
                            icon={<CottageIcon/>}
                            tooltipTitle={"Homes List"}
                            href="/homelist"
                        />
                        
                    </SpeedDial>
                </>:<>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                        icon={<MoreHorizIcon/>}
                    >
                        <SpeedDialAction
                            icon={<QrCodeScannerIcon/>}
                            tooltipTitle={"Scanner"}
                            href="/scanner"
                        />
                        <SpeedDialAction
                            icon={<NavigateNextIcon/>}
                            tooltipTitle={"Logs"}
                            href="/logs"
                        />
                        <SpeedDialAction
                            icon={<DirectionsRunIcon/>}
                            tooltipTitle={"Visitor List"}
                            href="/visitorslist"
                        />
                        <SpeedDialAction
                            icon={<PeopleAltIcon/>}
                            tooltipTitle={"Resident List"}
                            href="/residentslist"
                        />
                        <SpeedDialAction
                            icon={<DirectionsCarIcon/>}
                            tooltipTitle={"Vehicle List"}
                            href="/vehiclelist"
                        />
                        <SpeedDialAction
                            icon={<CottageIcon/>}
                            tooltipTitle={"Homes List"}
                            href="/homelist"
                        />
                        
                    </SpeedDial>
                
                </>)}
                
            </div>
        </div>
    )
}

export default SideBar