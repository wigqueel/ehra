import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getPageByUrl } from '../../../../redux/public-reducer';
import Header from './Header/Header';


const Trafalgar = ({themeContent}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const pageData = useSelector(state => state.public.pageData);
    
    const pathname = location.pathname;

    useEffect(() => {
        dispatch(getPageByUrl(pathname));
    }, [location])
    

    return (
        <>
            <Header phone={themeContent.phone} adress={themeContent.adress}/>

            {pageData && JSON.stringify(pageData)}
        </>
    )
}

export default Trafalgar;