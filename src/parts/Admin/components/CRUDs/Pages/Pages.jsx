import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchLanguages,
    fetchPagesData,
    removePageChildren,
    selectedLanguageSet
} from "../../../../../redux/pages-reducer";
import DeleteIcon from "../../../../../assets/icons/trash.svg";
import ViewIcon from "../../../../../assets/icons/view.svg";
import PencilIcon from "../../../../../assets/icons/pencil.svg";
import Select from "react-select";
import PagesTree from "./PagesTree";

const IndicatorIcon = styled.span`
  transition: 0.1s;
  transform: rotate(${props => props.open ? "90deg" : "0deg"})
`;

const Action = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 5px;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: 0.3s;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    background: rgb(80 118 156 / 10%);
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

const ActionContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #F8F9FD;
  border-radius: 18px;
  padding: 2px;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
`;

const ToggleIndicator = ({open, className}) => {
    return (
        <IndicatorIcon className={className} open={open} data-uk-icon="chevron-right"/>
    )
}

const ItemContent = styled.div`
  &:hover {
    ${ActionContainer} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const ItemContainer = styled.div`
  user-select: none;
  cursor: pointer;
`;

const Item = ({item}) => {
    const dispatch = useDispatch();
    const pagesData = useSelector(state => state.pages.pagesData);
    const selectedLanguage = useSelector(state => state.pages.selectedLanguage);

    const handleClick = (e) => {
        e.stopPropagation();
        if (!item.haveChildren) return;
        if (!!item.childrenIdArr?.length) {
            dispatch(removePageChildren(item.id))
        } else {
            dispatch(fetchPagesData(item.id))
        }
    }
    return (
        <ItemContainer>
            <ItemContent onClick={handleClick} className="uk-margin-remove uk-text-nowrap uk-flex uk-flex-middle">
                <span className="uk-margin-small-right">{item.name}</span>
                {item?.haveChildren &&
                <ToggleIndicator className="uk-margin-small-right" open={!!item.childrenIdArr?.length}/>
                }
                <ActionContainer>
                    <Action><img src={ViewIcon} alt="view"/></Action>
                    <Action><img src={PencilIcon} alt="edit"/></Action>
                    <Action><img src={DeleteIcon} alt="delete"/></Action>
                    <Action><img src={DeleteIcon} alt="copy"/></Action>
                </ActionContainer>

            </ItemContent>
            {!!item.childrenIdArr?.length &&
            <div className="uk-margin-left uk-margin-small-bottom">
                {item.childrenIdArr.map(elId => (
                    <Item key={pagesData[elId]?.id} item={pagesData[elId]}/>
                ))}
            </div>
            }

        </ItemContainer>
    )
}

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
                        <PagesTree/>
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