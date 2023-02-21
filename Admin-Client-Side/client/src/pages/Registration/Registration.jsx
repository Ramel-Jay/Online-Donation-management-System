import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./Registration.css"
import Home from "../Home/Home";
// import { FaUser } from "react-icons/fa";


function Registration() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [adminType, setAdminType] = useState("");
    const [image, setImage] = useState("null");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("firstName", firstName);
        data.append("lastName", lastName);
        data.append("address", address);
        data.append("gender", gender);
        data.append("email", email);
        data.append("number", number);
        data.append("adminType", adminType);
        data.append("image", image);
        data.append("username", username);
        data.append("password", password);

        axios.post("http://localhost:3001/auth", data,{ withCredentials: true })
        .then((response) => {
            if(response.data.error){
                console.log(response.data.error);
                alert("Invalid Input");
            }else{
                alert("Registration Complete");
                navigate("/dashboard");
            }
        });
    };


    return (
        <div className="centerForm">
            <Home/>
            <br></br>
            <h2 className='headerTitle'>ACCOUNT REGISTRATION FORM</h2>
            <form onSubmit={onSubmit} className="registrationForm">
                <div className='column'>
                    <div className="input-field">
                        <input
                            autoComplete='off'
                            type="text" 
                            id="fistName"
                            onChange={(event) => setFirstName(event.target.value)} 
                            required
                        />
                        <label htmlFor='firstName'>First Name</label>
                    </div>

                    <div className='input-field'>
                        <input
                            autoComplete='off'
                            type="text" 
                            id="lastName"
                            onChange={(event) => setLastName(event.target.value)} 
                            required
                        />
                        <label htmlFor='lastName'>Last Name</label>
                    </div>

                    <div className='input-field'>
                        <input
                            autoComplete='off'
                            type="text" 
                            id="address"
                            onChange={(event) => setAddress(event.target.value)}
                            required
                        />
                        <label htmlFor='address'>Address</label>
                    </div>
                    
                    <div className="input-field">
                        <input 
                            autoComplete='off'
                            type="text" 
                            id="gender"
                            onChange={(event) => setGender(event.target.value)} 
                            required
                        />
                        <label htmlFor='Gender'>Gender</label>
                    </div>
                    
                    <div className='input-field'>
                        <input
                            autoComplete='off'
                            type="email" 
                            id="email"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <label htmlFor='email'>Email</label>
                    </div>
                </div>
                
                <div className='column'>

                    <div className="input-field">
                        <input
                            autoComplete='off'
                            type="number" 
                            id="number"
                            onChange={(event) => setNumber(event.target.value)}
                            required
                        />
                        <label htmlFor='number'>Phone Number</label>
                    </div>

                    <div className='input-field'>
                        <input 
                            type="text" 
                            id="adminType"
                            autoComplete='off'
                            onChange={(event) => setAdminType(event.target.value)} 
                            required
                        />
                        <label htmlFor='adminType'>Admin Type</label>
                    </div>

                    <div className="input-field">
                        <input 
                            type="file" 
                            id="image"
                            onChange={(event) => setImage(event.target.files[0])}
                            required
                        />
                    </div>
                    
                    
                    
                    <div className='input-field'>
                        <input 
                            type="text" 
                            id="username"
                            autoComplete='off'
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                        <label htmlFor='username'>Username</label>
                    </div>
                    
                    <div className='input-field'>
                        <input 
                            type="password" 
                            id="password"
                            autoComplete='off'
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <label htmlFor='password'>Password</label>
                    </div>

                    <button type='submit' className="btnSubmit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Registration
