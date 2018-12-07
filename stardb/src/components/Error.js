import React from 'react';

import './Error.css';


const Error = () => {
    return (
        <div className="error">
            <i className="fab fa-jedi-order"></i>
            <span className="boom">BOOM!</span>
            <span>something has gone terribly wrong</span>
            <span>(but we already sent droids to fix it)</span>
        
        </div>
    );
};

export default Error;