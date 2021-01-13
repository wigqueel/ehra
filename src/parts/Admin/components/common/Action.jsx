import React, { useState } from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const ActionWrapper = styled(NavLink)`
    transition: .2s;
    width: 28px;
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0.6;

    &:hover {
        background: rgb(80 118 156 / 10%);
        opacity: 1;
    }

    img {
        max-width: 16px;
    }
`

const Action = (props) => {
    return (
        <>
            <ActionWrapper to={ props.action ? false : props.to } onClick={ props.action ? (() =>  { props.action(props.itemId) }) : false } >
                <img src={ props.img } alt="" /> 
            </ActionWrapper>
        </>
    )
}

export default Action;