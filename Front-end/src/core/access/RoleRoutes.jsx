
import React from 'react'
import { useAuth } from '../../context/useAuth'
import { Navigate } from 'react-router-dom';

// ye role check karega 
const RoleRoutes = ({children,roles}) => {
    const {user}=useAuth();

    if(!user) return <Navigate to="/auth/login"/>
    if(!roles.includes(user.role)){
        return <Navigate to="/unauthorize" />
    }
    return children
}

export default RoleRoutes