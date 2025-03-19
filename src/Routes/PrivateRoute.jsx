import React, {useEffect} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthInfo.jsx';

const PrivateRoute = ({ children }) => {
    const { email, user} = useAuth();
    const location = useLocation();
    // In PrivateRoute.jsx
    console.log('Location:=========', email);

    if (email) {
        return children;
    }

    return <Navigate to="/signing" state={{ from: location }} replace />;
};

export default PrivateRoute;
