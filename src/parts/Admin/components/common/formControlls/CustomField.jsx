import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';

const StyledField = styled.input`
    width: 100%;
    background: #F9F9F9;
    border: 1px solid #E8EBF0;
    padding: 14px 20px;
    font-weight: 300;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.03em;
    color: #99A6B6;
    border-radius: 12px;
    outline: none;
    transition: border-color .3s;

    &.has-error {
        border-color: red;
    }
`

const ErrorMessage = styled.div`
    margin-top: 10px;
    color: red;
`

const CustomField = ({type, placeholder, label, ...props}) => {
    return (
        <Field {...props}>
            {({ input, meta }) => (
                <div>
                    {label && <label className={`uk-display-block uk-margin-small-bottom`}>{label}</label>}
                    <StyledField {...input} type={type} placeholder={placeholder} className={(meta.error && meta.touched) && `has-error`}/>
                    {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                </div>
            )}  
        </Field>
    )
}

export default CustomField;