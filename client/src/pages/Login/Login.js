import React from 'react';
import './Login.scss'
import HouseImg from '../../images/House.png'
import Header from '../../layouts/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {
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
                <form action="#">
                  <TextField
                      id="filled-password-input"
                      label="Username"
                      type="text"
                      autoComplete="current-password"
                      variant="filled"
                    />
                    <TextField
                      id="filled-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="filled"
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
