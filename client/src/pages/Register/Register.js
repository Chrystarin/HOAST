import React, {useRef, useState} from 'react';

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

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setRegisterForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            console.log(registerForm)
            return prev;
        
    });}

    const validateName = () => {
        if (!registerForm.firstName && registerForm.lastName) {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    };

    const validateEmail = () => {
        if (!registerForm.email.includes('@') || !registerForm.email.endsWith('.com')) {
            setEmailError('Please enter a valid email address');
            return;
        } else {
        setEmailError('');
        // submit logic here if form is valid
        }
    };

    const validatePassword = () => {
        if (!registerForm.password) {
            setPasswordError('Password is required');
        } else if (!/(?=.*[A-Z])(?=.*\d)/.test(registerForm.password)) {
            setPasswordError('Password must contain at least one uppercase letter and one number');
        } else {
            setPasswordError('');
        }
    };

    // Submit function for register
    async function Submit(e){
        e.preventDefault();
        
        validateName();
        validateEmail();
        validatePassword();

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
                        required
                        id="filled-password-input"
                        label="First Name"
                        type="text"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e)=>updateForm({ firstName: e.target.value })}
                        inputProps={{ pattern: "^[a-zA-Z\\s]*$" }}
                        error={!!nameError}
                        helperText={nameError}
                        />
                        <TextField
                        required
                        id="filled-password-input"
                        label="Last Name"
                        type="text"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e)=>updateForm({ lastName: e.target.value })}
                        inputProps={{ pattern: "^[a-zA-Z\\s]*$" }}
                        error={!!nameError}
                        helperText={nameError}
                        />
                    </div>
                    <TextField
                        required
                        id="filled-password-input"
                        label="Email"
                        type="email"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e)=>updateForm({ email: e.target.value })}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        required
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e)=>updateForm({ password: e.target.value })}
                        inputProps={{ pattern: '(?=.*[A-Z])(?=.*\\d).{8,}' }}
                        error={!!passwordError}
                        helperText={passwordError}
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
