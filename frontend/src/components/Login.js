// Login.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setRole] = useState('user');
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const formdata = { email, password, isadmin: role };
        try {
            const userdata = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            });
            const result = await userdata.json();
            // console.log(result, "name");
            if (result.success == false) {
                window.alert(result.message);
            }
            else {
                localStorage.setItem("user_details", JSON.stringify({ token: result.result.token, isAdmin: result.result.isAdmin }));
                //console.log(result.result[0].isAdmin);

                if (result.result.isAdmin) {
                    navigate('/admin');
                }
                else {
                    navigate('/user');
                }
            }

        }
        catch (e) {
            window.alert(e);
        }

    }
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form">
                <div className="form-group">
                    <label htmlFor="role">Select Role:</label>
                    <select id="role" value={role} onChange={handleRoleChange}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <input type="text" placeholder="Email" required value={email} onChange={(e) => {
                    setemail(e.target.value)
                }} />
                <input type="password" placeholder="Password" required value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }} />
                <button onClick={(e) => handleLogin(e)}>Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
