import React from 'react';
import Nav from "../NavigationBar/Nav";
import "./Home.css";
import { useState, useEffect, useRef } from 'react';
import image1 from "./image/carousel1.png"
import image2 from "./image/carousel2.jpg"
import image3 from "./image/carousel3.png"
import image4 from "./image/carousel4.jpg"
import image5 from "./image/carousel5.jpg"
import Footer from "../Footer/footer"
import AOS from 'aos';
import 'aos/dist/aos.css';
import post1 from "./image/Image1.jpg";
import post2 from "./image/Image2.jpg";
import benefits from "./image/benefits.png";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";
import { MdToys } from "react-icons/md";

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const[isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const navigate = useNavigate();

    const images = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ];

    useEffect(() => {
        let intervalId = null;

            intervalId = setInterval(() => {
                setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
            }, 5000);
            return () => clearInterval(intervalId);

    }, [currentIndex]);

    useEffect(() => {
        AOS.init();
    }, [])

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsOpen(false);
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
        <Nav/>
        <br></br><br></br><br></br><br></br>
        <div>
            <img className="slideshow-image" src={images[currentIndex]} alt="slideshow"/>
        </div>

        <div className="intro">
            <h3 className="intro-header">LET'S CREATE A BETTER WORLD FOR EVERYONE!</h3>
            <p className="intro-body">2023 could be the year where a little gets clean water for the first time, or a destitute family can eat
                until they are full. You could help start a new year with hope – for the first time since they can remember. Choose to help a kababayan
                in need, choose to donate in ACLC Cares.
            </p>
            <button className="donatebtn" onClick={() => setIsOpen(true)}>DONATE NOW</button>
            {isOpen && (
                <div ref={modalRef} className="home-modal">
                    <div className="home-modal-content">
                        <div className="modal-close">
                            <button onClick={() => setIsOpen(false)}>
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

        <div className="body-container">
        <br></br>
        <h1 className='drivetitle'>RECENT DONATION DRIVE ACTIVITIES</h1>
            <div data-aos="fade-down-right" className="img-container">
                <img src={post1} className="img1"/>
                <div className="post-container">
                    <h6 className="post-header">It's so good to help in Sogod</h6>
                    <p className="img-description">Last January 8, 2022, ACLC Cares, along with the SSC, The Marquee, and the Association of Hospitality Management Students distributed relief goods to the members of the Southern Leyte Baptist Mission and the residents of Brgy. Tampoong (where the mission church is situated) Sogod Southern Leyte.
                    The distribution was spearheaded by missionary Pastor Alfred Cabrigas and his wife Ma'am Hazel Cabrigas together with Christian Jaralbio, a church intern. </p>
                </div>
            </div>
            <div data-aos="fade-down-left" className="img-container">
                <img src={post2} className="img1"/>
                <div className="post-container">
                    <h6 className="post-header">Tabang in Tabangi</h6>
                    <p className="img-description">ACLC Cares went to Tabangi, Southern Leyte for the 2nd wave of its relief operations, distributing relief goods to the victims of Typhoon Odette in the area. A total of P67,262.00 was raised from the students (both SHS and College) and employees last December to January.</p>
                </div>
            </div>
        </div>

        <div className="benefits">
            <h2>Your donations are always used in the best way possible.</h2>
            <p className='benefits-text'>Here in ACLC Cares, recepients of your donations benefit mostly from the following:</p>
            <img src={benefits}/>
        </div>



        
        <Footer/>
    </div>
)
}

export default Home
