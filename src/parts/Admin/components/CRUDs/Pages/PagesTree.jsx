import React, {useState} from 'react';

import history from '../../../../../history'
import Nestable from 'react-nestable';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    activePageId,
    fetchPagesData,
    hidePageChildren,
    pagesDataUpdate, setActivePageId,
} from "../../../../../redux/pages-reducer";
import DeleteIcon from "../../../../../assets/icons/trash.svg";
import {Link} from "react-router-dom";
import EyeIcon from "../../../../../assets/icons/eye.svg";
import PencilIcon from "../../../../../assets/icons/pencil.svg";
import CopyIcon from "../../../../../assets/icons/copy.svg";
import {deletePage, duplicatePage, editableSet} from "../../../../../redux/pageInfo-reducer";

const renderItem = ({item}) => {
    return (
        <RenderItem item={item}/>
    )
};

const ActionContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #F8F9FD;
  border-radius: 18px;
  padding: 2px;
  transition: 0.3s;
  opacity: 0;
  visibility: hidden;
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

const ToggleIndicatorContainer = styled.div`
  width: 20px;
  height: 20px;
`;

const SpinnerContainer = styled.div`
  color: #4974E1;
`;

const StyledRenderItem = styled.div`
  padding: 0 6px;
  border-radius: 7px;
  border: 1px solid ${props => props.active ? "#4974E1" : "transparent"};

  &:hover {
    ${ActionContainer} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const RenderItem = ({item}) => {
    const dispatch = useDispatch();
    const parentLoadingId = useSelector(state => state.pages.parentLoadingId);
    const activePageId = useSelector(state => state.pages.activePageId);
    const handleClick = (e) => {
        e.stopPropagation();
        if (!item.hasChild) return;
        if (!!item.children?.length) {
            dispatch(hidePageChildren(item.id))
        } else {
            dispatch(setActivePageId(item.id))
            dispatch(fetchPagesData(item.id))
        }
    }

    const handleView = (e) => {
        e.stopPropagation();
        dispatch(editableSet(false));
        history.push(`/admiral-admin/pages/update/${item.id}`);
    }

    const handleEdit = (e) => {
        e.stopPropagation();
        dispatch(editableSet(true));
        history.push(`/admiral-admin/pages/update/${item.id}`);
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deletePage(item.id));
    }

    const handleDuplicate = (e) => {
        e.stopPropagation();
        dispatch(duplicatePage(item));
    }

    return (
        <StyledRenderItem active={activePageId === item.id} onClick={handleClick} className="uk-flex uk-flex-middle">
            <p className="uk-margin-remove-vertical uk-margin-small-right">{item.name}</p>
            <ToggleIndicatorContainer className="uk-margin-small-right">
                {item.hasChild &&
                <ToggleIndicator className="uk-margin-remove-vertical"
                                 open={!!item.children?.length}/>
                }
            </ToggleIndicatorContainer>
            <ActionContainer>
                <Action onClick={handleView}><img src={EyeIcon} alt="view"/></Action>
                <Action onClick={handleEdit}><img src={PencilIcon} alt="edit"/></Action>
                <Action onClick={handleDuplicate}><img src={CopyIcon} alt="copy"/></Action>
                <Action onClick={handleDelete}><img src={DeleteIcon} alt="delete"/></Action>
            </ActionContainer>

            {parentLoadingId === item.id &&
            <SpinnerContainer className="uk-margin-small-left">
                <div data-uk-spinner="ratio: 0.6"/>
            </SpinnerContainer>
            }
        </StyledRenderItem>

    )
};

const IndicatorIcon = styled.span`
  transition: 0.1s;
  transform: rotate(${props => props.open ? "90deg" : "0deg"})
`;
const ToggleIndicator = ({open, className}) => {
    return (
        <IndicatorIcon className={className} open={open} data-uk-icon="chevron-right"/>
    )
}

const PagesTree = () => {
    const dispatch = useDispatch();
    const pagesData = useSelector(state => state.pages.pagesData);
    const handleChange = (items, item) => {
        dispatch(pagesDataUpdate(items, item))
    }
    return (
        <div>
            <Nestable
                items={pagesData}
                onChange={(items, item) => handleChange(items, item)}
                renderItem={renderItem}
            />
        </div>
    );
};

export default PagesTree;