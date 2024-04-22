import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * @author Mihail Petrov
 * @returns 
 */
const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

/**
 * @author Mihail Petrov
 * @param {*} param0 
 * @returns 
 */
export const ProtectedRoute = ({ children }) => {

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};