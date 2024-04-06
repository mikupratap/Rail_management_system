// UserHome.js
import React from 'react';
import { useEffect } from 'react';
import './Orders.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OrderDetails from './OrderComp';
const Orders = () => {

    const [order, setorder] = useState([]);

    const navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    const solve = async () => {
        try {
            const st = await fetch('http://localhost:8080/user/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`
                }
            }
            )
            const orders = await st.json();
            console.log(orders);
            // console.log(stations.result, "all stations");
            // let arr1 = stations.result.map((i) => {
            //     return i.stationName;
            // })
            // setstations(["Select", ...arr1])
            setorder(orders.result);
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        solve();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user_details');
        navigate('/login');
    }


    return (
        <div className="container">
            <div className="header">
                <h1>All Orders </h1>
            </div>
            <div className="content">
                <button className='user-home-btn' onClick={() => {
                    navigate('/user')
                }}>Home</button>
                <button className='user-home-btn' onClick={() => {
                    navigate('/user/stations')
                }}>Stations</button>
                <button className='user-home-btn logout' onClick={() => {
                    handleLogout();
                }}>Logout</button>
            </div>
            <div className='user-info'>
                {order.map((item) => {
                    return <OrderDetails
                        trainNumber={item.trainNumber}
                        trainName={item.trainName}
                        passengerName={item.passengerName}
                        passengerAge={item.passengerAge}
                        fromStation={item.fromStation}
                        toStation={item.to}
                    />
                })}
            </div>
        </div>
    );
};

export default Orders;
