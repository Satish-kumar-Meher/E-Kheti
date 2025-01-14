// import React from 'react';
import '../css/errorpage.css';
import { NavLink } from 'react-router-dom';

export const ErrorPage = () => {
    return (
        <div className="error-page">
            <div className="error-content">
                <h1 className="error-code">404</h1>
                <p className="error-message">Page Not Found</p>
                <p className="error-description">
                    The page you are looking for was moved, removed, renamed, or never existed.
                </p>
                {/* <a href="/" className="back-button">Back To Home</a> */}
                <NavLink to="/" className="back-button">Back To Home</NavLink>
            </div>
        </div>
    );
};

// export default Error404;
