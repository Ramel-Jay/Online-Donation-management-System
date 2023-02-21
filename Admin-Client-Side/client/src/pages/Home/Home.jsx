import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Home.css";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function Home(){

    const navigate = useNavigate();

    const [ user, setUser ] = useState(null);

    const [ cash, setCash ] = useState(false);

    const [ inKind, seInKind ] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:3001/home", { withCredentials: true }).then((response) => {
            if(response.data.error){
                navigate("/login");
            }else{
                setUser(response.data);
            }
        })
    },[]);

    if (!user) {
        return navigate("/login");
    }

    function home() {
        navigate("/dashboard");
    }

    function register(){
        navigate("/registration");
    }

    return(
        <div>
            <div className="header">
                <h2 className='userName'>{user.username}</h2>
                <Link to="/logout" className='logOut'><IoLogOut size="2em" /></Link>

                <div className='nav'>
                    <button className='dashboard' onClick={home}>Dashboard</button>

                    <button className="item" onClick={() => { setCash(!cash)}}>Cash</button>
                    {cash && (
                        <ul className="cashItems">
                            <Link to="/cashapprove" className='hideItem'>Approve</Link>
                            <hr/>
                            <Link to="/cashdisapprove" className='hideItem'>Disapprove</Link>
                            <hr/>
                            <Link to="/cashpending" className='hideItem'>Pending</Link>
                        </ul>
                    )}
                    
                    <button className='item' onClick={() => { seInKind(!inKind)}}> In Kind</button>
                    {inKind && (
                        <ul className="kindItems">
                            <Link to="/inkindapprove" className='hideItem'>Approve </Link>
                            <hr/>
                            <Link to="/inkinddisapprove" className='hideItem'>Disapprove </Link>
                            <hr/>
                            <Link to="/inkindpending" className='hideItem'> Pending </Link>
                        </ul>
                    )}
                    
                    <button className='registration' onClick={ register }>Registration</button>
                </div>
            </div>
        </div>
    )
};

export default Home;