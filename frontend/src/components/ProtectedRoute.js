// ProtectedRoute.js
import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {

    const navigate = useNavigate();
    // Simulate authentication status and user role (can be replaced with actual authentication logic)
    const isAuthenticated = true;
    const userRole = 'admin'; // Set the user role (e.g., 'user' or 'admin')

    if (!isAuthenticated || userRole !== role) {
        navigate('/login')
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
