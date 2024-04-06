// UserHome.js
import React, { useEffect, useState } from 'react';
import './StationAdmin.css';
import { useNavigate } from 'react-router-dom';
const StationAdmin = () => {
    const navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('user_details'));

    const handleLogout = () => {
        localStorage.removeItem('user_details');
        navigate('/login');
    }
    const [st, setst] = useState("");
    const [allStations, setAllStations] = useState([]);
    const solve = async () => {
        try {
            const userdata = await fetch('http://localhost:8080/admin/getstations', {
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
                    return i.stationName;
                })
                setAllStations([...arr]);
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

    const handleAddStation = async (e) => {
        e.preventDefault();
        try {
            const userdata = await fetch('http://localhost:8080/admin/addstations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetails.token}`
                },
                body: JSON.stringify({ stationName: st })
            });
            const result = await userdata.json();
            // console.log(result, "name");
            if (result.success == false) {
                window.alert(result.message);
            }
            else {
                const arr = result.result.map((i) => {
                    return i.stationName;
                });

                setAllStations([...arr]);
            }

        }
        catch (e) {
            window.alert(e);
        }

    }


    return (
        <div className="container">
            <div className="header">
                <h1>Add Station </h1>
            </div>
            <div className="content">
                <button className='user-home-btn' onClick={() => {
                    navigate('/admin')
                }}>Home</button>
                <button className='user-home-btn' onClick={() => {
                    navigate('/admin/trains')
                }}>Trains</button>
                <button className='user-home-btn logout' onClick={() => {
                    handleLogout();
                }}>Logout</button>
            </div>
            <div className='add-stations'>
                <div className='asf'><input type='text' placeholder='Station name ...' value={st} onChange={(e) => {
                    setst(e.target.value)
                }} /></div>
                <div className='ass'><button onClick={(e) => {
                    const list = allStations;
                    if (!st) return;
                    handleAddStation(e);
                }}>Add Station</button></div>
            </div>
            <div className='all-stations'>
                {allStations.map((i) => {
                    return <div className='stname'>{i}</div>
                })}
            </div>
        </div>
    );
};

export default StationAdmin;
