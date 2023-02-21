import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import "./CashUpdateRequest.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

function CashUpdateRequest() {
    let { id } = useParams();
    const [cashObject, setCashObject] = useState ({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/cash/byId/${id}`).then((response) => {
        if(response.data.error){
            alert("User Not Authenticated");
            navigate("/login");
        }else{
            setCashObject(response.data);
        }
        });
    }, []);

    const templateParams = {
        subject: "ACLC College of Tacloban",
        firstName: cashObject.firstName,
        email: cashObject.email,
    }

    const ApproveRequest = (approveOption) => {
        if (approveOption === "approve"){
            let request = 1;
            let username = "";
            axios.put("http://localhost:3001/cash/approverequest",{
                approved: request,
                username: username,
                id: id,
            }, { withCredentials: true }
            )
            .then((response) => {
                if(response.data.error) {
                    alert("Failed to approve");
                }else{
                    emailjs.send('service_3x1ks7h', 'template_2g3ikvp', templateParams, 'yNNQzsJGkNJ05bIey')
                        .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        setCashObject({ ...cashObject, request: request, username: username });
                        navigate("/cashapprove");
                        }, function(error) {
                        console.log('FAILED...', error);
                        });
                }
            });
        }   else {
                alert("Failed to update the request. Please contact the Dev.");
            }
    }

    const DisapproveRequest = (disapproveOption) => {
        if (disapproveOption === "disapprove") {
            let disapproved = 0;
            let username = "";
            axios.put("http://localhost:3001/cash/disapproverequest", {
                disapproved: disapproved,
                username: username,
                id: id
            }, { withCredentials: true }
            ).then((response) => {
                if(response.data.error){
                    alert("Failed to approve");
                }else{
                    emailjs.send('service_3x1ks7h', 'template_je53q6d', templateParams, 'yNNQzsJGkNJ05bIey')
                    .then(function(response) {
                        setCashObject({ ...cashObject, request: disapproved, username: username });
                        alert("Request Disapprove");
                        navigate("/cashdisapprove");
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
                }
            });
        } else {
            alert("Failed to Update the request. Please contact the Dev.");
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
        if(cashObject.request === false){
            return <h3 className="donateInfo">Disapprove</h3>
        }else{
            return <h3 className="donateInfo">Approve</h3>
        }
    }

    // function button(){
    //     if(cashObject.request === false){
    //         return <button onClick={() => {ApproveRequest("approve")}} className="btnApprove"><BsFillCheckCircleFill/> Approve</button>
    //     }else if (cashObject.request === true){
    //         return <button onClick={() => {DisapproveRequest("disapprove")}} className="btnDisapprove"><IoMdCloseCircle/> Disapprove</button>
    //     }
    // }

    const handleClickBack = () => navigate(-1);

    return (
        <div>
            <div className="donateContainer">
                <div className="donateForm">

                <div className='donateHeader'>
                    <FaArrowCircleLeft onClick={handleClickBack} className="returnTo"/>
                    <h2>DONATOR INFORMATION</h2>
                </div>

                    <label className="donateLabel">First Name: </label>
                        <h3 className="donateInfo">{cashObject.firstName}</h3>

                    <label className="donateLabel">Last Name: </label>
                        <h3 className="donateInfo">{cashObject.lastName}</h3>

                    <label className="donateLabel">Email: </label>
                        <h3 className="donateInfo">{cashObject.email}</h3>

                    <label className="donateLabel">Phone Number: </label>
                        <h3 className="donateInfo">{cashObject.number}</h3>

                    <label className="donateLabel">Address: </label>
                        <h3 className="donateInfo">{cashObject.address}</h3>

                    <label className="donateLabel">Gender: </label>
                        <h3 className="donateInfo">{cashObject.gender}</h3>

                    <label className="donateLabel">Amount: </label>
                        <h3 className="donateInfo">{cashObject.amount}</h3>

                    <label className="donateLabel">Transaction ID: </label>
                        <h3 className="donateInfo">{cashObject.transactionID}</h3>

                    <label className="donateLabel">Updated By: </label>
                        <h3 className="donateInfo">{cashObject.username}</h3>

                    <label className="donateLabel">Updated At: </label>
                        <h3 className="donateInfo">{formatDate(new Date(cashObject.updatedAt))}</h3>

                    <label className="donateLabel">Status: </label>
                        {request()}

                    <label className="donateLabel">Request At: </label>
                        <h3 className="donateInfo">{formatDate(new Date(cashObject.createdAt))}</h3>

                    <div className="donateFooter">
                        {/* {button()} */}
                        <button onClick={() => {ApproveRequest("approve")}} className="btnApprove"><BsFillCheckCircleFill/> Approve</button>
                        <button onClick={() => {DisapproveRequest("disapprove")}} className="btnDisapprove"><IoMdCloseCircle/> Disapprove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CashUpdateRequest
