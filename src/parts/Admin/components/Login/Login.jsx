import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonsWrapper from '../../components/common/ButtonsWrapper';
import SubmitButton from '../../components/common/formControlls/SubmitButton';
import { Form } from 'react-final-form'
import CustomField from '../../components/common/formControlls/CustomField';
import styled from 'styled-components';
import { login } from '../../../../redux/auth-reducer';
import StyledNotification from '../styled/StyledNotification';
import { Redirect } from 'react-router-dom';

const LoginPageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #F8F9FD;
    
    .login-form-wrapper {
        min-width: 490px;

        .login-title {
            font-weight: 500;
            font-size: 20px;
            line-height: 32px;
            text-align: center;
            letter-spacing: -0.03em;
            color: #1D1D1D;
            padding: 0 10% 32px;
        }

        .login-card {
            max-width: 580px;
            padding: 60px 76px;
            background: #FFFFFF;
            box-shadow: 0px 15px 50px rgba(0, 0, 0, 0.04);
            border-radius: 24px;
        }
    }
`

const Login = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.auth.isAuth);
    const authLoading = useSelector(state => state.auth.loginFormLoading);

    const onSubmit = values => {
        // window.alert(JSON.stringify(values, 0, 2))
        dispatch(login(values));
    }
    
    return (
        <>
            {isAuth 
                ? <Redirect to="/admiral-admin" />
                : <LoginPageWrapper>
                    <StyledNotification className={`centered`}/>
                    <div className="login-form-wrapper">
                        <div className="login-title">Please fill in the fields below to log in</div>
                        <div className="login-card">
                            <Form
                                onSubmit={onSubmit}
                                initialValues={''}
                                render={({ handleSubmit, form, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit} className={'uk-margin-top'}>
                                        <div>
                                            <CustomField name={'username'} type={'text'} placeholder={'Name'} label={'Username'} />
                                        </div>
                                        <div className={`uk-margin-top`}>
                                            <CustomField name={'password'} type={'password'} placeholder={'Password'} label={'Password'} />
                                        </div>
                                        
                                        <ButtonsWrapper className={`uk-text-center`}>
                                            <SubmitButton type="submit" disabled={submitting || pristine} className={'primary'}>
                                                <div data-uk-spinner="ratio: 0.8" className={authLoading ? 'active uk-icon uk-spinner' : 'uk-icon uk-spinner'}></div>Login
                                            </SubmitButton>
                                        </ButtonsWrapper>
                                    </form>
                                )}
                            />
                        </div>
                    </div>
                </LoginPageWrapper>
            }
        </>
    );
};

export default Login;