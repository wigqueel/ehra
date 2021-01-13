import React from 'react';
import { NavLink } from 'react-router-dom';


const Public = () => {

    return (
        <div className="uk-position-relative">
            <NavLink to="/admiral-admin">Go to admin part</NavLink>
        </div>
    )
}

export default Public;