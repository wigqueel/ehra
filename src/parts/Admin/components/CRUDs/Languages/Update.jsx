import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setActive, deleteItem, getItemData, updateItem, setDefault} from '../../../../../redux/languages-reducer';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import { useParams } from 'react-router-dom';
import ButtonsWrapper from '../../common/ButtonsWrapper';
// import Button from '../../common/AdmiralNavlink';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import SubmitButton from '../../common/formControlls/SubmitButton';
import { setBreadcrumbs } from '../../../../../redux/app-reducer';
import Button from "../../common/buttons/Button";
import CustomField from "../../common/formControlls/CustomField";

const StyledField = styled(Field)`
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
`

const Update = () => {
    const item = useSelector(state => state.languages.item);

    const dispatch = useDispatch();
    let {id} = useParams();
    
    const setActiveLanguage = () => {
        dispatch(setActive(id));
    }

    const setDefaultLanguage = () => {
        dispatch(setDefault(id));
    }

    const onClickDeleteLanguage = () => {
        dispatch(deleteItem(id));
    }

    useEffect(() => {
        dispatch(getItemData(id));
    }, [id]);

    useEffect(() => {
        item && dispatch(setBreadcrumbs([
            {
                name: 'Dashboard',
                link: '/admiral-admin'
            },
            {
                name: 'Languages',
                link: '/admiral-admin/languages'
            },
            {
                name: item.name,
                link: false
            }
        ]))
    }, [item]);

    const onSubmit = values => {
        // window.alert(JSON.stringify(values, 0, 2))
        dispatch(updateItem(values));
    }

    return (
        <>
            <CardHeader>
                <CardTitle>Language update: {item && item.name}</CardTitle>
            </CardHeader>

            {item &&
            <div>
                <p className="uk-margin-top">Active: {item.active === "1" ? "true" : "false"}</p>
                <p>Default: {item.default_item === "1" ? "true" : "false"}</p>
            </div>
            }

            {item && <Form
                onSubmit={onSubmit}
                initialValues={{name: item.name, url_code: item.url_code, code: item.code, id: item.id}}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} className={'uk-margin-top'}>
                        <div>
                            <CustomField className="uk-margin-small-bottom" name={'name'} type={'text'} placeholder={'Name'}/>
                            <CustomField className="uk-margin-small-bottom" name={'url_code'} type={'text'} placeholder={'URL'}/>
                            <CustomField className="uk-margin-small-bottom" name={'code'} type={'text'} placeholder={'Code'}/>
                        </div>

                        <ButtonsWrapper>
                            <Button type="submit" disabled={submitting || pristine} className={'primary'}>Update language</Button>
                            <Button type="button" variant={'primary'} onClick={setActiveLanguage}>Set active</Button>
                            <Button type="button" variant={'primary'} onClick={setDefaultLanguage}>Set as default</Button>
                            <Button type="button" variant={'danger'} onClick={onClickDeleteLanguage}>Delete</Button>
                        </ButtonsWrapper>
                    </form>
                )}
            />}
        </>
    );
};

export default Update;