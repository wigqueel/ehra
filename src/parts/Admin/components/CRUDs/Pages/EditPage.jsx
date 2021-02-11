import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import history from '../../../../../history'
import BackIcon from "../../../../../assets/icons/back.svg";
import {useParams} from "react-router-dom";
import {
    createPage,
    editableSet,
    fetchLanguagesList,
    fetchPageInfo,
    pageInfoSet,
    updatePage
} from "../../../../../redux/pageInfo-reducer";
import Button from "../../common/buttons/Button";
import {Form, Field} from "react-final-form";
import CustomField from "../../common/formControlls/CustomField";
import ButtonsWrapper from "../../common/ButtonsWrapper";
import {updateItem} from "../../../../../redux/themes-reducer";
import Select from "react-select";

const ReactSelectAdapter = ({input, ...rest}) => (
    <Select
        {...input} {...rest}
        isSearchable={false}
        theme={(theme) => ({
            ...theme,
            borderRadius: 12,
            colors: {
                ...theme.colors,
                primary: '#4974E1',
            },
        })}
        styles={
            {
                control: styles => ({
                    ...styles,
                    borderColor: "#E8EBF0",
                    background: "#F9F9F9",
                    height: 48,

                }),
                indicatorSeparator: styles => ({
                    ...styles,
                    display: 'none'
                }),
                valueContainer: styles => ({
                    ...styles,
                    paddingRight: 0,
                    paddingLeft: 20,
                }),
                singleValue: styles => ({
                    fontSize: 16,
                    fontWeight: 300,
                    fontFamily: "Arial",
                    color: "#99A6B6"
                }),
            }
        }
    />
)


const EditPage = () => {
        const pageInfo = useSelector(state => state.pageInfo.pageInfo);
        const pageInfoLoading = useSelector(state => state.pageInfo.pageInfoLoading);
        const pagesList = useSelector(state => state.pageInfo.pagesList);
        const pagesListLoading = useSelector(state => state.pageInfo.pagesListLoading);
        const languagesList = useSelector(state => state.pageInfo.languagesList);
        const languagesListLoading = useSelector(state => state.pageInfo.languagesListLoading);
        const updatePageLoading = useSelector(state => state.pageInfo.updatePageLoading);
        const editable = useSelector(state => state.pageInfo.editable);

        const dispatch = useDispatch();
        let {id} = useParams();

        useEffect(() => {
            if (id) {
                dispatch(fetchPageInfo(id));
            } else {
                dispatch(editableSet(true));
                dispatch(fetchLanguagesList());
            }
        }, [id]);

        useEffect(() => {
            return () => {
                dispatch(pageInfoSet(null));
            }
        }, []);

        const onSubmit = async values => {
            if (id) {
                dispatch(updatePage(id, values));
            } else {
                dispatch(createPage(values));
            }
        }
        return (
            <>
                <h1 className="uk-text-center uk-text-bold">{id ? "Edit page" : "Create page"}</h1>
                <div className="uk-margin-bottom uk-flex uk-flex-middle uk-flex-between">
                    <div>
                        <Button onClick={() => history.goBack()} $iconOnly><img src={BackIcon} alt=""/></Button>
                    </div>
                    {!editable &&
                    <div className="">
                        <Button $small onClick={() => dispatch(editableSet(true))} type="button"
                                variant="primary">Edit</Button>
                    </div>
                    }
                </div>
                {!pageInfoLoading && !languagesListLoading && !pagesListLoading &&
                <div>

                    <Form
                        onSubmit={onSubmit}
                        keepDirtyOnReinitialize
                        initialValues={{
                            name: pageInfo?.name || "",
                            url: pageInfo?.url || "",
                            active: pageInfo?.active || "",
                            language: {
                                value: pageInfo?.language_id || languagesList[0]?.id,
                                label: pageInfo ? languagesList.find(el => el.id === pageInfo.language_id)?.name : languagesList[0]?.name
                            },
                            parent: {
                                value: pageInfo?.parent_id || "0",
                                label: pagesList.find(el => el.id === pageInfo?.parent_id)?.name || "None"
                            },

                        }}
                        render={({handleSubmit, form, submitting, pristine, values}) => (
                            <form onSubmit={handleSubmit} className={'uk-margin-top'}>
                                <div>
                                    <CustomField
                                        className="uk-margin-bottom"
                                        label="Name"
                                        name="name"
                                        type="text"
                                        placeholder="Page name"
                                        disabled={!editable}
                                    />
                                    <CustomField
                                        className="uk-margin-bottom"
                                        label="URL"
                                        name="url"
                                        type="text"
                                        placeholder="url"
                                        disabled={!editable}
                                    />

                                    <div className="uk-margin-bottom">
                                        <p className="uk-margin-small-bottom">Language</p>
                                        <Field
                                            name="language"
                                            component={ReactSelectAdapter}
                                            value={values.language}
                                            options={languagesList.map(el => {
                                                return {value: el.id + "", label: el.name}
                                            })}
                                            isDisabled={!editable}
                                        />
                                    </div>

                                    <div className="uk-margin-bottom">
                                        <p className="uk-margin-small-bottom">Parent pages</p>
                                        <Field
                                            name="parent"
                                            component={ReactSelectAdapter}
                                            value={values.parent}
                                            options={[
                                                {value: "0", label: "None"},
                                                ...pagesList.map(el => {
                                                    return {value: el.id + "", label: el.name}
                                                })
                                            ]}
                                            menuPlacement="top"
                                            isDisabled={!editable}
                                        />
                                    </div>
                                </div>

                                {editable &&
                                    <Button type="submit" disabled={updatePageLoading} variant="primary">Save changes</Button>
                                }
                            </form>
                        )}
                    />
                </div>
                }
            </>
        );
    }
;

export default EditPage;