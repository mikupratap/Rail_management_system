// BookingForm.js
import React, { useState } from 'react';
import './BookTicket.css'; // Import CSS file for styling
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const BookingForm = () => {
    // State for form fields
    const navigate = useNavigate()
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    const { fromStation, toStation, trainNumber } = useParams();
    /// console.log(fromStation, toStation, trainNumber);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [passengerName, setPassengerName] = useState('');
    const [passengerAge, setPassengerAge] = useState('');

    // Function to handle form submission
    const handleLogout = () => {
        localStorage.removeItem('user_details');
        navigate('/login');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userdata = await fetch('http://localhost:8080/user/bookticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`
                },
                body: JSON.stringify({ trainNumber, passengerAge, passengerName })
            });
            const result = await userdata.json();
            console.log(result)
            if (result.success) {
                window.alert("Booking Successfull")
                navigate('/user/orders');
            }
            else {
                window.alert(result.message);
            }
        }
        catch (e) {
            window.alert(e);
        }

    };

    return (
        <>
            <button className='home' onClick={() => {
                navigate('/user');
            }}>Home</button>
            <button className='b-logout' onClick={(e) => {
                handleLogout(e);
            }}>Log out</button>
            <div className="booking-form-container">
                <h2>Book a Railway Seat</h2>
                <form className="booking-form" >
                    <div className="form-group">
                        <label htmlFor="source">Source:</label>
                        <input type="text" id="source" value={fromStation} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destination">Destination:</label>
                        <input type="text" id="destination" value={toStation} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passengerName">Passenger Name:</label>
                        <input type="text" id="passengerName" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passengerAge">Passenger Age:</label>
                        <input type="number" id="passengerAge" value={passengerAge} onChange={(e) => setPassengerAge(e.target.value)} required />
                    </div>
                    <button onClick={(e) => {
                        handleSubmit(e);
                    }}>Book Now</button>
                </form>
            </div>
        </>
    );
};

export default BookingForm;
