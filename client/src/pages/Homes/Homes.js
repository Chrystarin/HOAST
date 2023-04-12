import React, { useEffect, useState } from 'react';

import Navbar from '../../layouts/NavBar';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import Card from '../../components/Card/Card.js';

import axios from '../../utils/axios';

import './Homes.scss';

function Homes() {
	const [homes, setHomes] = useState();

	useEffect(() => {
		// Retrieves Homes
		const fetchHomes = async () => {
			const response = await axios.get(`homes`).then((response) => {
				setHomes(response.data);
				console.log(response.data);
			});
		};

		fetchHomes();
	}, []);

	// Returns if member is null
	if (!homes) return <div>Loading...</div>;

	return (
		<>
			<Navbar type="home" />
			<div id="SectionHolder">
				<section className="Section">
					<h3 className="SectionTitleDashboard"> Homes</h3>
					<div className="SectionController">
						<div id="SearchInput__Container">
							<SearchInput />
						</div>
						<Button
							variant="text"
							startIcon={<FilterAltIcon />}
						>
							Filter
						</Button>
						<Button
							variant="contained"
							href="/homes/add"
						>
							Add Home
						</Button>
					</div>

					<div className="SectionList">
						{homes.length === 0 ? (
							<p>No homes found!</p>
						) : (
							<>
								{homes.length > 0 &&
									homes.map((home) => {
										return (
											<Card
												type="Home"
												key={home.homeId}
												id={home.homeId}
												title={home.address.houseName}
												subTitle1={
													home.address.houseNumber
												}
												subTitle2={home.address.street}
												url={`/homes/${home.homeId}`}
											/>
										);
									})}
							</>
						)}
					</div>
				</section>
			</div>
		</>
	);
}

export default Homes;
