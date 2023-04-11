import React, { useEffect, useState } from 'react';

// get data date
// check date against current date
// if date is less than current date, then display unpaid dues
// if date is greater than current date, then display paid dues
function ViewDues(){
    const [dues, duesView] = useState();

    useEffect(() => {
        const fetchHomeDues = async () => {
            await axios
                .get(`dues`, {
                    params: {
                        homeId: `${id}`
                    }
                })
                .then((response) => {
                    duesView(response.data);
                });
        };

        const fetchHOADues = async () => {
            await axios
                .get(`dues`, {
                    params: {
                        hoaId: `${id}`
                    }
                })
                .then((response) => {
                    duesView(response.data);
                });
        };

        fetchHomeDues(); 
        fetchHOADues();
    }, []);

    if (!dues) return <div>Loading...</div>;

    // authorization based
    // if user is admin, then display all dues
    // if user is not admin, then display dues for that user


}

export default ViewDues;