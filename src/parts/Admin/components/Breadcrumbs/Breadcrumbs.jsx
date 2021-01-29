import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import BreadcrumbsContainer from './styled';

const Breadcrumbs = () => {

    const breadcrumbsItem = useSelector(state => state.app.breadcrumbs);

    return (
        <BreadcrumbsContainer>
            <ul className="breadcrumb">
                {breadcrumbsItem.map((item, i) => <li key={i}>
                    {item.link ? <NavLink to={item.link}>{item.name}</NavLink> : item.name}
                </li>)}
            </ul>
        </BreadcrumbsContainer>
    )
}

export default Breadcrumbs;