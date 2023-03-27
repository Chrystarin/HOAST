import React, {useState} from 'react';
import {useNavigate} from 'react-router';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from '../utils/axios';

export default function AddGuard() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        userId: '',
        hoaId: '',
    });

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
        
    });}

    // Submit button for adding guard
    async function Submit(e){
        e.preventDefault();

        try{
            await axios
            .post(
                `/hoas/guards`,
                JSON.stringify({ 
                    userId: form.userId,
                    hoaId: form.hoaId
                })
            )
            .then((response) => {
                console.log(JSON.stringify(response?.data));
                alert("Added Guard Succesfully!");
                navigate("/homes");
            })
        }
        catch(err){
            alert("Error Occured!");
            console.error(err.message);
        }

    }

    return (
        <div>
            <form onSubmit={Submit}>
                <TextField
                    id="filled-password-input"
                    label="User ID"
                    type="text"
                    autoComplete="current-password"
                    variant="filled"
                    onChange={(e)=>updateForm({ userId: e.target.value })}
                />
                <TextField
                    id="filled-password-input"
                    label="HOA ID"
                    type="text"
                    autoComplete="current-password"
                    variant="filled"
                    onChange={(e)=>updateForm({ hoaId: e.target.value })}
                />
                <div>
                    <Button variant="contained" size="large" type='submit'>
                        Add Guard
                    </Button>
                </div>
            </form>
        </div>
    )
}
