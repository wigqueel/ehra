import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, setActive, deleteItem, changeSort, applyFilter, setDefault, updatePageSize } from '../../../../../redux/languages-reducer';
import Action from '../../common/Action';
import ActionsWrapper from '../../common/ActionsWrapper';
import Checkbox from '../../common/Checkbox';
import Pagination from '../../common/Pagination';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import CrudTableContainer from '../../styled/CrudTableContainer';
import { setBreadcrumbs } from '../../../../../redux/app-reducer';

import DeleteIcon from '../../../../../assets/icons/trash.svg';
import EyeIcon from '../../../../../assets/icons/eye.svg';
import PlusIcon from '../../../../../assets/icons/plus.svg';
import PencilIcon from '../../../../../assets/icons/pencil.svg';
import FilterIcon from '../../../../../assets/icons/filter.svg';
import FilterContainer from '../../styled/FilterContainer';
import { Form } from 'react-final-form';
import CustomField from '../../common/formControlls/CustomField';
import ButtonsWrapper from '../../common/ButtonsWrapper';
import SubmitButton from '../../common/formControlls/SubmitButton';
import {Link} from "react-router-dom";
import Button from "../../common/buttons/Button";


const CrudTableHead = (props) => {
    const classValue = (fields, onClick, sortField, sortType) => {
        return (
            fields.map(field => {
                let classString = '';

                if (field.sortAllow) {
                    classString += `sort_allow`;
                }

                if (sortField === field.code) {
                    classString += ` ${sortType}`;
                }

                if (field.actionsColumn) {
                    classString = `actions-head`;
                }

                

                return (
                    <th key={field.label} className={classString} onClick={
                        field.sortAllow ? (() => {
                            onClick(field.code)
                            console.log(field.sortAllow)
                        }) : (() => {
                            
                        })
                    }>{field.label}</th>
                )
            })
        )
    }

    return (
        <thead>
            <tr>
                {classValue(props.fields, props.onClick, props.sortField, props.sortType)}
            </tr>
        </thead>
    )
}

const List = () => {
    
    const items = useSelector(state => state.languages.items);
    const totalCount = useSelector(state => state.languages.totalCount);
    const currentPage = useSelector(state => state.languages.currentPage);
    const sortField = useSelector(state => state.languages.sortField);
    const sortType = useSelector(state => state.languages.sortType);
    const pageSize = useSelector(state => state.languages.pageSize);
    
    const dispatch = useDispatch();

    const [isFilterOpen, toggleFilter] = useState(false);
    
    useEffect(() => {
        dispatch(getItems(currentPage, pageSize));
        dispatch(setBreadcrumbs([
            {
                name: 'Dashboard',
                link: '/admiral-admin'
            },
            {
                name: 'Languages',
                link: false
            }
        ]))
    }, []);

    const setActiveItem = (id) => {
        dispatch(setActive(id));
    }

    const setDefaultItem = (id) => {
        dispatch(setDefault(id));
    }

    const onClickDeleteItem = (id) => {
        dispatch(deleteItem(id));
    }

    const onClickSortTable = (code) => {
        dispatch(changeSort(sortField, sortType, code));
    }

    const onPageChange = (pageNumber) => {
        dispatch(getItems(pageNumber, pageSize));
    }

    const onClickFilterToggle = () => {
        toggleFilter(!isFilterOpen);
    }

    const onFilterSubmit = (values) => {
        // window.alert(JSON.stringify(values, 0, 2))
        dispatch(applyFilter(values));
    }
    
    const onClickFilterReset = (form) => {
        dispatch(applyFilter());
        form.reset();
    }

    const handlePageSizeChange = (value) => {
        dispatch(updatePageSize(value));
        dispatch(getItems());
    }

    const fields = [
        {
            code: 'id',
            label: 'Id',
            sortAllow: true
        },
        {
            code: 'activity',
            label: 'Active',
            sortAllow: true
        },
        {
            code: 'default_language',
            label: 'Default',
            sortAllow: true
        },
        {
            code: 'name',
            label: 'Name',
            sortAllow: true
        },
        {
            code: 'code',
            label: 'Code',
            sortAllow: true
        },
        {
            code: 'url_code',
            label: 'URL',
            sortAllow: true
        },
        {
            code: 'create_date',
            label: 'Create date',
            sortAllow: true
        },
        {
            code: 'update_date',
            label: 'Update date',
            sortAllow: true
        },
        {
            label: 'Actions',
            sortAllow: false,
            actionsColumn: true
        }
    ];
    
    return (
        <>
            <FilterContainer className={isFilterOpen ? 'active': ''}>
                <Form
                    onSubmit={onFilterSubmit}
                    initialValues={''}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className={'uk-margin-top'}>
                            <div className={'uk-child-width-1-2'} data-uk-grid>
                                <div>
                                    <CustomField name={'name'} type={'text'} placeholder={'Name'} />
                                </div>
                                <div>
                                    <CustomField name={'update_by'} type={'text'} placeholder={'Updated by'} />
                                </div>
                            </div>
                            
                            <ButtonsWrapper>
                                <SubmitButton type="submit" disabled={submitting || pristine} className={'primary small'}>Filter</SubmitButton>
                                <SubmitButton type="button" onClick={() => { onClickFilterReset(form) }} disabled={submitting || pristine} className={'secondary small'}>Reset</SubmitButton>
                            </ButtonsWrapper>
                        </form>
                    )}
                />
            </FilterContainer>

            <CardHeader>
                <div className="uk-flex uk-flex-middle">
                    <CardTitle className="uk-margin-right">Languages</CardTitle>
                    <Button as={Link} to="/admiral-admin/languages/create" tooltip="Create language" $iconOnly><img src={PlusIcon} alt="create"/></Button>
                </div>
                <Button variant="secondary" $iconOnly onClick={ onClickFilterToggle } tooltip={isFilterOpen ? 'Close filter': 'Open filter'}><img src={FilterIcon} alt="toggle filter" /></Button>
            </CardHeader>

            {items && <CrudTableContainer>
                <CrudTableHead fields={fields} onClick={onClickSortTable} sortField={sortField} sortType={sortType}/>
                
                <tbody>
                    {items.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <Checkbox name={'active_' + item.id} id={'checkbox_active_' + item.id} idNumber={item.id} checked={item.active === '1' ? 'checked' : ''} setActiveItem={setActiveItem}/>
                                </td>
                                <td>
                                    <Checkbox name={'default_' + item.id} id={'checkbox_default_' + item.id} idNumber={item.id} checked={item.default_item === '1' ? 'checked' : ''} setActiveItem={setDefaultItem}/>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.code}</td>
                                <td>{item.url_code}</td>
                                <td>{item.create_date}</td>
                                <td>{item.update_date}</td>
                                <td>
                                    <ActionsWrapper>
                                        <Action onClick={() => onClickDeleteItem(item.id)} img={DeleteIcon}/>
                                        <Action as={Link} to={`/admiral-admin/languages/view/${item.id}`}
                                                img={EyeIcon}/>
                                        <Action as={Link} to={`/admiral-admin/languages/update/${item.id}`}
                                                img={PencilIcon}/>
                                    </ActionsWrapper>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </CrudTableContainer>}

            <div className="uk-margin-top">
                <Pagination
                    className="uk-margin-right"
                    handlePageSizeChange={handlePageSizeChange}
                    totalItemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </div>
        </>
    );
};

export default List;