// UserHome.js
import React, { useEffect } from 'react';
import './AdminHome.css';
import { useNavigate } from 'react-router-dom';
const AdminHome = () => {
    const navigate = useNavigate();
    const isAdmin = async () => {
        if (!localStorage.getItem('user_details')) {
            navigate('/login');
            return
        }
        const userDetails = JSON.parse(localStorage.getItem('user_details'));
        if (!userDetails || !userDetails.token) {
            navigate('/login');
            return
        }
        const st = await fetch('http://localhost:8080/admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userDetails.token}`
            }
        }
        )
        const islogin = await st.json();
        if (islogin.success) {
            ;
        }
        else {
            navigate('/login')
        }
    }
    useEffect(() => {
        isAdmin();
    }, [])
    console.log("User home")
    const handleLogout = () => {
        localStorage.removeItem('user_details');
        navigate('/login');
    }
    return (
        <div className="container">
            <div className="header">
                <h1>Admin Home Page</h1>
            </div>
            <div className="content">
                <button className='user-home-btn' onClick={() => {
                    navigate('/admin/stations')
                }}>Stations</button>
                <button className='user-home-btn' onClick={() => {
                    navigate('/admin/trains')
                }}>Trains</button>
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

export default AdminHome;
