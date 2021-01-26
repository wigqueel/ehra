import './App.css';
import React, { Suspense } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from './history';


const Admin = React.lazy(() => import('./parts/Admin/Admin'));
const Public = React.lazy(() => import('./parts/Public/Public'));


const App = () => {
    return (
        <>
            <Router history={history}>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Switch>
                        <Route
                            path="/admiral-admin"
                            render={() => (
                                <Admin />
                            )}
                        />
                        
                        <Route
                            path="/"
                            render={() => (
                                <Public />
                            )}
                        />
                    </Switch>
                </Suspense>
            </Router>
        </>
    );
}

export default App;