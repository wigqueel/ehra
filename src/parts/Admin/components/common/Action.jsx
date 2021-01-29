import React, {useState} from 'react';
import styled from "styled-components";

const ActionWrapper = styled.button`
  cursor: pointer;
  border: none;
  transition: .2s;
  width: 28px;
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0.6;

  &:focus {
    outline: none;
  }

  &:hover {
    background: rgb(80 118 156 / 10%);
    opacity: 1;
  }

  img {
    max-width: 16px;
  }
`

const Action = ({to, onClick, img, as}) => {
    return (
        <>
            <ActionWrapper as={as} to={to} onClick={onClick}>
                <img src={img} alt=""/>
            </ActionWrapper>
        </>
    )
}

export default Action;