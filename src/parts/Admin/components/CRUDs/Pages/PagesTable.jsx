import React, {useState} from 'react';
import FilterContainer from "../../styled/FilterContainer";
import {Form} from "react-final-form";
import CustomField from "../../common/formControlls/CustomField";
import ButtonsWrapper from "../../common/ButtonsWrapper";
import SubmitButton from "../../common/formControlls/SubmitButton";
import CardHeader from "../../styled/CardHeader";
import CardTitle from "../../styled/CardTitle";
import Button from "../../common/buttons/Button";
import {Link} from "react-router-dom";
import PlusIcon from "../../../../../assets/icons/plus.svg";
import FilterIcon from "../../../../../assets/icons/filter.svg";
import CrudTableContainer from "../../styled/CrudTableContainer";
import Checkbox from "../../common/Checkbox";
import ActionsWrapper from "../../common/ActionsWrapper";
import Action from "../../common/Action";
import DeleteIcon from "../../../../../assets/icons/trash.svg";
import EyeIcon from "../../../../../assets/icons/eye.svg";
import PencilIcon from "../../../../../assets/icons/pencil.svg";
import Pagination from "../../common/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {
    applyFilter,
    changeSort,
    setActive,
    updatePageSize
} from "../../../../../redux/pages-table-reducer";
import styled from "styled-components";
import {deletePage, editableSet} from "../../../../../redux/pageInfo-reducer";
import {fetchPagesData} from "../../../../../redux/pages-reducer";
import history from "../../../../../history";

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 2px;
  white-space: nowrap;
`;

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

const PagesTable = () => {
    const items = useSelector(state => state.pagesTable.items);
    const totalCount = useSelector(state => state.pagesTable.totalCount);
    const currentPage = useSelector(state => state.pagesTable.currentPage);
    const sortField = useSelector(state => state.pagesTable.sortField);
    const sortType = useSelector(state => state.pagesTable.sortType);
    const pageSize = useSelector(state => state.pagesTable.pageSize);
    const activePageId = useSelector(state => state.pages.activePageId);

    const dispatch = useDispatch();

    const [isFilterOpen, toggleFilter] = useState(false);

    const setActiveItem = (id) => {
        dispatch(setActive(id));
    }

    const handleDelete = (id) => {
        dispatch(deletePage(id));
    }

    const onClickSortTable = (code) => {
        dispatch(changeSort(sortField, sortType, code));
    }

    const onPageChange = (pageNumber) => {
        dispatch(fetchPagesData(activePageId, pageNumber, pageSize));
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

    const handlePageSizeChange = (value) => {
        dispatch(updatePageSize(value));
        dispatch(fetchPagesData(activePageId));
    }

    const handleView = (id) => {
        dispatch(editableSet(false));
        history.push(`/admiral-admin/pages/update/${id}`);
    }

    const handleEdit = (id) => {
        dispatch(editableSet(true));
        history.push(`/admiral-admin/pages/update/${id}`);
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
        <Container>
            <FilterContainer className={isFilterOpen ? 'active' : ''}>
                <Form
                    onSubmit={onFilterSubmit}
                    initialValues={''}
                    render={({handleSubmit, form, submitting, pristine, values}) => (
                        <form onSubmit={handleSubmit} className={'uk-margin-top'}>
                            <div className={'uk-child-width-1-2'} data-uk-grid>
                                <div>
                                    <CustomField name={'name'} type={'text'} placeholder={'Name'}/>
                                </div>
                                <div>
                                    <CustomField name={'update_by'} type={'text'} placeholder={'Updated by'}/>
                                </div>
                            </div>

                            <ButtonsWrapper>
                                <SubmitButton type="submit" disabled={submitting || pristine}
                                              className={'primary small'}>Filter</SubmitButton>
                                <SubmitButton type="button" onClick={() => {
                                    onClickFilterReset(form)
                                }} disabled={submitting || pristine} className={'secondary small'}>Reset</SubmitButton>
                            </ButtonsWrapper>
                        </form>
                    )}
                />
            </FilterContainer>

            <CardHeader>
                <div className="uk-flex uk-flex-middle">
                    <CardTitle className="uk-margin-right">Pages</CardTitle>
                    <Button as={Link} to="/admiral-admin/pages/create" tooltip="Create page" $iconOnly><img
                        src={PlusIcon} alt="create"/></Button>
                </div>
                <Button variant="secondary" $iconOnly onClick={onClickFilterToggle}
                        tooltip={isFilterOpen ? 'Close filter' : 'Open filter'}><img src={FilterIcon}
                                                                                     alt="toggle filter"/></Button>
            </CardHeader>

            {items && <CrudTableContainer>
                <CrudTableHead fields={fields} onClick={onClickSortTable} sortField={sortField} sortType={sortType}/>

                <tbody>
                {items.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <Checkbox name={'active_' + item.id} id={'checkbox_' + item.id} idNumber={item.id}
                                          checked={item.active === '1' ? 'checked' : ''} setActiveItem={setActiveItem}/>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.create_date}</td>
                            <td>{item.update_date}</td>
                            <td>
                                <ActionsWrapper>
                                    <Action onClick={() => handleDelete(item.id)} img={DeleteIcon}/>
                                    <Action onClick={() => handleView(item.id)} img={EyeIcon}/>
                                    <Action onClick={() => handleEdit(item.id)} img={PencilIcon}/>
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
        </Container>
    );
};

export default PagesTable;