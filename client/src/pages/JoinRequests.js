import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import Card from './../components/Card/Card.js';
import axios from '../utils/axios';

function JoinRequests() {
    const [requests, setRequests] = useState();

    useEffect(() => {
      // Retrieves Requests
      const fetchRequests = async () => {
        const response = await axios
            .get(`requests`, { 
                params: { 
                    hoaId: "h4Np5mlWesojCl6" 
                } 
            })
            .then((response) => {
                setRequests(response.data);
            });
      };
      fetchRequests();
      
    }, []);

    // Process Request Approval
    async function approveRequest(id){
        try{
            await axios
            .patch(`requests`, 
                JSON.stringify({
                    hoaId: 'h4Np5mlWesojCl6',
                    requestId: id,
                    status: 'approved'
                })
            )
            .then((response) => {
                setRequests(response.data);
            });
        }
        catch(err){
            console.log(err)
        }
    }

    if(!requests) return <div>Requests Loading...</div>

    return (
        <div>
        {(requests.length === 0 )?
            <>
            <p>No Requests found!</p>
            </>
        :
            <>
                {requests.length > 0 &&
                requests.map((request) => {
                return (
                    <Card 
                    type="Request"
                    key={request.requestId}
                    id={request.requestId}
                    title={request.homeDetails.houseName}
                    subTitle1={request.requestor.userId}
                    action={()=>approveRequest(request.requestId)}
                    />
                );
                })}
            </>
          }
        </div>
    )
}

export default JoinRequests