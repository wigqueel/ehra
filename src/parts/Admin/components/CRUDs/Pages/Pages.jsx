import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchLanguages,
    fetchPagesData,
    removePageChildren,
    selectedLanguageSet
} from "../../../../../redux/pages-reducer";
import Select from "react-select";
import PagesTree from "./PagesTree";
import {Link} from "react-router-dom";
import Button from "../../common/buttons/Button";

const Pages = () => {
    const pagesData = useSelector(state => state.pages.pagesData);
    const languagesList = useSelector(state => state.pages.languagesList);
    const selectedLanguage = useSelector(state => state.pages.selectedLanguage);
    const languagesListLoading = useSelector(state => state.pages.languagesListLoading);

    const dispatch = useDispatch();

    const handleLanguageChange = (option) => {
        dispatch(selectedLanguageSet(languagesList.find(el => el.id === option.value)));
    }

    useEffect(() => {
        dispatch(fetchLanguages());
    }, []);

    useEffect(() => {
        if (selectedLanguage) {
            dispatch(fetchPagesData());
        }
    }, [selectedLanguage]);

    return (
        <div>
            {languagesList && selectedLanguage &&
            <div data-uk-grid>
                <div className="uk-width-1-3">
                    <div className="uk-margin-small-bottom uk-flex uk-flex-middle">
                        <p className="uk-margin-small-right uk-margin-remove-bottom">Language:</p>
                        <Select
                            className="uk-width-1"
                            value={{value: selectedLanguage.id, label: selectedLanguage.name}}
                            onChange={handleLanguageChange}
                            isSearchable={false}
                            options={languagesList.map(language => {
                                return {value: language.id, label: language.name}
                            })}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
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
                                    }),
                                    indicatorSeparator: styles => ({
                                        ...styles,
                                        display: 'none'
                                    }),
                                    valueContainer: styles => ({
                                        ...styles,
                                        paddingRight: 0
                                    }),
                                }
                            }
                        />
                    </div>
                    <div>
                        <div className="uk-margin-bottom">
                            <PagesTree/>
                        </div>
                        <Button $small as={Link} to="/admiral-admin/create-page" variant="primary">Create new</Button>
                    </div>
                </div>
                <div className="uk-width-2-3">
                    aa
                </div>
            </div>
            }
        </div>
    );
};

export default Pages;