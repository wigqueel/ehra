import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveTheme } from '../../redux/public-reducer';
import Trafalgar from './themes/Trafalgar/Trafalgar';


const ThemesCase = ({themeName, themeContent}) => {
    switch (themeName) {
        case 'Trafalgar':
            return <Trafalgar themeContent={themeContent}/>;
        default:
            return null;
    }
}

const ThemesConfigurator = () => {
    const dispatch = useDispatch();
    // const themeId = useSelector(state => state.public.activeThemeId);
    const themeName = useSelector(state => state.public.activeThemeName);
    const themeContent = useSelector(state => state.public.activeThemeContent);

    useEffect(() => {
        dispatch(getActiveTheme());
        console.log(themeName);
        console.log(themeContent);
    }, []);

    return (
        themeName && <ThemesCase themeName={themeName} themeContent={themeContent}/>
    )
}

export default ThemesConfigurator;