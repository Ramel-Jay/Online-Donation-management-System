import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./InKindApprove.css";
import Home from "../Home/Home";
import { FaSearch } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import * as XLSX  from "xlsx";

function InKindApprove(){

    const [listOfPosts, setListOfPost] = useState([]);

    const [ searchId, setSearchId ] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/inkind", { withCredentials: true }).then((response) => {
            if(response.data.error){
                navigate("/login");
            }else{
                setListOfPost(response.data);
            }
        });
    }, []);

    const download = () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(listOfPosts.filter((value) => value.request === true));

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "Cash_Disapprove_Table.xlsx");
    }

    const items = listOfPosts.filter((value) => value.request === true);
    const countedItems = items.length;

    return(
        <>
            <Home/>
            <div className="approve-request-container">
                <p style={{ paddingLeft:"2vw" }} >Approve Request: { countedItems }</p>
            </div>
            <br></br>
            <h2 className="headerTitle">IN KIND APPROVE</h2>
            <FaSearch className="search-icon"/>
            <input
                type="text"
                placeholder="Search First Name..."
                onChange={(event) => {
                    setSearchId(event.target.value);
                }}
                className="searchDonator"    
            />
            <div style={{ overflow:"scroll", maxHeight:"28vw" }}>
            <table className='tblRequest'>
                <thead>
                    <tr>
                        <th>Classification</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Courier Name</th>
                        <th>Tracking Number</th>
                        <th>Status</th>
                        <th>Approve By</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>                
                    {
                        listOfPosts.filter((value) => {
                            if( searchId === "" ){
                                return value.request === true;
                            }else if (value.firstName.toLowerCase().includes(searchId.toLowerCase().trim())){
                                return value.request === true;
                            }
                        }).map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td>{value.classification}</td>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.type}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.rName}</td>
                                    <td>{value.rNum}</td>
                                    <td>{value.request}Approve</td>
                                    <td>{value.username}</td>
                                    <td onClick={() => {navigate(`/inkindupdaterequest/${value.id}`)}}><BsFillCheckCircleFill type='submit' onClick={() => {navigate(`/inkindupdaterequest/${value.id}`)}}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
            <button onClick={download} className="btnDownload">Download</button>
        </>
    )
};

export default InKindApprove;