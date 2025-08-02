import React from 'react'

import {
        BrowserRouter as Router,
        Routes,
        Route,
        Navigate,
    } from "react-router-dom";
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/userContext';
import {Toaster} from 'react-hot-toast';
import Inventory from './pages/Dashboard/Inventory';
import Sales from './pages/Dashboard/Sales';

    const App = () => {
        return (
            <UserProvider>
                <div>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Root />} />       
                            <Route path="/login" exact element={<Login />} /> 
                            <Route path="/signup" exact element={<SignUp />} />    
                            <Route path="/dashboard" exact element={<Home />} /> 
                            <Route path="/expense" exact element={<Expense />} />
                            <Route path='/inventory' exact element={<Inventory />} />
                            <Route path='/sales' exact element={<Sales />} />
                        </Routes>
                    </Router>
                </div>

                <Toaster 
                    toastOptions={{
                        className: "",
                        style: {
                            fontSize:'13px'
                        },
                    }}
                />
            </UserProvider>
        )
    }

    export default App

    const Root = () => {
        // Check if token exists in localStorage
        const isAuthenticated = !!localStorage.getItem("token");

        // Redirect to dashboard if authenticated, otherwise login
        if (isAuthenticated) {
            return <Navigate to="/dashboard" />;
        } else {
            return <Navigate to="/login" />;
        };
    };
    