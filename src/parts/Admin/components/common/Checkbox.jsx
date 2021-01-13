import React from 'react';
import styled from "styled-components";

const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;

    input {
        opacity: 0;
        pointer-events: none;
        height: 0;
        position: absolute;

        &:checked + span::after {
            top: 3.5px;
            left: 7px;
            width: 3px;
            height: 7px;
            border-right: 2px solid #4974E1;
            border-bottom: 2px solid #4974E1;
        }

        &:checked + span::before {
            border-color: #4974E1;
        }
    }

    span {
        position: relative;
        padding-left: 25px;
        color: #212121;
        min-height: 20px;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            border: 2px solid #99A6B6;
            width: 15px;
            height: 15px;
            border-radius: 5px;
            cursor: pointer;
        }

        &::after {
            content: "";
            position: absolute;
            top: 11.5px;
            left: 7px;
            width: 0px;
            height: 0px;
            border: 0px solid transparent;
            transform: rotate(45deg);
            cursor: pointer;
            transition: .3s;
        }
    }
`

const Checkbox = (props) => {
    return (
        <>
            <CheckboxWrapper htmlFor={props.id}>
                <input type="checkbox" name={props.name} id={props.id} checked={props.checked} onChange={() => { props.setActiveItem(props.idNumber) }} />
                <span></span>
            </CheckboxWrapper>
        </>
    )
}

export default Checkbox;