import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createItem} from '../../../../../redux/actions';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import ButtonsWrapper from '../../common/ButtonsWrapper';
import Button from '../../common/buttons/Button';
import SubmitButton from '../../common/formControlls/SubmitButton';
import {Form, Field} from 'react-final-form'
import {required} from '../../../utils/validators/validators';
import {setBreadcrumbs} from '../../../../../redux/app-reducer';
import CustomField from '../../common/formControlls/CustomField';

const ENTITY = 'themes';

const Create = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumbs([
            {
                name: 'Dashboard',
                link: '/admiral-admin'
            },
            {
                name: 'Themes',
                link: '/admiral-admin/themes'
            },
            {
                name: 'Create',
                link: false
            }
        ]))
    }, []);

    const onSubmit = values => {
        dispatch(createItem(ENTITY, values));
    }

    return (
        <>
            <CardHeader>
                <CardTitle>New theme creation</CardTitle>
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
                            <CustomField label="Name" name={'name'} type={'text'} placeholder={'Name'}/>
                        </div>

                        <ButtonsWrapper>
                            <Button variant="primary" type="submit" disabled={submitting || pristine}>Create
                                theme</Button>
                        </ButtonsWrapper>
                    </form>
                )}
            />
        </>
    );
}
;

export default Create;