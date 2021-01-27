import React from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {fetchPagesData, removePageChildren} from "../../../../../redux/pages-reducer";

const IndicatorIcon = styled.span`
  transition: 0.1s;
  transform: rotate(${props => props.open ? "90deg" : "0deg"})
`;

const ToggleIndicator = ({open}) => {
    return (
        <IndicatorIcon open={open} data-uk-icon="chevron-right"/>
    )
}

const ItemContainer = styled.div`
  cursor: pointer;
`;

const Item = ({item}) => {
    const dispatch = useDispatch();
    const pagesData = useSelector(state => state.pages.pagesData);

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
            <p onClick={handleClick} className="uk-margin-remove uk-text-nowrap">
                <span className="uk-margin-small-right">{item.name}</span>
                {item?.haveChildren &&
                <ToggleIndicator open={!!item.childrenIdArr?.length}/>
                }
            </p>
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
    return (
        <div>
            <div data-uk-grid>
                <div className="uk-width-1-3">
                    {Object.keys(pagesData)
                        .filter(key => !pagesData[key].parent_id)
                        .map(key => (
                            <Item key={pagesData[key].id} item={pagesData[key]}/>
                        ))}
                </div>
                <div className="uk-width-2-3">
                    aa
                </div>
            </div>
        </div>
    );
};

export default Pages;