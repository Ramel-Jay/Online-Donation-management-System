import React, { useRef, useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import "./Cash.css"
import Nav from "../NavigationBar/Nav";
import Footer from "../Footer/footer";
import Qrcode from "./Image/qrcodes.png";
import PCBackground from "./Image/cashbackground.jpg";
import PhoneBackground from "./Image/cashbackground2.jpg";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DonateNow() {

    const form = useRef();
    const [otherOption, setOtherOption] = useState(false);

    const initialValues = {
        type: "",
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        address: "",
        gender: "",
        amount: "",
        transactionID: "",
        request: 0,
        username: "Pending"
    }

    const validationSchema = Yup.object().shape({
        type: Yup.string().required().notOneOf([""], "Please select a Type"),
        firstName: Yup.string().min(2, "Your Name is too short").required(),
        lastName: Yup.string().required(),
        email: Yup.string().min(7, "Short Email Address").required(),
        number: Yup.number().required(),
        address: Yup.string().min(10, "Short Address").required(),
        gender: Yup.string().required().notOneOf([""], "Please select a Gender"),
        amount: Yup.number().required().notOneOf([""], "Please select an amount or enter an amount"),
        transactionID: Yup.number().required(),
        request: Yup.number().required(),
        username: Yup.string().required(),
    });
    
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/cash", data).then((response) => {
            if (response.data) {
                if(response.data === "Duplicate Entry")
                {
                    toast.error('Duplicate Entry', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                    return;
                }
                console.log(response.data);
                emailjs.sendForm('service_hq85ypr', 'template_exbhjbi', form.current, '5LX1ionb-UB4rjsW0')
                .then((response) => {
                    console.log(response.text);
                    toast.success('Donation Success', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                }, (error) => {
                    alert(error);
                });
            }
            if (response.data.error) {
                alert("Unsuccessful Donation");
            }
        });
    }

    const imageUrl = window.innerWidth >= 650 ? PCBackground : PhoneBackground;
    
return (
    <div>
        {/*Background Image */}
        <div className="Background" style={{backgroundImage: `url(${imageUrl})`}}>
        <Nav/>

        <br></br><br></br><br></br><br></br>

            <p className='cash-quote'>Giving is not just <br></br>
                about making a decision, <br></br>
                it's about making a difference.
            </p>
        
        <div className="instruction-box">
                    <p className='cash-header'>CASH DONATION</p>
                    <p className="instruction">Donators that are affiliated to ACLC are required to fill and submit the Cash Donation form.
                        Outside donators have the choice whether to fill and submit the form or directly donate through
                        the provided QR codes below.
                    </p>
        </div>

        <div className='qrcode-box'>
            <div className='qrcode'><img src={Qrcode}></img></div>
        </div>

        {/*Donation form*/}
        <div className="donation-form">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({setFieldValue}) => (
            <Form className="form-container" ref={form}>
            <h1 className="form-header">Cash Donation Form</h1>
                <div className="donate-column">
                    <Field
                        className="select-field"
                        id="donateNowPost"
                        name="type"
                        placeholder="Type"
                        as="select"
                    >
                    <option value="" className="option-gender">Classification</option>
                    <option value="Student" className="option-gender">Student</option>
                    <option value="Employee" className="option-gender">Employee</option>
                    <option value="Others" className="option-gender">Others</option>
                    </Field>
                        <ErrorMessage name="gender" element={<span />}/>
                    <br/>
                    <Field 
                        className="input-field"
                        name="firstName"
                        placeholder="First Name"
                    />
                    <ErrorMessage name="firstName" element={<span/>}/>
                    <br/>
                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="lastName"
                        placeholder="Last Name"
                    />
                    <ErrorMessage name="lastName" element={<span />}/>
                    <br/>
                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="email"
                        placeholder="Email"
                    />
                    <ErrorMessage name="email" element={<span />}/>
                    <br/>
                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="number"
                        type="number"
                        placeholder="Phone Number"
                    />
                    <ErrorMessage name="number" element={<span />}/>
                    <br/>
                </div>
                <div className="donate-column">
                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="address"
                        placeholder="Address"
                    />
                    <ErrorMessage name="address" element={<span />}/>
                    <br/>
                    <Field
                        className="select-field"
                        id="donateNowPost"
                        name="gender"
                        placeholder="Gender"
                        as="select"
                    >
                    <option value="" className="option-gender">Gender</option>
                    <option value="Male" className="option-gender">Male</option>
                    <option value="Female" className="option-gender">Female</option>
                    <option value="Decline to State" className="option-gender"> Decline to State</option>
                    </Field>
                    <ErrorMessage name="gender" element={<span />}/>
                    <br/>
                    
                    <Field 
                    as="select" 
                    name="amount"
                    className="select-field" 
                    onChange={(e) => {
                    setFieldValue('amount', e.target.value);
                    setOtherOption(e.target.value === 'Others');
                    }}>
                        <option value="" className="option-gender">Select Amount</option>
                        <option value="20" className="option-gender">20</option>
                        <option value="50" className="option-gender">50</option>
                        <option value="100" className="option-gender">100</option>
                        <option value="500" className="option-gender">500</option>
                        <option value="1000" className="option-gender">1000</option>
                        <option value="Others" className="option-gender">Others</option>
                    </Field>
                    <br/>
                    {otherOption && (
                        <Field type="number" name="amount" placeholder="Input Type" className="input-field" />
                    )}
                    <br/>

                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="transactionID"
                        type="number"
                        placeholder="Reference Number"
                    />
                    <ErrorMessage name="transactionID" element={<span />}/>
                    <br/>
                </div>
                <button type="submit" className='btnDonate'>Submit</button>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover={false}
                    theme="light"
                />
            </Form>
            )}
        </Formik>
        </div>
        <br></br>
        </div>
        <Footer/>
    </div>
)
}

export default DonateNow
