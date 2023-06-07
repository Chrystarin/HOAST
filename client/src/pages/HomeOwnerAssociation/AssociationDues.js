import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import './Dashboard.scss';
import SideBar from './SideBar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from '@mui/material/Menu';
import NativeSelect from '@mui/material/NativeSelect';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import WalletIcon from '@mui/icons-material/Wallet';
import axios from '../../utils/axios';
import { TablePagination,TableFooter } from '@mui/material';
import Pagination from '../../components/Pagination/Pagination';
import SearchInput from '../../components/SearchInput/SearchInput';
import './AssociationDues.scss';
import SnackbarComp from '../../components/SnackBar/SnackbarComp';
import Filter from '../../components/Filter/Filter';

function AssociationDues() {
	const [homes, setHomes] = useState();

	const [anchorAddDues, setAnchorAddDues] = useState(null);
	const open = Boolean(anchorAddDues);
	const [openSnackBar, setOpenSnackBar] = React.useState({
		open:false,
		type:"",
		note:""
	});
	const user = JSON.parse(localStorage.getItem('user'));
	// console.log(localStorage.getItem('hoaId'));

    const [selectedHome, setSelectedHome] = useState(null);
    const [selectedPaidUntil, setSelectedPaidUntil] = useState(null);
	const [data,setData] = useState({});
	const [paginationData,setPaginationData]=useState({})
	const [filterValue,setFilterValue] = useState(
		{
			sortBy:"A_Z"
		}
	);
	// Collection of form data
	const [form, setForm] = useState({
		hoaId: '',
		homeId: '',
		amount: '',
		months: ''
	});

	useEffect(() => {
		fetchHomes();
		console.log(data)
	}, [data]);

	function updateForm(e) {
		return setForm((prev) => {
			const [key, value] = Object.entries(e)[0];
			prev[key] = value;
			return prev;
		});
	}

	
	// Retrieves Homes
    const fetchHomes = async () => {
        await axios
            .get(`homes`, {
                params: {
                    hoaId: localStorage.getItem('hoaId')
                }
            })
            .then((response) => {
                setHomes(response.data);
                // console.log(response.data);
            });
    };

	async function Submit(e) {
		e.preventDefault();

		// console.log(new Date(form.months).getMonth());
		try {
			await axios
				.post(
					`dues`,
					JSON.stringify({
						hoaId: localStorage.getItem('hoaId'),
						homeId: form.homeId,
						amount: parseInt(form.amount),
						months: new Date(form.months).getMonth()
					})
				)
				.then((response) => {
					// console.log(response?.data);
                    setAnchorAddDues(null)
					setOpenSnackBar(openSnackBar => ({
						...openSnackBar,
						open:true,
						type:'success',
						note:"Payment Updated!",
					}));
                    fetchHomes();
				});
		} catch (err) {
			setOpenSnackBar(openSnackBar => ({
				...openSnackBar,
				open:true,
				type:'error',
				note:'Invalid Input! ' + err.message,
			}));
			console.error(err.message);
		}
	}

	if (!homes) return <div>Loading...</div>;

	return (
		<>
			<NavBar />
			<div className="SectionHolder">
				<section className="Section SectionManage">
					<SideBar active="AssociationDues" />
					<div id="HOA__Content">
						<h3 className="SectionTitleDashboard">
							<span>
								<a href="">Association Dues</a>
							</span>
						</h3>
						<div className='SectionController'>
							
							{/* <Button variant="contained" onClick={(event) => {setAnchorAddDues(event.currentTarget)}}>New Payment</Button> */}
							<Menu
								id="basic-menu"
								anchorEl={anchorAddDues}
								open={open}
								onClose={() => {setAnchorAddDues(null)}}
								MenuListProps={{
								'aria-labelledby': 'basic-button',
								}}
							>
								<form onSubmit={Submit} className="Form AddDues">
									
									{/* <TextField
										id="filled-password-input"
										label="HOmeId"
										type="text"
										autoComplete="current-password"
										variant="filled"
										disabled
                                        defaultValue={selectedHome}
										// onChange={(e) =>
										// 	updateForm({
										// 		homeId: e.target
										// 			.value
										// 	})
										// }
									/> */}
									<TextField
										id="filled-password-input"
										label="amount"
										InputProps={{
											inputProps: { 
												min: 0
											}
										}}
										type="number"
										autoComplete="current-password"
										variant="filled"
                                        
										onChange={(e) =>
											updateForm({
												amount: e.target
													.value
											})
										}
									/>
									<TextField
										id="filled-password-input"
										label="paidUntil"
										type="date"
										autoComplete="current-password"
										InputProps={{ inputProps: { min: ((new Date(selectedPaidUntil)).getFullYear()) + "-" + String((new Date(selectedPaidUntil)).getMonth() + 1).padStart(2, '0') + "-" + String((new Date(selectedPaidUntil)).getDate()).padStart(2, '0') } }}
										// defaultValue={"2023-01-01"}
                                        defaultValue={((new Date(selectedPaidUntil)).getFullYear()) + "-" + String((new Date(selectedPaidUntil)).getMonth() + 1).padStart(2, '0') + "-" + String((new Date(selectedPaidUntil)).getDate()).padStart(2, '0')}
										variant="filled"
										onChange={(e) =>
											{
												updateForm({
													months: e.target.value
												})
												console.log(e.target.value);
											}
										}
									/>
                                    <div className="Form__Button">
										<Button variant="text" onClick={() => {setAnchorAddDues(null)}}>
											Cancel
										</Button>
										<Button
											variant="contained"
											type="submit"
											className="Submit"
										>
											Submit
										</Button>
									</div>
								</form>
							</Menu>
						</div>
						<div className='SectionController'>
							<div id='SearchInput__Container'>
								<SearchInput setData={setData} data={homes} keys={["homeId","name","owner.name.firstName","owner.name.lastName","status"]}  filterValue={filterValue} />
							</div>
							<Filter value={filterValue} setValue={setFilterValue}/>
						</div>
						<div id='Manage__Hoa' className='SectionView'>
							<div className='SectionView__Content'>
								<TableContainer component={Paper} >
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell component="th" align="center" >
													HomeId
												</TableCell>
												<TableCell component="th" align="center" >
													Name
												</TableCell>
                                                <TableCell component="th" align="center" >
													Homeowner
												</TableCell>
												<TableCell component="th" align="center" >
													Paid Until
												</TableCell>
												<TableCell component="th" align="center" >
													Status
												</TableCell>
                                                
											</TableRow>
										</TableHead>
										<TableBody className='ListBody'>
										{paginationData.length === 0 ? <></> : 
											<>
												{paginationData.length > 0 && paginationData.map( ( home ) => {
                                                    return (
                                                        <TableRow
                                                            key={ home.homeId }
                                                            sx={{ '&:last-child td, &:last-child th':
                                                                    { border: 0 }
                                                            }}
                                                        >
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                align="center"
                                                            >
                                                                { home.homeId }
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                { home.name }
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                { home["owner.name.firstName"] + " " + home["owner.name.lastName"] }
                                                            </TableCell>
                                                            <TableCell
                                                                
                                                                align="center"
                                                            >
                                                                { ((new Date(home.paidUntil)).getMonth() + 1) + " / " + (new Date(home.paidUntil)).getFullYear() }
                                                            </TableCell>
															{new Date().getTime() <= new Date( home.paidUntil ).getTime()
                                                                    ? <>
																		<TableCell align="center" className='ListBody__Green'>
																			Paid
																		</TableCell>
																	</>
                                                                    : <>
																		<TableCell align="center" className='ListBody__Red'>
																			Not Paid
																		</TableCell>
																	</>}
                                                            
                                                            <TableCell align="center">
																<IconButton aria-label="delete" size="small" onClick={(event) => {setAnchorAddDues(event.currentTarget);setSelectedHome(home.homeId);setSelectedPaidUntil(home.paidUntil)}}>
																	<WalletIcon fontSize="small" />
																	Payment
																</IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                                )}
											</>
										}
										</TableBody>
									</Table>
								</TableContainer>
								<div className='Pagination__Container'>
									<Pagination data={data} setter={setPaginationData}/>
								</div>
							</div>
						</div>
					</div>
				</section>
				<SnackbarComp open={openSnackBar} setter={setOpenSnackBar}/>
			</div>
		</>
	);
}

export default AssociationDues;
