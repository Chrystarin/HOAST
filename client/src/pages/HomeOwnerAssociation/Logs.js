import React,{useState, useEffect} from 'react'
import NavBar from '../../layouts/NavBar';
import './Dashboard.scss';
import SideBar from './SideBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

import axios from '../../utils/axios';

function Logs() {

    const hoaId = JSON.parse(localStorage.getItem("role")).hoas[0].hoaId;
    const [logs, setLogs] = useState()

    // States for popup filter
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openFilter = Boolean(anchorElFilter);

    // Runs onLoad
	useEffect(() => {
		const fetchLogs = async () => {
			await axios
				.get(`logs`, {
					params: {
						hoaId: hoaId
					}
				})
				.then((response) => {
					setLogs(response.data);
                    console.log(response.data)
				});
		};
		fetchLogs();
	}, []);
    

    const Logs = [
        { id : 'MRPL8S', Resident:"Harold James Castillo", LogType:"Vehicle" ,Timestamp:"Tue, 07 Feb 20 23 02:37:40 GMT"},
        { id : '58365G2', Resident:"Jon Angelo Llagas", LogType:"Vehicle" ,Timestamp:"Tue, 07 Feb 20 23 02:37:40 GMT"},
        { id : 'MRPL8S', Resident:"Dianne Chrystalin Brandez", LogType:"Vehicle" ,Timestamp:"Tue, 07 Feb 20 23 02:37:40 GMT"},
    ];

    if(!logs) return <div>Loading...</div>

    return <>
        <NavBar/>
        <div id='SectionHolder'>
            <section className='Section SectionManage'>
                <SideBar active="Logs"/>
                <div id='HOA__Content'>
                    <h3 className='SectionTitleDashboard'><span><a href="">Logs</a></span></h3>
                    <div className='SectionController'>
                        <div id='SearchInput__Container'>
                            <SearchInput/>
                        </div>
                        <Button variant="" startIcon={<FilterAltIcon/>} onClick={(event) => setAnchorElFilter(event.currentTarget)}>Filter</Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElFilter}
                            open={openFilter}
                            onClose={() => {
                                setAnchorElFilter(null);
                            }}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <div className='Filter'>
                                <h6 className='Filter__Title'>Filter</h6>
                                <ul>
                                    <li>
                                    <p className="BodyText3 Filter__Titles">Sort by</p>
                                    <div>
                                    <NativeSelect
                                        defaultValue={null}
                                        inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option value={10}>A to Z</option>
                                        <option value={20}>Recent Register</option>
                                        <option value={30}>More Residents</option>
                                    </NativeSelect>
                                    </div>
                                    </li>
                                </ul>
                                <div className='Filter__Buttons'>
                                    <div>
                                    <Button variant=''>Reset All</Button>
                                    </div>
                                    <Button variant=''>Cancel</Button>
                                    <Button variant='contained' onClick={() => {setAnchorElFilter(null)}}>Apply</Button>
                                </div>
                            </div>
                        </Menu>
                        <Button variant="contained" href='addhome'>Add Home</Button>
                    </div>
                    <div id='Manage__Hoa' className='SectionView'>
                        <div className='SectionView__Content'>
                            <TableContainer component={Paper} >
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell component="th" align='center'><h6>Plate Number / Visitor ID</h6></TableCell>
                                            <TableCell component="th" align="center"><h6>Resident</h6></TableCell>
                                            <TableCell component="th" align='center'><h6>LogType</h6></TableCell>
                                            <TableCell component="th" align="center"><h6>Timestamp</h6></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {logs.length === 0 ? (
													<></>
                                        ) : (
                                            <>
                                                {logs.length > 0 &&
                                                    logs.map((log) => {
                                                        return (
                                                            <TableRow
                                                                key={log.logId}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row" align='center'>{log.id} </TableCell>
                                                                <TableCell align="center">{log.objectId}</TableCell>
                                                                <TableCell component="th" scope="row" align='center'>{log.id} </TableCell>
                                                                <TableCell align="center">{log.Timestamp}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                            </>
                                        )}

                                        {/* {Logs.map((Log) => (
                                            <TableRow
                                                key={Log.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align='center'>{Log.id} </TableCell>
                                                <TableCell align="center">{Log.Resident}</TableCell>
                                                <TableCell component="th" scope="row" align='center'>{Log.id} </TableCell>
                                                <TableCell align="center">{Log.Timestamp}</TableCell>
                                            </TableRow>
                                        ))} */}
                                    </TableBody>
                                    {/* <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            // count={rows.length}
                                            // rowsPerPage={rowsPerPage}
                                            // page={page}
                                            SelectProps={{
                                                inputProps: {
                                                'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            }}
                                            // onPageChange={handleChangePage}
                                            // onRowsPerPageChange={handleChangeRowsPerPage}
                                            // ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter> */}
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default Logs