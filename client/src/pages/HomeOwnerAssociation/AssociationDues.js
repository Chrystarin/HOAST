import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import './Dashboard.scss';
import DuesIcon from '../../images/icons/due-date.png';
import SideBar from './SideBar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from '../../utils/axios';

import './AssociationDues.scss';

function AssociationDues() {
	const [stepper, setStepper] = useState(1);
	const [hoa, setHoa] = useState();
	const [homes, setHomes] = useState();
	const [dues, setDues] = useState();

	const user = JSON.parse(localStorage.getItem('user'));
	console.log(localStorage.getItem('hoaId'));

	// Collection of form data
	const [form, setForm] = useState({
		hoaId: '',
		homeId: '',
		amount: '',
		months: ''
	});

	useEffect(() => {
		// const fetchHoa = async () => {
		// 	await axios
		// 		.get(`hoas`, {
		// 			params: {
		// 				hoaId: localStorage.getItem('hoaId')
		// 			}
		// 		})
		// 		.then((response) => {
		// 			setHoa(response.data);
		// 			const fetchHomes = async () => {
		// 				await axios
		// 					.get(`homes`, {
		// 						params: {
		// 							homeId: response.data.homeId
		// 						}
		// 					})
		// 					.then((response) => {
		// 						setHomes(response.data);
		// 						console.log(response.data);
		// 					});
		// 			};
		// 			const fetchDues = async () => {
		// 				await axios
		// 					.get(`dues`, {
		// 						params: {
		// 							homeId: response.data.homeId
		// 						}
		// 					})
		// 					.then((response) => {
		// 						setDues(response.data);
		// 						console.log(response.data);
		// 					});
		// 			};
		// 			fetchHomes();
		// 			fetchDues();
		// 		});
		// };
		// fetchHoa();

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
					console.log(response.data);
				});
		};
		fetchHomes();
	}, []);

	function updateForm(e) {
		return setForm((prev) => {
			const [key, value] = Object.entries(e)[0];
			prev[key] = value;
			return prev;
		});
	}

	async function Submit(e) {
		e.preventDefault();

		console.log(new Date(form.months).getMonth());
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
					console.log(response?.data);
					alert('Dues Set Successfully!');
					window.location.reload(true);
					// navigate("/homes");
				});
		} catch (err) {
			alert('Invalid Input!');
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
						<div
							id="Manage__Hoa"
							className="SectionView"
						>
							<div className="SectionView__Content">
								<div
									className="SectionView__Sections"
									id="AssociatoinDues__Container"
								>
									<h5 className="SectionView__Sections__Title">
										Association Dues
									</h5>
									<div id="AssociatoinDues__Content">
										{/* <div id="AssociationDues__Card">
											<img
												src={DuesIcon}
												alt=""
											/>
											<div id="">
												<h6>Monthly</h6>
												<p>1,000 Pesos</p>
											</div>
										</div>
										<div></div> */}
										<div>
											<form
												onSubmit={Submit}
												className="Form"
											>
												{/* <FormControl fullWidth>
													<InputLabel
														variant="filled"
														id="home-select"
													>
														Home
													</InputLabel>
													<Select
														labelId="home-select"
														value={form.homeId}
														label="Home"
														onChange={(e) =>
															setForm({
																...form,
																homeId: e.target
																	.value
															})
														}
													>
														{props.homes.length >
															0 &&
															props.homes.map(
																(home) => {
																	return (
																		<MenuItem
																			key={
																				home.homeId
																			}
																			value={
																				home.homeId
																			}
																		>
																			{
																				home.name
																			}
																		</MenuItem>
																	);
																}
															)}
													</Select>
												</FormControl> */}

												<TextField
													id="filled-password-input"
													label="amount"
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
													label="HOmeId"
													type="text"
													autoComplete="current-password"
													variant="filled"
													onChange={(e) =>
														updateForm({
															homeId: e.target
																.value
														})
													}
												/>
												<TextField
													id="filled-password-input"
													label="paidUntil"
													type="date"
													autoComplete="current-password"
													variant="filled"
													onChange={(e) =>
														updateForm({
															months: e.target
																.value
														})
													}
												/>
												<div className="Form__Button">
													<Button variant="text">
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
										</div>
										<div>
											<TableContainer component={Paper}>
												<Table aria-label="simple table">
													<TableHead>
														<TableRow>
															<TableCell
																component="th"
																align="center"
															>
																<h6>HomeId</h6>
															</TableCell>
															<TableCell
																component="th"
																align="center"
															>
																<h6>Name</h6>
															</TableCell>
															<TableCell
																component="th"
																align="center"
															>
																<h6>
																	Paid Until
																</h6>
															</TableCell>
															<TableCell
																component="th"
																align="center"
															>
																<h6>Status</h6>
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{homes.length === 0 ? (
															<></>
														) : (
															<>
																{homes.length > 0 && homes.map((home) => {
																			return (
																				<TableRow
																					key={
																						home.homeId
																					}
																					sx={{
																						'&:last-child td, &:last-child th':
																							{
																								border: 0
																							}
																					}}
																				>
																					<TableCell
																						component="th"
																						scope="row"
																						align="center"
																					>
																						{
																							home.homeId
																						}
																					</TableCell>
																					<TableCell align="center">
																						{
																							home.name
																						}
																					</TableCell>
																					<TableCell
																						component="th"
																						scope="row"
																						align="center"
																					>
																						{
																							((new Date(home.paidUntil)).getMonth() + 1) + " / " + (new Date(home.paidUntil)).getFullYear()
																						}
																					</TableCell>
																					<TableCell align="center">
																						{new Date().getTime() <=
																						new Date(
																							home.paidUntil
																						).getTime()
																							? 'Paid'
																							: 'Unpaid'}
																					</TableCell>
																				</TableRow>
																			);
																		}
																	)}
															</>
														)}
													</TableBody>
												</Table>
											</TableContainer>
										</div>
									</div>
								</div>
							</div>
							<div></div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

export default AssociationDues;
