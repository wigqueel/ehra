import React, { useState } from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const StyledNavlink = styled(NavLink)`
    padding: 16px 32px;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    display: inline-block;
    outline: none;
    border: none;
    font-family: "E-Ukraine";
    cursor: pointer;
    transition: .2s;

    &.only-icon {
        width: 40px;
        height: 40px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: none;
    }
    
    & + & {
        margin-left: 8px;
    }

    &.primary {
        background-color: #4974E1;
        color: #fff;

        &:hover {
            background-color: #4D86FF;
        }

        &:active {
            background-color: #336CE3;
        }
    }

    &.danger {
        background-color: #FF6C6C;
        color: #fff;

        &:hover {
            background-color: #FF5656;
        }

        &:active {
            background-color: #EC5B5B;
        }
    }

    &.secondary {
        background-color: #F8F9FD;
        color: #555;

        &:hover {
            background-color: #e6e7ea;
            color: #333;
        }
    }
`

const AdmiralNavlink = (props) => {
    return (
        <>
            <StyledNavlink className={props.type} to={ props.to ? props.to : false } onClick={ props.action ? (() =>  { props.action(props.elementId) }) : false } data-uk-tooltip={props.tooltip}>
                {props.children}
            </StyledNavlink>
        </>
    )
}

export default AdmiralNavlink;