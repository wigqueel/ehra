import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive, deleteItem, getItemData, updateItem } from '../../../../../redux/themes-reducer';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import { useParams } from 'react-router-dom';
import ButtonsWrapper from '../../common/ButtonsWrapper';
import Button from '../../common/AdmiralNavlink';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import SubmitButton from '../../common/formControlls/SubmitButton';
import { setBreadcrumbs } from '../../../../../redux/app-reducer';

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
    const item = useSelector(state => state.themes.item);
    const dispatch = useDispatch();
    let {id} = useParams();
    
    const setActiveTheme = (id) => {
        dispatch(setActive(id));
    }

    const onClickDeleteTheme = (id) => {
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
                name: 'Themes',
                link: '/admiral-admin/themes'
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
                <CardTitle>Theme update: {item && item.name}</CardTitle>
            </CardHeader>

            {item && <Form
                onSubmit={onSubmit}
                initialValues={{name: item.name, id: item.id}}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} className={'uk-margin-top'}>
                        <div>
                            {item && <StyledField
                                name="name"
                                component="input"
                                type="text"
                                placeholder="Theme name"
                                // initialValue={item.name}
                                // defaultValue={item.name}
                            />}
                        </div>
                        
                        <ButtonsWrapper>
                            <SubmitButton type="submit" disabled={submitting || pristine} className={'primary'}>Update theme</SubmitButton>
                            <Button type={'primary'} action={setActiveTheme} elementId={id} to={false}>Set active theme</Button>
                            <Button type={'danger'} action={onClickDeleteTheme} elementId={id} to={'/admiral-admin/themes'}>Delete theme</Button>
                        </ButtonsWrapper>
                    </form>
                )}
            />}
        </>
    );
};

export default Update;