import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';

import ThemesList from '../CRUDs/Themes/List';
import ThemesView from '../CRUDs/Themes/View';
import ThemesCreate from '../CRUDs/Themes/Create';
import ThemesUpdate from '../CRUDs/Themes/Update';

import LanguagesList from '../CRUDs/Languages/List';
import LanguagesView from '../CRUDs/Languages/View';
import LanguagesCreate from '../CRUDs/Languages/Create';
import LanguagesUpdate from '../CRUDs/Languages/Update';

import StyledNotification from '../styled/StyledNotification';
import { useSelector } from 'react-redux';
import Pages from "../CRUDs/Pages/Pages";


const AdminWrapper = () => {

    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <>
            {true
                ? <>    
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
                                component={ThemesList}
                            />

                            <Route
                                exact
                                path="/admiral-admin/themes/view/:id"
                                component={ThemesView}
                            />

                            <Route
                                exact
                                path="/admiral-admin/themes/update/:id"
                                component={ThemesUpdate}
                            />

                            <Route
                                exact
                                path="/admiral-admin/themes/create"
                                component={ThemesCreate}
                            />


                            <Route
                                exact
                                path="/admiral-admin/languages"
                                component={LanguagesList}
                            />

                            <Route
                                exact
                                path="/admiral-admin/languages/view/:id"
                                component={LanguagesView}
                            />

                            <Route
                                exact
                                path="/admiral-admin/languages/update/:id"
                                component={LanguagesUpdate}
                            />

                            <Route
                                exact
                                path="/admiral-admin/languages/create"
                                component={LanguagesCreate}
                            />

                            <Route
                                exact
                                path="/admiral-admin/pages"
                                component={Pages}
                            />
                            
                            <Route path="/404" component={NotFound}/>

                            <Redirect to="/404"/>
                        </Switch>
                    </Main>
                </>
                : <Redirect to="/admiral-admin/login" />
            }
        </>
    )
}

export default AdminWrapper;
