import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import Login from './components/Login/Login';
import AdminWrapper from './components/AdminWrapper/AdminWrapper';

const Admin = () => {

    return (
        <div className="uk-position-relative">
            
            <Switch>
                <Route 
                    exact
                    path="/admiral-admin/login"
                    component={Login}
                />

                <Route
                    path="/admiral-admin"
                    component={AdminWrapper}
                />

                <Redirect to="/404"/>
            </Switch>
                    
        </div>
    )
}

export default Admin;