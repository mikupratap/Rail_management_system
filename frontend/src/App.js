import React from 'react';
import { Routes, Route, Switch, Component } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserHome from './components/Users/UserHome';
import AdminHome from './components/Admin/AdminHome';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Stations from './components/Users/Stations';
import BookingForm from './components/Users/BookTicket';
import Orders from './components/Users/Orders';
import StationAdmin from './components/Admin/StationAdmin';
import AddTrain from './components/Admin/AddTrain';
const App = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/user" Component={UserHome} />
      <Route path="/admin" Component={AdminHome} />
      <Route path="/user/stations" Component={Stations} />
      <Route path="/user/bookticket/:fromStation/:toStation/:trainNumber" Component={BookingForm} />
      <Route path="/user/orders" Component={Orders} />
      <Route path="/admin/stations" Component={StationAdmin} />
      <Route path="/admin/trains" Component={AddTrain} />
    </Routes>

  );
};

export default App;