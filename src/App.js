import './App.css';
import React, { Suspense } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Admin = React.lazy(() => import('./parts/Admin/Admin'));
const Public = React.lazy(() => import('./parts/Public/Public'));


const App = () => {
    return (
        <>
            <BrowserRouter>
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
            </BrowserRouter>
        </>
    );
}

export default App;