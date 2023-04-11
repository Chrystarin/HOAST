import React, { useState, useEffect } from 'react';
import NavBar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import './Dashboard.scss';
import DuesIcon from '../../images/icons/due-date.png';
import SideBar from './SideBar';
import TextField from '@mui/material/TextField';

import axios from '../../utils/axios';

import './AssociationDues.scss';

function AssociationDues() {
	
	const [form, setForm] = useState({
		homeId: '',
		amount: '',
		months: ''
	});

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
			// Login
			await axios
				.post(
					`dues`,
					JSON.stringify({
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

	return (
		<div>
			<form onSubmit={Submit}>
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
					label="dueDate"
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
