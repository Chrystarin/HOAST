import React from 'react'

import axios from '../../utils/axios';

export default function EditHome(props) {

    const [name, setName] = useState()
    const [home, setHome] = useState()
    const [residents, setResidents] = useState()

    // Retrieve Home Info
    const fetchHome = async () => {
        await axios
        .get(`homes`,{
                params: {
                    homeId: props.id
                }
            })
        .then((response) => {
            setHome(response.data);
        })
    }

    // Retrieve Home's Residents
    const fetchResidents = async () => {
            await axios
            .get(`homes/residents`)
            .then((response) => {
                setResidents(response.data);
        });
    };
    
    async function Submit(e){
        e.preventDefault();
        try {
            await axios
                .patch(
                    `homes`,
                    JSON.stringify({ 
                        name: form.name
                    })
                )
                .then((response) => {
                    console.log(response.data)
                })
        } catch(err){

        }
    }

    useEffect(() => {
        fetchHome();
        fetchResidents();
	}, []);

    return (
        <div>Edit Home</div>
    )
}
