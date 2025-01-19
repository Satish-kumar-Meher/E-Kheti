import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function SessionCheck({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token);

        if (!token) {
            navigate('/login'); // Redirect to login page if token is missing
        }
    }, []);

    return <>{children}</>;
}

export default SessionCheck;
