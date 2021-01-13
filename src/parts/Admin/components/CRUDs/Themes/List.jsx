import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, setActive, deleteItem, changeSort, applyFilter } from '../../../../../redux/themes-reducer';
import Action from '../../common/Action';
import ActionsWrapper from '../../common/ActionsWrapper';
import Checkbox from '../../common/Checkbox';
import Pagination from '../../common/Pagination';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import CrudTableContainer from '../../styled/CrudTableContainer';
import Button from '../../common/AdmiralNavlink';
import { setBreadcrumbs } from '../../../../../redux/app-reducer';

import DeleteIcon from '../../../../../assets/icons/trash.svg';
import ViewIcon from '../../../../../assets/icons/view.svg';
import PlusIcon from '../../../../../assets/icons/plus.svg';
import PencilIcon from '../../../../../assets/icons/pencil.svg';
import FilterIcon from '../../../../../assets/icons/filter.svg';
import FilterContainer from '../../styled/FilterContainer';
import { Form } from 'react-final-form';
import CustomField from '../../common/formControlls/CustomField';
import ButtonsWrapper from '../../common/ButtonsWrapper';
import SubmitButton from '../../common/formControlls/SubmitButton';


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
    
    const items = useSelector(state => state.themes.items);
    const totalCount = useSelector(state => state.themes.totalCount);
    const currentPage = useSelector(state => state.themes.currentPage);
    const sortField = useSelector(state => state.themes.sortField);
    const sortType = useSelector(state => state.themes.sortType);
    const pageSize = useSelector(state => state.themes.pageSize);
    
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
                name: 'Themes',
                link: false
            }
        ]))
    }, []);

    const setActiveItem = (id) => {
        dispatch(setActive(id));
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

    const onClickFilterToggle = (pageNumber) => {
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

    const fields = [
        {
            code: 'id',
            label: 'Id',
            sortAllow: true
        },
        {
            code: 'active',
            label: 'Active',
            sortAllow: true
        },
        {
            code: 'name',
            label: 'Name',
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
                    <CardTitle>Themes</CardTitle>
                    <Button type={'primary only-icon uk-margin-left'} to={'/admiral-admin/themes/create'} tooltip="Create theme"><img src={PlusIcon} alt="create" /></Button>
                </div>
                <Button type={'secondary only-icon uk-margin-left'} action={ onClickFilterToggle } tooltip={isFilterOpen ? 'Close filter': 'Open filter'}><img src={FilterIcon} alt="toggle filter" /></Button>
            </CardHeader>

            {items && <CrudTableContainer>
                <CrudTableHead fields={fields} onClick={onClickSortTable} sortField={sortField} sortType={sortType}/>
                
                <tbody>
                    {items.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <Checkbox name={'active_' + item.id} id={'checkbox_' + item.id} idNumber={item.id} checked={item.active === '1' ? 'checked' : ''} setActiveItem={setActiveItem}/>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.create_date}</td>
                                <td>{item.update_date}</td>
                                <td>
                                    <ActionsWrapper>
                                        <Action action={ onClickDeleteItem } itemId={item.id} img={DeleteIcon}/>
                                        <Action to={`/admiral-admin/themes/view/${item.id}`} itemId={item.id} img={ViewIcon}/>
                                        <Action to={`/admiral-admin/themes/update/${item.id}`} itemId={item.id} img={PencilIcon}/>
                                    </ActionsWrapper>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </CrudTableContainer>}

            <Pagination totalItemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange} />
        </>
    );
};

export default List;