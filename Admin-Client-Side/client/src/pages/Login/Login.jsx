import React from 'react'
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import image1 from "./Image/aclc1.jpg";
import image2 from "./Image/aclc2.jpg";
import image3 from "./Image/aclc3.png";
import image4 from "./Image/aclc4.JPG";
import logo from "./Image/25th anniv logo update4.png";
import logo2 from "./Image/ACLC COLLEGE LOGO 2022.png";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    const [type, setType]=useState('password');
    const [icon, setIcon]=useState(eyeOff)

    const handleToggle=()=>{
            if(type==='password'){
                setIcon(eye);
                setType('text');
            }
                else{
                setIcon(eyeOff);
                setType('password');
            }}

    const notif = () => {
        toast.success('User Authenticated', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            
        });
        navigate("/dashboard");
    }

    const Login = () => {
        const data = {username: username, password: password};
        axios.post("http://localhost:3001/auth/login", data, {withCredentials: true}).then((response) => {
            if(response.data.error){
                toast.error('Invalid Username or Password', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate("/login");
            }else {
                notif();
            }
        });
    };

    // This is the effects of the slide image
    const properties = {
        duration: 2000,
        transitionDuration: 1000,
        infinite: true,
        arrows: false,
        pauseOnHover: true,
        }

    //This is the array of the image in the slide image
    const images = [
        { src: image1},
        { src: image2},
        { src: image3},
        { src: image4}
        ];

    return(
        <>

        <div className="Container">

        <div className="slideContainer">
            <Slide {...properties}>
                {images.map((image, index) => (
                    <div key={index} className="each-slide">
                        <img src={image.src} style={{width: "59.2vw", height: "48vw"}}/>
                    </div>
                ))}
            </Slide>
        </div>

        {/* <img src={ logo } style={{ width: "5vw", height:  "5vw" }}/> */}
            <div className="LogInContainer">
                <div className="logInForm">
                <img src={ logo } style={{ width: "6vw", height:  "6vw" }} className="logo" />
                <img src={ logo2 } style={{  width: "5vw", height: "5vw" }} className="logo2" />
                    
                    <h1>ADMIN</h1>
                    <input
                        className='username'
                        placeholder='Username'
                        type="text"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    
                    <input
                            className='password'
                            placeholder='Password'
                            type={type}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                    />

                        <span onClick={handleToggle}><Icon icon={icon} size = {25} className="eye-container"/></span>

                </div>
                <button type='submit' className='button' onClick={Login}>Login</button>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme="colored"
                />
            </div>
        </div>
        </>
    )
}

export default Login
