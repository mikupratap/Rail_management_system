// Signup.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('user');
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        const formdata = { email, password, isadmin: role };
        try {
            const userdata = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            });
            const result = await userdata.json();
            console.log(result, "name");
            if (result.success == false) {
                window.alert(result.message);
            }
            else {
                navigate('/login');
            }

        }
        catch (e) {
            window.alert(e);
        }

    }
    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form className="auth-form">
                <div className="form-group">
                    <label htmlFor="role">Select Role:</label>
                    <select id="role" value={role} onChange={handleRoleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <input type="email" placeholder="Email" value={email} required onChange={(e) => { setemail(e.target.value) }} />
                <input type="password" placeholder="Password" value={password} required onChange={(e) => { setpassword(e.target.value) }} />
                <button onClick={(e) => {
                    handleSignup(e);
                }}>Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
