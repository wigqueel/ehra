import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive, deleteItem, getItemData, updateItem } from '../../../../../redux/themes-reducer';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import { useParams } from 'react-router-dom';
import ButtonsWrapper from '../../common/ButtonsWrapper';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import { setBreadcrumbs } from '../../../../../redux/app-reducer';
import Button from "../../common/buttons/Button";
import CustomField from "../../common/formControlls/CustomField";

import themesOptions from '../../../../Public/themes/Trafalgar/themeOption';

// const StyledField = styled(Field)`
//     width: 100%;
//     background: #F9F9F9;
//     border: 1px solid #E8EBF0;
//     padding: 14px 20px;
//     font-weight: 300;
//     font-size: 16px;
//     line-height: 18px;
//     letter-spacing: -0.03em;
//     color: #99A6B6;
//     border-radius: 12px;
//     outline: none;
//     transition: border-color .3s;
// `

const Update = () => {
    const item = useSelector(state => state.themes.item);
    const themeFields = themesOptions;

    const dispatch = useDispatch();
    let {id} = useParams();
    
    const setActiveTheme = () => {
        dispatch(setActive(id));
    }

    const onClickDeleteTheme = () => {
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
        window.alert(JSON.stringify(values, 0, 2))
        // dispatch(updateItem(values));
    }

    return (
        <>
            <CardHeader>
                <CardTitle>Theme update: {item && item.name}</CardTitle>
            </CardHeader>

            {item &&
            <div>
                <p className='uk-margin-top'>Active: {item.active === "1" ? "true" : "false"}</p>
            </div>
            }

            {item && <Form
                onSubmit={onSubmit}
                initialValues={{name: item.name, id: item.id}}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} className={'uk-margin-top'}>
                        <div>
                            {item && <CustomField
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Theme name"
                            />}
                        </div>

                        {themeFields.map(field => <div className='uk-margin-top'>
                            <CustomField
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                placeholder={field.label}
                            />
                        </div>)}

                        <ButtonsWrapper>
                            <Button variant="primary" type="submit" disabled={submitting || pristine}>Update theme</Button>
                            <Button variant="primary" type="button" onClick={setActiveTheme}>Set active theme</Button>
                            <Button variant="danger" type="button" onClick={onClickDeleteTheme}>Delete theme</Button>
                        </ButtonsWrapper>
                    </form>
                )}
            />}
        </>
    );
};

export default Update;