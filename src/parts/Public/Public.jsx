import React from 'react';
import { NavLink } from 'react-router-dom';
import AdminPanel from './common/AdminPanel/AdminPanel';
import ThemesConfigurator from './ThemesConfigurator';


const Public = () => {

    return (
        <div className="uk-position-relative">
            <AdminPanel>
                <NavLink to="/admiral-admin">Go to admin part</NavLink>
            </AdminPanel>

            <ThemesConfigurator />
        </div>
    )
}

export default Public;