import React, { useState, useEffect } from 'react';

import axios from '../../utils/axios';

export default function EditHome() {

    const [user, setUser] = useState()
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const user_id = JSON.parse(localStorage.getItem('user'));
    // console.log(user_id['user'].name.firstName)
    console.log(user_id);

    useEffect(() => {
        const fetchUser = async () => {
            await axios
            .get(`users`)
            .then((response) => {
                setUser(response.data);
                console.log(response.data)
            })
        };
        fetchUser();
    }, []);

    const user_email = user
    console.log(user_email);

    async function Submit(e){
        e.preventDefault();
        try {
            await axios
                .patch(
                    `users`,
                    JSON.stringify({ 
                        firstName: form.firstName,
                        lastName: form.lastName,
                        email: form.email,
                        password: form.password
                    })
                )
                .then((response) => {
                    console.log(response.data)
                })
        } catch(err){

        }
    }

    if(!user) return <div>Loading...</div>

    return (
        // Edit Home
            <div>
                <form onSubmit={Submit}>
                    First Name: <input type="text" value={user_id['user'].name.firstName}/>
                    Last Name: <input type="text" value={user_id['user'].name.lastName}/>
                    Email: <input type="text" value={user.email}/>
                    Passwrod: <input type="text"/>

                    <button type="submit">Submit</button>
                </form> 
            </div>
    )
}