import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbs } from '../../../../redux/app-reducer';

const Dashboard = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumbs([
            {
                name: 'Dashboard',
                link: false
            },
        ]))
    }, []);
    
    return (
        <>
            Dashboard
        </>
    );
};

export default Dashboard;