import React, { useState, useRef, useEffect } from 'react'
import "./Nav.css";
import aclc from "./Image/aclccares.png";
import { GiReceiveMoney } from "react-icons/gi";
import { MdToys } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

function Nav() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = new useNavigate();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const [ modal, setModal ] = useState(false);
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    return (
        <div>
            <nav className="navbar">
                <img src={aclc} alt="Logo" className="logo" onClick={() => navigate("/")}/>
                <div className="wide-nav">
                    <p onClick={() => navigate("/")}>Home</p>
                    <p onClick={() => setModal(true)}>Donate</p>
                    <p onClick={() => navigate("/About")}>About</p>
                    <p onClick={() => navigate("/Contact")}>Contact</p>
                </div>
                <div className="toggle" onClick={handleToggle}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={`links ${isOpen ? "show" : ""}`}>
                    <li>
                            <p onClick={() => navigate("/")}>Home</p>
                        </li>

                        <li>
                            <p onClick={() => setModal(true)}>Donate</p>
                        </li>

                        <li>
                            <p onClick={() => navigate("/about")}>About</p>
                        
                        <li>
                            <p onClick={() => navigate("/Contact")}>Contact</p>
                        </li>
                    </li>
                </ul>
            </nav>

            {modal && (
                <div ref={modalRef} className="home-modal">
                    <div className="home-modal-content">
                        <div className="modal-close">
                            <button onClick={() => setModal(false)}>
                                <FaTimes className="home-modal-close"/>
                            </button>
                        </div>
                        <div className="home-modal-header">
                            <h3>Select your donation type</h3>
                        </div>
                        <div className="home-modal-body">
                            <button onClick={() => navigate("/Cash")}>
                                <GiReceiveMoney onClick={() => navigate("/Cash")} className="home-cash-logo"/>
                                <p>Cash</p>
                            </button>
                            <button onClick={() => navigate("/In-Kind")}>
                                <MdToys onClick={() => navigate("/In-Kind")} className="home-cash-logo"/>
                                <p>In Kind</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Nav