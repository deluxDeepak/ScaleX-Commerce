// Protected route is simple 
// If user is not logged in then return back to login 

import React from 'react'

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

// It is like a wrapper 
const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useAuth();    //loading is global level 

    if (loading) return <p>Loading....</p>
    console.log("User from protected route ", user);

    // agr nahi hai to login or home page  ke pass bhej do 
    if (!user) return <Navigate to="/auth/login" replace />;
    // if user persent hai to childrean ko render kar do 
    return children;
}

export default ProtectedRoutes