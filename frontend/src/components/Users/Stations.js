// UserHome.js
import React from 'react';
import { useState, useEffect } from 'react';
import './Stations.css';
import { useNavigate } from 'react-router-dom';
const Stations = () => {
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    const [trains, settrains] = useState([]);
    const navigate = useNavigate();
    const [val1, setval1] = useState('Select');
    const [val2, setval2] = useState('Select');
    const [stations, setstations] = useState([])
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
            setstations(["Select", ...arr1])
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        solve();
    }, [])

    const handlefind = async (e) => {
        e.preventDefault();
        try {
            const finded_train = await fetch('http://localhost:8080/user/findtrains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`

                },
                body: JSON.stringify({ fromStation: val1, toStation: val2 })
            }
            )
            const trns = await finded_train.json();
            const arr = trns.result;
            settrains(...[arr]);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleBooking = (item) => {
        navigate(`/user/bookticket/${item.fromStation}/${item.toStation}/${item.trainNumber}`);
    }

    return (
        <div className="container">
            <div className="header">
                <h1>All Registered Stations</h1>
            </div>
            <div className="content">
                <button className='user-home-btn' onClick={() => {
                    navigate('/user')
                }}>Home</button>
                <button className='user-home-btn' onClick={() => {
                    navigate('/user/orders')
                }}>Orders</button>
                <button className='user-home-btn logout' onClick={() => {
                    handleLogout();
                }}>Logout</button>
            </div>
            <div className='user-info'>
                <div className='first'>
                    <div className='from-to'>
                        <div className='ft-1'>From Station</div>
                        <div className='ft-2'>To Station</div>
                    </div>
                    <div className='choose-station'>
                        <div className='lhs'>
                            <select className='ls' value={val1} onChange={(e) => {
                                setval1(e.target.value)
                            }}>
                                {
                                    stations.map((item) => {
                                        return <option>{item}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='lhs'>
                            <select className='ls' value={val2} onChange={(e) => {
                                setval2(e.target.value)
                            }}>
                                {
                                    stations.map((item) => {
                                        return <option>{item}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='second'>
                    <button className='find-trains' onClick={(e) => {
                        handlefind(e);
                    }}>Find Trains</button>
                </div>
                <div className='third'>
                    <div className='trains-h'>
                        {`Trains From ${val1 != 'Select' ? val1 : "Not Selected"} Station to ${val2 != 'Select' ? val2 : "Not Selected"} Station`}
                    </div>
                    <div className='trains'>
                        {
                            trains.map((item) => {
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
                                        {item.seatAvl != 0 ? <button className='book-Seat' onClick={(e) => {
                                            handleBooking(item);
                                        }}>Book Seat</button> : <button className='not-avl'>Not Available</button>}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stations;
