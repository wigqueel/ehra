import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import List from '../CRUDs/Themes/List';
import View from '../CRUDs/Themes/View';
import Create from '../CRUDs/Themes/Create';
import Update from '../CRUDs/Themes/Update';
import StyledNotification from '../styled/StyledNotification';


const AdminWrapper = () => {

    return (
        <>
            <Header />
            <Aside />

            <StyledNotification />

            <Main>
                <Switch>
                    <Route
                        exact
                        path="/admiral-admin"
                        component={Dashboard}
                    />

                    <Route
                        exact
                        path="/admiral-admin/themes"
                        component={List}
                    />

                    <Route
                        exact
                        path="/admiral-admin/themes/view/:id"
                        component={View}
                    />

                    <Route
                        exact
                        path="/admiral-admin/themes/update/:id"
                        component={Update}
                    />

                    <Route
                        exact
                        path="/admiral-admin/themes/create"
                        component={Create}
                    />
                    
                    
                    
                    <Route path="/404" component={NotFound}/>

                    <Redirect to="/404"/>
                </Switch>
            </Main>
        </>
    )
}

export default AdminWrapper;
