import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { format } from 'date-fns';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Home from "../Home/Home";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

const formatAmount = (amount) => Number(amount).toLocaleString('en-PH', {
    style: 'currency',
    currency: 'PHP'
});

const options = {
    responsive: true,
    ticks: {
        precision: 0
    },
    plugins: {
        tooltip: {
        callbacks: {
            label: (yDatapoint) => {
                const data = yDatapoint.dataset?.data[yDatapoint.dataIndex];

                if (data?.amount && data?.count) {
                    return [
                        `${yDatapoint.dataset?.label}: ${data.count}`,
                        `Total Amount: ${formatAmount(data.amount)}`
                    ];
                }

                return null;
            },
        }
        }
    },
};

function Dashboard() {

    const [cashList, setCashList] = useState([]);

    const [inKindList, setInKindList] = useState([]);

    const [activeTab, setActiveTab] = useState('cash-approve');

    // const [total, setTotal] = useState([]);

    // const handleClick = () => {
    //     let sum = 0;
    //     cashList.forEach(item => {
    //         if(item.request === true){
    //             sum += item.amount;
    //         }
    //     });
    //     setTotal(sum);
    // };

    // const handleClick = () => {
    //     let sum = 0;
    //     cashList.forEach(item => {
    //         if(item.request === true){
    //             sum += item.amount;
    //         }
    //     });
    //     setTotal(sum);
    // };

    // useEffect(() => {
    //     let sum = 0;
    //     cashList.forEach(item => {
    //         if(item.request === true){
    //             sum += item.amount;
    //         }
    //     });
    //     setTotal(sum);
    // }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/cash", { withCredentials: true }).then((response) => {
            if(response.data.error)
            {
                alert(response.data.error);
            }else{
                setCashList(response.data);
            }
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/inkind", { withCredentials: true }).then((response) => {
            if(response.data.error){
                navigate("/login");
            }else{
                setInKindList(response.data);
            }
        });
    }, []);

    const toggleTab = (event) => setActiveTab(event.currentTarget.id);

    const cashApprove = cashList.filter((val) => val.request === true );
    const countCashApprove = cashApprove.length;

    const cashDisapprove = cashList.filter((val) => val.request === false );
    const countCashDisapprove = cashDisapprove.length;

    const inKindApprove = inKindList.filter((val) => val.request === true );
    const countInKindApprove = inKindApprove.length;

    const inKindDisApprove = inKindList.filter((val) => val.request === false );
    const countInKindDisapprove = inKindDisApprove.length;

    const navigate = new useNavigate();

    const getData = (data, label) => {
        const months = {
            Jan: {
                count: 0,
                amount: 0,
            },
            Feb: {
                count: 0,
                amount: 0,
            },
            Mar: {
                count: 0,
                amount: 0,
            },
            Apr: {
                count: 0,
                amount: 0,
            },
            May: {
                count: 0,
                amount: 0,
            },
            Jun: {
                count: 0,
                amount: 0,
            },
            Jul: {
                count: 0,
                amount: 0,
            },
            Aug: {
                count: 0,
                amount: 0,
            },
            Sep: {
                count: 0,
                amount: 0,
            },
            Oct: {
                count: 0,
                amount: 0,
            },
            Nov: {
                count: 0,
                amount: 0,
            },
            Dec: {
                count: 0,
                amount: 0,
            },
        };

        if (data && data.length > 0) {
            data.forEach(post => {
                // Check the month of createdAt field, convert date using date-fns https://date-fns.org/v2.14.0/docs/format
                const monthName = format(new Date(post.createdAt), 'LLL');

                if (Object.keys(months).includes(monthName)) {
                    months[monthName].count += 1;
                    months[monthName].amount += post.amount;
                }
            });
        }

        return {
            labels: Object.keys(months),
            datasets: [{
                label,
                data: Object.values(months || []),
                borderColor: 'black',
                backgroundColor: 'blue',
                parsing: {
                    xAxisKey: 'count',
                    yAxisKey: 'count'
                },
            }],
        }
    };

    const getChartData = () => {
        switch (activeTab) {
            case 'cash-disapprove':
                return getData(cashDisapprove, 'Cash Disapprove');
            case 'inkind-approve':
                return getData(inKindApprove, 'In Kind Approve');
            case 'inkind-disapprove':
                return getData(inKindDisApprove, 'In Kind Disapprove');
            default:
                return getData(cashApprove, 'Cash Approved');
        }
    };

    const getTotalAmount = () => {
        switch (activeTab) {
            case 'cash-disapprove':
                return formatAmount(cashDisapprove.reduce((sum, data) => sum + data.amount, 0));
            case 'inkind-approve':
                return formatAmount(inKindApprove.reduce((sum, data) => sum + data.amount, 0));
            case 'inkind-disapprove':
                return formatAmount(inKindDisApprove.reduce((sum, data) => sum + data.amount, 0));
            default:
                return formatAmount(cashApprove.reduce((sum, data) => sum + data.amount, 0));
        }
    };

    return (
        <div>
            <Home/>
            <div className="row">
                <div className="column">
                    <div
                        className="card"
                        onClick={toggleTab}
                        id="cash-approve"
                        style={{ border: activeTab === 'cash-approve' ? '2px solid blue' : 'none' }}
                    >
                    <h3 className="cardHeader">CASH APPROVED: </h3>
                    <p className="count">{ countCashApprove }</p>
                    </div>
                </div>

                <div className="column">
                    <div
                        className="card"
                        onClick={toggleTab}
                        id="cash-disapprove"
                        style={{ border: activeTab === 'cash-disapprove' ? '2px solid blue' : 'none' }}
                    >
                    <h3 className="cardHeader">CASH DISAPPROVE: </h3>
                    <p className="count">{ countCashDisapprove }</p>
                    </div>
                </div>

                <div className="column">
                    <div
                        className="card"
                        onClick={toggleTab}
                        id="inkind-approve"
                        style={{ border: activeTab === 'inkind-approve' ? '2px solid blue' : 'none' }}
                    >
                    <h3 className="cardHeader">IN KIND APPROVE:</h3>
                    <p className="count">{ countInKindApprove }</p>
                    </div>
                </div>

                <div className="column">
                    <div
                        className="card"
                        onClick={toggleTab}
                        id="inkind-disapprove"
                        style={{ border: activeTab === 'inkind-disapprove' ? '2px solid blue' : 'none' }}
                    >
                    <h3 className="cardHeader">IN KIND DISAPPROVE:</h3>
                    <p className="count">{ countInKindDisapprove }</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 40 }} className="graph-container">
                <Bar options={options} data={getChartData()}  className="bar-graph"/>
            </div>

            {/* <button onClick={handleClick}>Calculate Total</button> */}
            <p>Total Cash Approve: {getTotalAmount()}</p>
        </div>
    )
}

export default Dashboard