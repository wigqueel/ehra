import React, {useState} from 'react';

import history from '../../../../../history'
import Nestable from 'react-nestable';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {fetchPagesData, pagesDataUpdate, removePageChildren} from "../../../../../redux/pages-reducer";
import DeleteIcon from "../../../../../assets/icons/trash.svg";
import {Link} from "react-router-dom";
import EyeIcon from "../../../../../assets/icons/eye.svg";
import PencilIcon from "../../../../../assets/icons/pencil.svg";
import CopyIcon from "../../../../../assets/icons/copy.svg";
import {deletePage, duplicatePage, editableSet} from "../../../../../redux/pageInfo-reducer";

const renderItem = ({ item }) => {
    return(
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

const StyledRenderItem = styled.div`
  &:hover {
    ${ActionContainer} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const RenderItem = ({ item }) => {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.stopPropagation();
        if (!!item.children?.length) {
            dispatch(removePageChildren(item.id))
        } else {
            dispatch(fetchPagesData(item.id))
        }
    }

    const handleView = (e) => {
        e.stopPropagation();
        dispatch(editableSet(false));
        history.push(`/admiral-admin/pages/${item.id}`);
    }

    const handleEdit = (e) => {
        e.stopPropagation();
        dispatch(editableSet(true));
        history.push(`/admiral-admin/pages/${item.id}`);
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deletePage(item.id));
    }

    const handleDuplicate = (e) => {
        e.stopPropagation();
        dispatch(duplicatePage(item));
    }

    return(
        <StyledRenderItem onClick={handleClick} className="uk-flex uk-flex-middle">
            <p className='uk-margin-remove-bottom uk-margin-small-right'>{item.name}</p>
            {!!item.children?.length &&
                <ToggleIndicator className="uk-margin-small-right" open={!!item.children?.length}/>
            }
            <ActionContainer>
                <Action onClick={handleView}><img src={EyeIcon} alt="view"/></Action>
                <Action onClick={handleEdit}><img src={PencilIcon} alt="edit"/></Action>
                <Action onClick={handleDuplicate}><img src={CopyIcon} alt="copy"/></Action>
                <Action onClick={handleDelete}><img src={DeleteIcon} alt="delete"/></Action>
            </ActionContainer>
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