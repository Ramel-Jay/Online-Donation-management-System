import React, { useRef, useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import "./InKind.css"
import Nav from "../NavigationBar/Nav"
import Footer from "../Footer/footer";
import Address from "./Image/address.png";
import PCBackground from "./Image/kindbackground.jpg";
import PhoneBackground from "./Image/kindbackground2.jpg";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function InKind() {

    const form = useRef();
    const [otherOption, setOtherOption] = useState(false);
    const [courierType, setCourierType] = useState(false);

    const initialValues = {
        classification: "",
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        number: "",
        address: "",
        type: "",
        quantity: "",
        amount: "",
        rName: "",
        rNum: "",
        request: 0,
        username: "Pending",
    }

    const validationSchema = Yup.object().shape({
        classification: Yup.string().required().notOneOf([""], "Please select a Classification"),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        gender: Yup.string().required().notOneOf([""], "Please Select a Gender"),
        email: Yup.string().min(7, "Short Email Address").required(),
        number: Yup.number().required(),
        address: Yup.string().min(10, "Short Address").required(),
        type: Yup.string().required().notOneOf([""], "Please Select a Type of Item"),
        quantity: Yup.number().required(),
        amount: Yup.number().required(),
        rName: Yup.string().required().notOneOf([""], "Please Select Courier Name"),
        rNum: Yup.number().required(),
        request: Yup.number().required(),
        username: Yup.string().required(),
    });
    
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/inkind", data).then((response) => {
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
                    console.log(error.text);
                });
            }
            else {
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

        <p className='kind-quote'>Real generosity <br></br>
            towards the future lies <br></br>
            in giving all to the present.
        </p>
        
        <div className="kindinstruction-box">
                    <p className='kind-header'>IN KIND DONATION</p>
                    <p className="instruction">All donators, affiliated with ACLC or not, must fill and submit the In Kind
                        Donation Form after sending your donation to the delivery address below.
                    </p>
        </div>

        <div className='address-box'>
            <div className='address'><img src={Address}></img></div>
        </div>

        <div className="donation-form">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({setFieldValue}) => (
            <Form className="kindform-container" ref={form}>
                <h1 className="form-header">In Kind Donation form</h1>
                <div className="donate-column">

                <Field 
                    as="select" 
                    name="classification"
                    className="select-field" 
                >
                    <option value="" className="option-gender">Classification</option>
                    <option value="Student" className="option-gender">Student</option>
                    <option value="Employee" className="option-gender">Employee</option>
                    <option value="Others" className="option-gender">Others</option>
                </Field>
                <br/>

                    <Field 
                        className="input-field"
                        id="donateNowPost"
                        name="firstName"
                        placeholder="First Name"
                    />
                    <ErrorMessage name="firstName" element={<span />}/>
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
                    
                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="address"
                        placeholder="Address"
                    />
                    <ErrorMessage name="address" element={<span />}/>
                    <br/>
                </div>
                <div className="donate-column">
                    
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
                    <option value="Decline to State" className="option-gender">Decline to State</option>
                    </Field>
                    <ErrorMessage name="gender" element={<span />}/>
                    <br/>

                    <Field 
                    as="select" 
                    name="type"
                    className="select-field" 
                    onChange={(e) => {
                    setFieldValue('type', e.target.value);
                    setOtherOption(e.target.value === 'Others');
                    }}>
                        <option value="" className="option-gender">Select Item</option>
                        <option value="Canned Goods" className="option-gender">Canned Goods</option>
                        <option value="Medicines/Vitamins" className="option-gender">Medicines/Vitamins</option>
                        <option value="Clothes" className="option-gender">Clothes</option>
                        <option value="Toys" className="option-gender">Toys</option>
                        <option value="School Supplies" className="option-gender">School Supplies</option>
                        <option value="Others" className="option-gender">Others</option>
                    </Field>
                    <br/>
                    {otherOption && (
                        <Field type="text" name="type" placeholder="Input Type" className="input-field" />
                    )}
                    <br/>
                    
                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="quantity"
                        placeholder="Quantity"
                    />
                    <ErrorMessage name="Quantity" element={<span />}/>
                    <br/>
                    
                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="amount"
                        type="number"
                        placeholder="Amount"
                    />
                    <ErrorMessage name="amount" element={<span />}/>
                    <br/>

                    <Field 
                    as="select" 
                    name="rName"
                    className="select-field" 
                    onChange={(e) => {
                    setFieldValue('rName', e.target.value);
                    setCourierType(e.target.value === 'Others');
                    }}>
                        <option value="" className="option-gender">Courier Name</option>
                        <option value="J&T" className="option-gender">J&T</option>
                        <option value="LBC" className="option-gender">LBC</option>
                        <option value="Ninja Van" className="option-gender">Ninja Van</option>
                        <option value="2GO" className="option-gender">2GO</option>
                        <option value="Others" className="option-gender">Others</option>
                    </Field>
                    <br/>
                    {courierType && (
                        <Field type="text" name="rName" placeholder="Input Type" className="input-field" />
                    )}
                    <br/>
                    
                    <Field
                        className="input-field"
                        id="donateNowPost"
                        name="rNum"
                        type="number"
                        placeholder="Tracking Number"
                    />
                    <ErrorMessage name="RNum" element={<span />}/>
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

export default InKind
