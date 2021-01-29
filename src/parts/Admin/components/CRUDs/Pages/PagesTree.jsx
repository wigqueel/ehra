import React, {useState} from 'react';

import Nestable from 'react-nestable';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {fetchPagesData, pagesDataUpdate, removePageChildren} from "../../../../../redux/pages-reducer";
const items = [
    {
        id: 0,
        text: 'Andy'
    },
    {
        id: 1,
        text: 'Harry',
        children: [
            {
                id: 2,
                text: 'David'
            }
        ]
    },
    {
        id: 3,
        text: 'Lisa'
    }
];

const renderItem = ({ item }) => {
    return(
        <RenderItem item={item}/>
    )
};

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
    return(
        <div onClick={handleClick} className="uk-flex uk-flex-middle">
            <p className='uk-margin-remove-bottom uk-margin-small-right'>{item.name}</p>
            {!!item.children?.length &&
                <ToggleIndicator className="uk-margin-small-right" open={!!item.children?.length}/>
            }
        </div>

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