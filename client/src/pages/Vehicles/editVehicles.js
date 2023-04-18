import React, { useState, useEffect } from 'react';

import axios from '../../utils/axios';

export default function EditHome() {

    const [user, setUser] = useState()
    const [form, setForm] = useState({
        color: ''
    })

    async function Submit(e){
        e.preventDefault();
        try {
            await axios
                .patch(
                    `vehicles`,
                    JSON.stringify({ 
                        
                    })
                )
                .then((response) => {
                    console.log(response.data)
                })
        } catch(err){

        }
    }

    return (
        // Edit Home
            <div>
                <form onSubmit={Submit}>
                    
                </form> 
            </div>
    )
}