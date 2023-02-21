import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./InKindUpdateRequest.css";
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
import emailjs from 'emailjs-com';


function InKindRequestApprove() {
    let { id } = useParams();
    const [inKindObject, setInKindObject] = useState({});

    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get(`http://localhost:3001/inkind/byId/${id}`, { withCredentials: true }).then((response) => {
            if(response.data.error){
                navigate("/login");
            }else{
                setInKindObject(response.data);
            }
        });
    });

    const templateParams = {
        subject: "ACLC College of Tacloban",
        firstName: inKindObject.firstName,
        email: inKindObject.email,
    }

    const ApproveRequest = (Option) => {
        if (Option === "approve"){
            let request = 1;
            let username = "";
            axios.put("http://localhost:3001/inkind/approverequest", {
                approve: request,
                username: username, 
                id: id
            }, { withCredentials: true }
            ).then((response) => {
                if(response.data.error){
                    alert("Failed to approve your request");
                }else {
                    emailjs.send('service_3x1ks7h', 'template_2g3ikvp', templateParams, 'yNNQzsJGkNJ05bIey')
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        setInKindObject({ ...inKindObject, request: request, username: username});
                        alert("Request Approved");
                        navigate("/inkindapprove");
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
                }
            });
        }else {
            alert("Error to Approve the request please contact the developer");
        }
    };

    const DisapproveRequest = (disapproveOption) => {
        if (disapproveOption === "disapprove") {
            let disapproved = 0;
            let username = "";
            axios.put("http://localhost:3001/inkind/disapproverequest", {
                disapproved: disapproved,
                username: username, 
                id: id
            }, { withCredentials: true }
            ).then((response) => {
                if(response.data.error){
                    alert("Failed to Disapprove");
                }else{
                    emailjs.send('service_3x1ks7h', 'template_je53q6d', templateParams, 'yNNQzsJGkNJ05bIey')
                    .then(function(response) {
                        setInKindObject({ ...inKindObject, request: disapproved, username: username });
                        alert("Request Disapprove");
                        navigate("/inkinddisapprove");
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
                }
            });
        } else {
            alert("Failed to Update the request please contact the dev");
        }
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
            date.getFullYear(),
        ].join('-');
    }

    function request() {
        if(inKindObject.request === false){
            return <h3 className="donateInfo">Disapprove</h3>
        }else{
            return <h3 className="donateInfo">Approve</h3>
        }
    }

    function btnBack() {
        if (inKindObject.username === "Pending"){
            navigate("/inkindpending");
        }

        else if (inKindObject.request === true){
            navigate("/inkindapprove");
        }

        else if(inKindObject.request === false){
            navigate("/inkinddisapprove");
        }
    }

    return (   
        <div>
            <div className="donateContainer">
                <div className="donateForm">
                    <div className='donateHeader'>
                        <FaArrowCircleLeft onClick={() => {btnBack()}} className="returnTo"/>
                        <h2>DONATOR INFORMATION</h2>
                    </div>

                        <label className="donateLabel">Classification: </label>
                            <h3 className="donateInfo">{inKindObject.classification}</h3>

                        <label className="donateLabel">First Name: </label>
                            <h3 className="donateInfo">{inKindObject.firstName}</h3>
                        
                        <label className="donateLabel">Last Name: </label>
                            <h3 className="donateInfo">{inKindObject.lastName}</h3>
                        
                        <label className="donateLabel">Email: </label>
                            <h3 className="donateInfo">{inKindObject.email}</h3>

                        <label className="donateLabel">Phone Number: </label>
                            <h3 className="donateInfo">{inKindObject.number}</h3>

                        <label className="donateLabel">Address: </label>
                            <h3 className="donateInfo">{inKindObject.address}</h3>

                        <label className="donateLabel">Type: </label>
                            <h3 className="donateInfo">{inKindObject.type}</h3>

                        <label className="donateLabel">Quantity: </label>
                            <h3 className="donateInfo">{inKindObject.quantity}</h3>

                        <label className="donateLabel">Amount: </label>
                            <h3 className="donateInfo">{inKindObject.amount}</h3>

                        <label className="donateLabel">Courier Name: </label>
                            <h3 className="donateInfo">{inKindObject.rName}</h3>

                        <label className="donateLabel">Tracking Number: </label>
                            <h3 className="donateInfo">{inKindObject.rNum}</h3>
                            
                        <label className="donateLabel">Updated By: </label>
                            <h3 className="donateInfo">{inKindObject.username}</h3>

                        <label className="donateLabel">Updated At: </label>
                            <h3 className="donateInfo">{formatDate(new Date(inKindObject.updatedAt))}</h3>
                        
                        <label className="donateLabel">Status: </label>
                            {request()}

                        <label className="donateLabel">Request At: </label>
                            <h3 className="donateInfo">{formatDate(new Date(inKindObject.createdAt))}</h3>

                        <div className="donateFooter">
                            <button onClick={() => {ApproveRequest("approve")}} className="btnApprove"><BsFillCheckCircleFill/> Approve</button>
                            <button onClick={() => {DisapproveRequest("disapprove")}} className="btnDisapprove"><IoMdCloseCircle/> Disapprove</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default InKindRequestApprove;