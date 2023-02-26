import React, {useState} from 'react';
import './Login.scss'
import HouseImg from '../../images/House.png'
import Header from '../../layouts/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from '../../configs/axios';
import { useNavigate } from 'react-router';

function Login() {

    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setLoginForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
        
    });}

    async function Submit(e){
        e.preventDefault();

        // console.log(loginForm);

        try{
            // Login
            await axios
            .post(
                `users/login`,
                JSON.stringify({ 
                    email: loginForm.email,
                    password: loginForm.password
                }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            .then((response) => {
                console.log(response.data)
                alert("Logged in Successfully!");
                navigate("/profile");
            })
            
            .catch((error) => {
                console.log('Error:' + error);
                return;
            });
            
        }
        catch(err){
            console.log("caught");
            console.error(err.message);
        }

    }

  return (
    <div>
        <Header/>
        <div id='SectionHolder'>
          <section className='Section' id='Login'>
            <div id='Login__Img'>
              <img src={HouseImg} alt="" />
            </div>
            <div id='Login__Container'>
              <h2 className='Title'>LOGIN</h2>
              <p className='SubTitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eveniet suscipit  libero nesciunt odit quo nobis culpa dignissimos. Aperiam.</p>
              <div className='Login__Form'>
                <form onSubmit={Submit}>
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
                    <Button variant="contained" size="large" type='submit'>
                      Login
                    </Button>
                  </div>
                </form>
                <p id='Login__Note'>Not a member yet? <a href="/register">Register</a> now!</p>
              </div>
            </div>
          </section>
        </div>
    </div>
  )
}

export default Login;
