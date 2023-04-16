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

import axios from '../../utils/axios';

import './AssociationDues.scss';

function AssociationDues() {
	const { id } = useParams();

	const [stepper, setStepper] = useState(1);
	const [hoa, setHoa] = useState();
	const [homes, setHomes] = useState();
	const [dues, setDues] = useState()

	// Collection of form data
	const [form, setForm] = useState({
		hoaId: '',
		homeId: '',
		amount: '',
		months: ''
	});

	useEffect(() => {
		const fetchHoa = async () => {
			await axios.get(`hoas`,{
				params: {
					hoaId: `${id}`
				}
			}).then((response) => {
				setHoa(response.data);

				const fetchHomes = async () => {
					await axios.get(`homes`, {
						params: {
							homeId: response.data.homeId
						}
					}
					).then((response) => {
						setHomes(response.data);
						console.log(response.data);
					});
				};
				const fetchDues = async () => {
					await axios.get(`dues`, {
						params: {
							homeId: response.data.homeId
						}
					}).then((response) => {
						setDues(response.data);
						console.log(response.data);
					});
				};

				fetchHomes();
				fetchDues();
			});
		};

		fetchHoa();
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
		try {
			await axios
				.post(
					`dues`,
					JSON.stringify({
						hoaId: `${id}`,
						homeId: form.homeId,
						amount: form.amount,
						months: form.months
					})
				)
				.then((response) => {
					console.log(JSON.stringify(response?.data));
					alert('Dues Set Successfully!');
					// navigate("/homes");
				});
		} catch (err) {
			alert('Invalid Input!');
			console.error(err.message);
		}
	}

	function Stepper(props){
		switch (stepper){
			case 1:
				return (
					<div>
						<form onSubmit={Submit} className="Form">
							{/* Shows HomeIDs */}
							<FormControl fullWidth>
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
											homeId: e.target.value
										})
									}
								>
									{props.homes.length > 0 &&
										props.homes.map((home) => {
											return (
												<MenuItem
													key={home.homeId}
													value={home.homeId}
												>
													{home.name}
												</MenuItem>
											);
										})}
								</Select>
							</FormControl>
			
							<TextField
								id="filled-password-input"
								label="amount"
								type="text"
								autoComplete="current-password"
								variant="filled"
								onChange={(e) => updateForm({ amount: e.target.value })}
							/>
							<TextField
								id="filled-password-input"
								label="paidUntil"
								type="date"
								autoComplete="current-password"
								variant="filled"
								onChange={(e) => updateForm({ month: e.target.value })}
							/>
							<div className="Form__Button">
								<Button variant="text">Cancel</Button>
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
				);
				break;
			default:
				break;
		}
	}

	// if (!dues) return <div>Loading...</div>;

	
	// return <>
	//     <NavBar/>
	//     <div id='SectionHolder'>
	//         <section className='Section SectionManage'>
	//             <SideBar active="AssociationDues"/>
	//             <div id='HOA__Content'>
	//                 <h3 className='SectionTitleDashboard'><span><a href="">Association Dues</a></span></h3>
	//                 <div id='Manage__Hoa' className='SectionView'>
	//                     <div className='SectionView__Content'>
	//                         <div className='SectionView__Sections' id='AssociatoinDues__Container'>
	//                             <h5 className='SectionView__Sections__Title'>Association Dues</h5>
	//                             <div id='AssociatoinDues__Content'>
	//                                 <div id='AssociationDues__Card'>
	//                                     <img src={DuesIcon} alt="" />
	//                                     <div id=''>
	//                                         <h6>Monthly</h6>
	//                                         <p>1,000 Pesos</p>
	//                                     </div>
	//                                 </div>
	//                                 <div></div>
	//                             </div>
	//                         </div>
	//                     </div>
	//                     <div>
	//                     </div>
	//                 </div>
	//             </div>
	//         </section>
	//     </div>
	// </>
}

export default AssociationDues;
