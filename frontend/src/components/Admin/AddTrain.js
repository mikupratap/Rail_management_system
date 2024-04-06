// TrainForm.js
import React, { useState, useEffect } from 'react';
import './Addtrain.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
const Addtrain = () => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    const [alltrains, setallTrains] = useState([]);
    const [station, setstation] = useState([]);
    const navigate = useNavigate();
    const [trainName, setTrainName] = useState('');
    const [trainNumber, setTrainNumber] = useState('');
    const [toStation, settoStation] = useState('');
    const [fromStation, setfromStation] = useState('');
    const [departuretime, setdepartureTime] = useState('');
    const [arivaltime, setarivalTime] = useState('');
    const [seatAvl, setseatAvl] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Form data validation and submission logic
        // const newTrain = {
        //     trainName,
        //     trainNumber,
        //     destinationStation,
        //     departureStation,
        //     departureTime,
        //     arrivalTime
        // };

        // setTrainName('');
        // setTrainNumber('');
        // setDestinationStation('');
        // setDepartureStation('');
        // setDepartureTime('');
        // setArrivalTime('');
    };

    const handleLogout = () => {
        localStorage.removeItem('user_details');
        navigate('/login');
    }
    const solve = async () => {

        try {
            const st = await fetch('http://localhost:8080/admin/getstations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`
                }
            }
            )
            const stations = await st.json();
            console.log(stations.result, "all stations");
            let arr1 = stations.result.map((i) => {
                return i.stationName;
            })
            setstation(["Select", ...arr1]);
            setfromStation("Select");
            settoStation("Select");
            const userdata = await fetch('http://localhost:8080/admin/gettrains', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`
                }
            });
            const result = await userdata.json();
            // console.log(result, "name");
            if (result.success == false) {
                window.alert(result.message);
            }
            else {
                const stationdata = result.result;
                let arr = stationdata.map((i) => {
                    return i;
                })
                setallTrains([...arr]);
                console.log(arr);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        solve();
    }, [])

    const handleAddTrain = async (e) => {
        e.preventDefault();
        try {
            const userdata = await fetch('http://localhost:8080/admin/addtrain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`
                },
                body: JSON.stringify({ trainName, trainNumber, toStation: toStation, fromStation: fromStation, arivaltime: arivaltime, seatAvl: seatAvl, departuretime })
            });
            const result = await userdata.json();
            // console.log(result, "name");
            if (result.success == false) {
                window.alert(result.message);
            }
            else {
                setallTrains([...result.result])
                console.log(alltrains)
            }

        }
        catch (e) {
            window.alert(e);
        }

    }


    return (
        <div>
            <div className="container">
                <div className="header">
                    <h1>Add Train </h1>
                </div>
                <div className="content">
                    <button className='user-home-btn' onClick={() => {
                        navigate('/admin')
                    }}>Home</button>
                    <button className='user-home-btn' onClick={() => {
                        navigate('/admin/stations')
                    }}>Stations</button>
                    <button className='user-home-btn logout' onClick={() => {
                        handleLogout();
                    }}>Logout</button>
                </div>
                <div className="train-form-container">
                    <h2>Add Train</h2>
                    <form className="train-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="trainName">Train Name:</label>
                            <input type="text" id="trainName" value={trainName} onChange={(e) => setTrainName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="trainNumber">Train Number:</label>
                            <input type="text" id="trainNumber" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="destinationStation">Destination Station:</label>
                            <select type="text" id="destinationStation" value={toStation} onChange={(e) => settoStation(e.target.value)} required >
                                {
                                    station.map((i) => {
                                        return <option>{i}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="departureStation">Departure Station:</label>
                            <select type="text" id="departureStation" value={fromStation} onChange={(e) => setfromStation(e.target.value)} required >
                                {
                                    station.map((i) => {
                                        return <option>{i}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="departureTime">Departure Time:</label>
                            <input type="time" id="departureTime" value={departuretime} onChange={(e) => setdepartureTime(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="arrivalTime">Arrival Time:</label>
                            <input type="time" id="arrivalTime" value={arivaltime} onChange={(e) => setarivalTime(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="avl-seats">Available seats:</label>
                            <input type="text" id="avlseats" value={seatAvl} onChange={(e) => setseatAvl(e.target.value)} required />
                        </div>
                        <button onClick={(e) => {
                            handleAddTrain(e);
                        }}>Add Train</button>
                    </form>


                </div>
            </div>
            <div className='trains-div'>
                {
                    alltrains.map((item) => {
                        return <div className='trains-det'>
                            <div className='t-name'>
                                {`${item.trainName} ( ${item.trainNumber} )`}
                            </div>
                            <div className='tft'>
                                <div className='t-f'>{`${item.arivaltime} | ${item.fromStation}`}</div>
                                <div className='t-t'>{`${item.departuretime} | ${item.toStation}`}</div>
                            </div>
                            <div className='avl'>
                                <div >Seat Available : {` ${item.seatAvl}`}</div>

                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Addtrain;
