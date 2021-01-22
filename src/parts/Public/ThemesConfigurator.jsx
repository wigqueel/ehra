import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveTheme } from '../../redux/public-reducer';
import Trafalgar from './themes/Trafalgar/Trafalgar';


const ThemesCase = ({name}) => {
    switch (name) {
        case 'Trafalgar':
            return <Trafalgar />;
        default:
            return null;
    }
}

const ThemesConfigurator = () => {
    const dispatch = useDispatch();
    // const id = useSelector(state => state.public.activeThemeId);
    const name = useSelector(state => state.public.activeThemeName);

    useEffect(() => {
        dispatch(getActiveTheme());
    }, [name]);

    return (
        name && <ThemesCase name={name}/>
    )
}

export default ThemesConfigurator;