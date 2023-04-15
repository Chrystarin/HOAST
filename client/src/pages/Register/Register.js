import React, {useState} from 'react';

import './Register.scss'

import HouseImg from '../../images/House.png'
import Header from '../../layouts/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from '../../utils/axios';

import { useNavigate } from 'react-router';

function Register() {

    const navigate = useNavigate();

    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setRegisterForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            console.log(registerForm)
            return prev;
        
    });}

    // Submit function for register
    async function Submit(e){
        e.preventDefault();

        try{
            // API call for user signup
            await axios
            .post(
                `users/signup`,
                JSON.stringify({ 
                    firstName: registerForm.firstName,
                    lastName: registerForm.lastName,
                    email: registerForm.email,
                    password: registerForm.password
                }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            .then((response) => {
                alert("Registered Successfully!");
                navigate("/");
            })
        }
        catch(err){
            console.error(err.message);
        }


    }

    return (
        <div>
            <Header/>
            <div className='SectionHolder'>
            <section className='Section' id='Register'>
                <div id='Register__Img'>
                <img src={HouseImg} alt="" />
                </div>
                <div id='Register__Container'>
                <h2 className='Title'>REGISTER</h2>
                <p className='SubTitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eveniet suscipit  libero nesciunt odit quo nobis culpa dignissimos. Aperiam.</p>
                <div className='Register__Form'>
                    <form onSubmit={Submit}>
                    <div className='Input__Wrapper2'>
                        <TextField
                        id="filled-password-input"
                        label="First Name"
                        type="text"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e)=>updateForm({ firstName: e.target.value })}
                        />
                        <TextField
                        id="filled-password-input"
                        label="Last Name"
                        type="text"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e)=>updateForm({ lastName: e.target.value })}
                        />
                    </div>
                    <TextField
                        id="filled-password-input"
                        label="Email"
                        type="text"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e)=>updateForm({ email: e.target.value })}
                    />
                    <TextField
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e)=>updateForm({ password: e.target.value })}
                    />
                    <div>
                        <Button variant="contained" size="large" type='submit' >
                        Register
                        </Button>
                    </div>
                    </form>
                <p id='Register__Note'>Already a member? <a href="/login">Login</a> now!</p>
                </div>
                </div>
            </section>
            </div>
        </div>
    )
}

export default Register;
