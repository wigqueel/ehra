import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createItem} from '../../../../../redux/languages-reducer';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import {Redirect, useParams} from 'react-router-dom';
import ButtonsWrapper from '../../common/ButtonsWrapper';
import Button from '../../common/buttons/Button';
import SubmitButton from '../../common/formControlls/SubmitButton';
import {Form, Field} from 'react-final-form'
import {required} from '../../../utils/validators/validators';
import {setBreadcrumbs} from '../../../../../redux/app-reducer';
import CustomField from '../../common/formControlls/CustomField';

import PlusIcon from '../../../../../assets/icons/plus.svg';

const Create = () => {
        const dispatch = useDispatch();
        const redirectToList = useSelector(state => state.themes.redirectToList);

        useEffect(() => {
            dispatch(setBreadcrumbs([
                {
                    name: 'Dashboard',
                    link: '/admiral-admin'
                },
                {
                    name: 'Languages',
                    link: '/admiral-admin/languages'
                },
                {
                    name: 'Create',
                    link: false
                }
            ]))
        }, []);

        const onSubmit = values => {
            dispatch(createItem(values));
        }

        return (
            <>
                {redirectToList
                    ? <Redirect to={'/admiral-admin/languages'}/>
                    : <>
                        <CardHeader>
                            <CardTitle>New language creation</CardTitle>
                        </CardHeader>

                        <Form
                            onSubmit={onSubmit}
                            initialValues={''}
                            validate={values => {
                                const errors = {}
                                if (!values.name) {
                                    errors.name = 'This is required field'
                                }
                                return errors
                            }}
                            render={({handleSubmit, form, submitting, pristine, values}) => (
                                <form onSubmit={handleSubmit} className={'uk-margin-top'}>
                                    <div>
                                        <CustomField className="uk-margin-small-bottom" name={'name'} type={'text'} placeholder={'Name'}/>
                                        <CustomField className="uk-margin-small-bottom" name={'url_code'} type={'text'} placeholder={'URL'}/>
                                        <CustomField className="uk-margin-small-bottom" name={'code'} type={'text'} placeholder={'Code'}/>
                                    </div>

                                    <ButtonsWrapper>
                                        <Button variant="primary" type="submit" disabled={submitting || pristine}>Create
                                            language</Button>
                                    </ButtonsWrapper>
                                </form>
                            )}
                        />
                    </>
                }
            </>
        );
    }
;

export default Create;