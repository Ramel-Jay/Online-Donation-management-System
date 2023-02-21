import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import axios from "axios";

function LogOut() {


    useEffect(() => {
        axios.get("http://localhost:3001/auth/logout", { withCredentials: true } ).then((response) => {
            if(response.data.error){
                alert("Error to logout: " + response.data.error);
            }else{
                alert("Logged out");
                <Navigate to="/login" />
                }
            });
    });

    return (
        <div>
            <Navigate to="/login"/>
        </div>
    )
}

export default LogOut
