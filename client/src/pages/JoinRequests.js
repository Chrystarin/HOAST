import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Card from './../components/Card/Card.js';
import axios from '../utils/axios';

function JoinRequests() {
	const { id } = useParams();
	const [requests, setRequests] = useState();
	// let id = "g1w_aRCLesmE7de1"

	useEffect(() => {
		// Retrieves Requests
		const fetchRequests = async () => {
			const response = await axios
				.get(`requests`, {
					params: {
						hoaId: id
					}
				})
				.then((response) => {
					setRequests(response.data);
					console.log(response.data);
				});
		};
		fetchRequests();
	}, []);

	// Process Request Approval
	async function approveRequest(hoaId, reqId) {
		console.log(hoaId);
		console.log(reqId);
		try {
			await axios
				.patch(
					`requests`,
					JSON.stringify({
						hoaId: hoaId,
						requestId: reqId,
						status: 'approved'
					})
				)
				.then((response) => {
					setRequests(response.data);
					alert('Request Approved!');
					window.location.reload(true);
				});
		} catch (err) {
			console.log(err);
		}
	}

	if (!requests) return <div>Requests Loading...</div>;

	return (
		<div>
			<h1>List of Requests</h1>
			{requests.length === 0 ? (
				<p>No Requests found!</p>
			) : (
				<>
					{requests.length > 0 &&
						requests.map((request) => {
							if (request.status == 'pending')
								return (
									<div
										key={request.requestId}
										style={{
											border: '1px solid rgba(0, 0, 0, 1)',
											padding: '5px',
											margin: '5px'
										}}
									>
										<h3>{request.details.name}</h3>
										<h4>{request.requestor.userId}</h4>
										<button
											onClick={() =>
												approveRequest(
													request.hoa.hoaId,
													request.requestId
												)
											}
										>
											Approve
										</button>
									</div>
								);
						})}
				</>
			)}
		</div>
	);
}

export default JoinRequests;
