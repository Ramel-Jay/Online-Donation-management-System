import React from 'react';
import "./InvalidRoute.css";
import Nav from "../NavigationBar/Nav";
import Footer from "../Footer/footer";
import Error from "./Image/error.jpg"

function InvalidRoute() {
return (
    <div>
        <Nav/>
        <br></br><br></br><br></br><br></br>
        <div className='error'><img src={Error}/></div>
        <Footer/>
    </div>
)
}

export default InvalidRoute
