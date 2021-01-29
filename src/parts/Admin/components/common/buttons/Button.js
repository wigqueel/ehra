import styled, {css} from "styled-components";
import PlusIcon from "../../../../../assets/icons/plus.svg";
import ButtonsWrapper from "../ButtonsWrapper";
import React from "react";

//$iconOnly why? ->
//https://styled-components.com/docs/api#transient-props

// <Button variant="primary">Primary</Button>
// <Button variant="danger">Danger</Button>
// <Button variant="secondary">Secondary</Button>
// <Button $iconOnly><img src={PlusIcon} alt=""/></Button>
// <Button small>small</Button>

const handleVariant = variant => {
    switch (variant) {
        case "primary":
            return css`
              background-color: #4974E1;
              color: #fff;

              &:hover {
                background-color: #4D86FF;
              }

              &:active {
                background-color: #336CE3;
              }
            `;
        case "danger":
            return css`
              background-color: #FF6C6C;
              color: #fff;

              &:hover {
                background-color: #FF5656;
              }

              &:active {
                background-color: #FF5656;
              }
            `;
        case "secondary":
            return css`
              background-color: #F8F9FD;
              color: #555;

              &:hover {
                background-color: #e6e7ea;
                color: #333;
              }
            `;
        default:
            return css`
              background-color: #4974E1;
              color: #fff;

              &:hover {
                background-color: #4D86FF;
              }

              &:active {
                background-color: #336CE3;
              }
            `;
    }
};

const Button = styled.button`
  padding: 16px 32px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.06);
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

  &:disabled {
    cursor: not-allowed;
  }

  & + & {
    margin-left: 8px;
  }

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

  ${(props) => props?.$iconOnly && css`
    width: 40px;
    height: 40px;
    padding: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
  `};

  ${(props) => props?.small && css`
    font-weight: 300;
    font-size: 13px;
    padding: 10px 20px;
    border-radius: 7px;
  `};

  ${(props) => handleVariant(props?.variant)};
`

export default Button;