import React from 'react';
import "./Contacts.css";
import Nav from "../NavigationBar/Nav";
import Footer from "../Footer/footer";

function Contacts() {
return (
    <div>
        <Nav/>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <p className="contacts-header">CONTACT US</p>
        <br></br>

        <div className="contacts-container">
            <div className="inquiries-container">
                <div className="inquiries">
                    <h2 className="content-header">General Inquiries</h2>
                    <p>Say hello, give us a nice compliment, ask questions, or share your suggestions.
                    </p>
                    <p className='email-color'><a href="mailto:admissionoffice_aclctacloban@yahoo.com" >aclccares@gmail.com</a></p>
                </div>
                
            </div>

            <div className="location-container">
                <div className="location">
                    <h2 className="content-header">Our Location</h2>
                    <p>We are located at 352 Real St. Tacloban City, Tacloban City, Philippines</p>
                    <p className="number-color">0915 767 7449</p>
                </div>
            </div>
        </div>
        <br></br><br></br>
        <div className="map-container">
            <iframe 
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d581.7174074182899!2d125.00421038347547!3d11.238394661575192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3308772d3ec60a1b%3A0xa31812625d7ca506!2sACLC%20College!5e0!3m2!1sen!2sph!4v1675759536957!5m2!1sen!2sph'
                margin={"auto"}
                width="70%" 
                height="450" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
        <Footer/>
    </div>
)
}

export default Contacts
