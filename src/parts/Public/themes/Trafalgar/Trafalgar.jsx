import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';


const Trafalgar = ({themeContent}) => {
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        
    }, [location])
    

    return (
        
        <Header phone={themeContent.phone} adress={themeContent.adress}/>
        
    )
}

export default Trafalgar;