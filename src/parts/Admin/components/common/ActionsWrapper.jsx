import React, { useState } from 'react';
import styled from "styled-components";

const ActionsWrapperStyled = styled.div`
    width: 136px;
    display: flex;
    justify-content: flex-end;
    margin-left: auto;

    .actions-wrapper {
        height: 36px;
        width: min-content;
        background: #F8F9FD;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: auto;
        border-radius: 18px;

        &.active .actions-wrapper-inner {
            padding: 4px;
            width: calc(100% - 36px);
            transition: .2s;
            opacity: 1;
            pointer-events: all;
        }

        &.active .action-expand-button .action-expand-button-icon {
            transform: rotate(90deg);
            opacity: 0.6;
        }

        .actions-wrapper-inner {
            padding: 0px;
            height: 100%;
            display: flex;
            width: 0;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
            transition: 0.1s;
        }

        .action-expand-button {
            height: 36px;
            width: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: .2s;
            border-radius: 50%;

            &:hover {
                background: rgb(80 118 156 / 10%);
            }

            .action-expand-button-icon {
                display: flex;
                transition: .2s;

                span {
                    height: 4px;
                    width: 4px;
                    margin-right: 3px;
                    background: #1d1d1d;
                    border-radius: 50%;

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
`

const ActionsWrapper = (props) => {

    let [activeMode, toggleActiveMode] = useState(false);

    const onClickToggleActiveMode = () => {
        toggleActiveMode(!activeMode);
    }

    return (
        <>
            <ActionsWrapperStyled onClick={onClickToggleActiveMode}>
                <div className={(activeMode ? 'active ' : '') + 'actions-wrapper'}>
                    <div className='actions-wrapper-inner'>
                        {props.children}
                    </div>
                    <div className='action-expand-button'>
                        <div className='action-expand-button-icon'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </ActionsWrapperStyled>
        </>
    )
}

export default ActionsWrapper;