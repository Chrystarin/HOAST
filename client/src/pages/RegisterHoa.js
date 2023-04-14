import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from '../utils/axios';

export default function RegisterHoa() {
	const navigate = useNavigate();

	const [registerForm, setRegisterForm] = useState({
		name: '',
		street: '',
		barangay: '',
		city: '',
		province: ''
	});

	// Retrieves data from text input then assigns to form
	function updateForm(e) {
		return setRegisterForm((prev) => {
			const [key, value] = Object.entries(e)[0];
			prev[key] = value;
			return prev;
		});
	}

	// Submit button for login
	async function Submit(e) {
		e.preventDefault();

		try {
			// Login
			await axios
				.post(
					`hoas/register`,
					JSON.stringify({
						name: registerForm.name,

						street: registerForm.street,
						barangay: registerForm.barangay,
						city: registerForm.city,
						province: registerForm.province
					})
				)
				.then((response) => {
					console.log(JSON.stringify(response?.data));
					alert('Registered Successfully!');
					navigate('/homes');
				});
		} catch (err) {
			alert('Invalid Credentials!');
			console.error(err.message);
		}
	}

	return (
		<div>
			<form onSubmit={Submit}>
				<TextField
					id="filled-password-input"
					label="Name"
					type="text"
					autoComplete="current-password"
					variant="filled"
					onChange={(e) => updateForm({ name: e.target.value })}
				/>
				<TextField
					id="filled-password-input"
					label="Street"
					type="text"
					autoComplete="current-password"
					variant="filled"
					onChange={(e) => updateForm({ street: e.target.value })}
				/>
				<TextField
					id="filled-password-input"
					label="Barangay"
					type="text"
					autoComplete="current-password"
					variant="filled"
					onChange={(e) => updateForm({ barangay: e.target.value })}
				/>
				<TextField
					id="filled-password-input"
					label="City"
					type="text"
					autoComplete="current-password"
					variant="filled"
					onChange={(e) => updateForm({ city: e.target.value })}
				/>
				<TextField
					id="filled-password-input"
					label="Province"
					type="text"
					autoComplete="current-password"
					variant="filled"
					onChange={(e) => updateForm({ province: e.target.value })}
				/>
				<div>
					<Button
						variant="contained"
						size="large"
						type="submit"
					>
						Register
					</Button>
				</div>
			</form>
		</div>
	);
}
