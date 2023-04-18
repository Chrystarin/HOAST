import React, {useState} from 'react';

import './Login.scss'

import HouseImg from '../../images/House.png'
import Header from '../../layouts/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {useAuth} from '../../utils/AuthContext.js';

function Login() {
    const {login} = useAuth();

    // Contains login input
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
        
    });}

  return (
    <div>
        <Header/>
        <div className='SectionHolder'>
          <section className='Section' id='Login'>
            <div id='Login__Img'>
              <img src={HouseImg} alt="" />
            </div>
            <div id='Login__Container'>
              <h2 className='Title'>LOGIN</h2>
              <p className='SubTitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eveniet suscipit  libero nesciunt odit quo nobis culpa dignissimos. Aperiam.</p>
              <div className='Login__Form'>
                <div className='FormReplacement'>
                    <TextField
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
                        <Button variant="contained" size="large" type='submit' onClick={()=>login(form.email, form.password)}>
                            Login
                        </Button>
                    </div>
                </div>
                <p id='Login__Note'>Not a member yet? <a href="/register">Register</a> now!</p>
              </div>
            </div>
          </section>
        </div>
    </div>
  )
}

export default Login;
