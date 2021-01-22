import React, { useEffect } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import Login from './components/Login/Login';
import AdminWrapper from './components/AdminWrapper/AdminWrapper';
import {useDispatch, useSelector} from 'react-redux';
import { getUserData } from '../../redux/auth-reducer';
import FullSizePreloader from "./components/common/FullSizePreloader";

const Admin = () => {
    const userDataLoading = useSelector(state => state.auth.userDataLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
    }, []);

    return (
        <div className="uk-position-relative">
            <FullSizePreloader show={userDataLoading}/>
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