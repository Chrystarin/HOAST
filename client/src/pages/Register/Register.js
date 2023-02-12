import React from 'react';
import './Register.scss'
import HouseImg from '../../images/House.png'
import Header from '../../layouts/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function Register() {
  return (
    <div>
        <Header/>
        <div id='SectionHolder'>
          <section className='Section' id='Register'>
            <div id='Register__Img'>
              <img src={HouseImg} alt="" />
            </div>
            <div id='Register__Container'>
              <h2 className='Title'>REGISTER</h2>
              <p className='SubTitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eveniet suscipit  libero nesciunt odit quo nobis culpa dignissimos. Aperiam.</p>
              <div className='Register__Form'>
                <form action="#">
                  <div className='Input__Wrapper2'>
                    <TextField
                      id="filled-password-input"
                      label="First Name"
                      type="text"
                      autoComplete="current-password"
                      variant="filled"
                    />
                    <TextField
                      id="filled-password-input"
                      label="Last Name"
                      type="text"
                      autoComplete="current-password"
                      variant="filled"
                    />
                  </div>
                  <TextField
                    id="filled-password-input"
                    label="Email"
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
