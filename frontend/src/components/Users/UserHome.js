// UserHome.js
import React, { useEffect } from 'react';
import './UserHome.css';
import { useNavigate } from 'react-router-dom';
const UserHome = () => {
    const navigate = useNavigate();
    const isUser = async () => {
        if (!localStorage.getItem('user_details')) {
            navigate('/login');
        }
        const userDetails = await JSON.parse(localStorage.getItem('user_details'));
        console.log(userDetails)
        if (!userDetails || !userDetails.token) {
            navigate('/login');
        }
        // console.log(userDetails)
        const st = await fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json charset=UTF-8',
                'Authorization': `Bearer ${userDetails.token}`
            }
        }
        )
        // const islogin = await st.json();
        // console.log(islogin, "homepage");
        // if (islogin.success) {
        //     ;
        // }
        // else {
        //     navigate('/login')
        // }
    }
    useEffect(() => {
        isUser();
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('user_details');
        navigate('/login');
    }
    return (
        <div className="container">
            <div className="header">
                <h1>User Home Page</h1>
            </div>
            <div className="content">
                <button className='user-home-btn' onClick={() => {
                    navigate('/user/stations')
                }}>Stations</button>
                <button className='user-home-btn' onClick={() => {
                    navigate('/user/orders')
                }}>Orders</button>
                <button className='user-home-btn logout' onClick={() => {
                    handleLogout();
                }}>Logout</button>
            </div>
            <div className='user-info'>
                <h1>Hello This is Devendra Prajapati , I am a full stack Developer and A competitive programmer.</h1>
                <h1>{`Email : devendrarohit578@gmail.com \n`}</h1>
                <hr />
                <h1>{`Mobile No. : 7309702576`}</h1>
            </div>
        </div>
    );
};

export default UserHome;
