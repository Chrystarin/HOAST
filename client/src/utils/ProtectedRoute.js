import React, {useState, useEffect} from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import axios from './axios';

const ProtectedRoute = () => {
    //Gets locally stored user
    const user = localStorage.getItem("user");

    const [role, setRoles] = useState()

    useEffect(() => {
		const fetchRole = async () => {
			await axios
				.get(`roles`)
				.then((response) => {
					setRoles(response.data);
                    localStorage.setItem('role', JSON.stringify(response.data))
                    if (response.data.admin.length==1){
                        localStorage.setItem('hoaId', response.data.admin[0])
                    }
                    else if (response.data.guard.length==1){
                        localStorage.setItem('hoaId', response.data.guard[0])
                    }
				});
		};
        fetchRole();
	}, []);

    if (!role) return <div>Loading...</div>

    return(
        // Checks if user exists, if yes proceeds to page, if not proceeds to login
        user
        ? <Outlet/>
        : <Navigate to="/"/>
    );
}

export default ProtectedRoute;