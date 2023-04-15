import React, {useState, useEffect} from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import axios from './axios';

const ProtectedRoute = () => {
    //Gets locally stored user
    const user = localStorage.getItem("user");

    const [role, setRoles] = useState()

    useEffect(() => {
		// Retrieves Homes
		const fetchRole = async () => {
			await axios
				.get(`roles`)
				.then((response) => {
					setRoles(response.data);
                    localStorage.setItem('role', JSON.stringify(response.data))
				});
		};
    fetchRole();
	}, []);

    if (!role) return <div>Loading...</div>

    // console.log(user)
    // console.log(role)

    return(
        // Checks if user exists, if yes proceeds to page, if not proceeds to login
        user
        ? <Outlet/>
        : <Navigate to="/"/>


        
    );
}

export default ProtectedRoute;