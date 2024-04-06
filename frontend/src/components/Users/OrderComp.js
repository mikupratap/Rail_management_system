// TrainDetails.js
import React from 'react';
import './OrderComp.css'; // Import CSS file for styling

const OrderDetails = ({ trainNumber, trainName, passengerName, passengerAge, fromStation, toStation }) => {
    return (
        <div className="train-details-container">
            <h2>Train Details</h2>
            <div className="train-details">
                <div className="detail">
                    <span>Train Number:</span>
                    <span>{trainNumber}</span>
                </div>
                <div className="detail">
                    <span>Train Name:</span>
                    <span>{trainName}</span>
                </div>
                <div className="detail">
                    <span>Passenger Name:</span>
                    <span>{passengerName}</span>
                </div>
                <div className="detail">
                    <span>Passenger Age:</span>
                    <span>{passengerAge}</span>
                </div>
                <div className="detail">
                    <span>From Station:</span>
                    <span>{fromStation}</span>
                </div>
                <div className="detail">
                    <span>To Station:</span>
                    <span>{toStation}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
