import React, { useState } from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const StyledButton = styled.button`
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
    position: relative;
    transition: .2s;

    .uk-spinner {
        position: absolute;
        top: 0;
        left: 0;
        background-color: inherit;
        width: 100%;
        height: 100%;
        border-radius: 15px;;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: .1s;

        &.active {
            opacity: 1;
        }
    }

    &.only-icon {
        width: 40px;
        height: 40px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: none;
    }

    &.small {
        font-weight: 300;
        font-size: 13px;
        padding: 10px 20px;
        border-radius: 7px;
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

    &:disabled {
        cursor: not-allowed;
    }
`

const SubmitButton = (props) => {
    return (
        <>
            <StyledButton {...props} >
                {props.children}
            </StyledButton>
        </>
    )
}

export default SubmitButton;