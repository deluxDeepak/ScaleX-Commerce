
import React from 'react'
import { useAuth } from '../../context/useAuth'
import { Navigate } from 'react-router-dom';

// ye role check karega 
const RoleRoutes = ({ children, roles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading ........</div>

    // Infinite loop ban jata hai kabhi kabhi 
    if (!user) return <Navigate to="/auth/login" replace />
    
    if (!roles.includes(user.role?.toLowerCase())) {
        return <Navigate to="/unauthorize" />
    }
    return children
}

export default RoleRoutes