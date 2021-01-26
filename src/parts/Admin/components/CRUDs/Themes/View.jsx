import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setActive, getItemData, deleteItem} from '../../../../../redux/themes-reducer';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import {Redirect, useParams} from 'react-router-dom';
import ButtonsWrapper from '../../common/ButtonsWrapper';
import styled from 'styled-components';
import {setBreadcrumbs} from '../../../../../redux/app-reducer';
import Button from "../../common/buttons/Button";

const ViewTable = styled.table`
  text-align: left;
  border-radius: 20px;

  td, th {
    padding: 20px 30px;
    border-bottom: 1px solid #e4e4e4;
    font-size: 14px;
  }

  th {
    font-weight: 400;
    color: #99A6B6;
  }

  td {
    font-weight: 300;
    color: #1D1D1D;
  }

  tr:last-child td, tr:last-child th {
    border-width: 0px;
  }
`

const View = () => {
    const item = useSelector(state => state.themes.item);
    const dispatch = useDispatch();

    let resultArray = [];
    let {id} = useParams();

    if (item) {
        let itemKeys = Object.keys(item);
        let itemValues = Object.values(item);

        for (let i = 0; i < itemKeys.length; i++) {
            resultArray.push(<tr>
                <th>{itemKeys[i]}</th>
                <td>{itemValues[i]}</td>
            </tr>)
        }
    }

    const setActiveTheme = () => {
        dispatch(setActive(id));
    }

    const onClickDeleteTheme = () => {
        dispatch(deleteItem(id));
    }

    useEffect(() => {
        dispatch(getItemData(id));
    }, [id]);

    useEffect(() => {
        if (item) {
            let itemKeys = Object.keys(item);
            let itemValues = Object.values(item);

            for (let i = 0; i < itemKeys.length; i++) {
                resultArray.push(<tr>
                    <th>{itemKeys[i]}</th>
                    <td>{itemValues[i]}</td>
                </tr>)
            }

            dispatch(setBreadcrumbs([
                {
                    name: 'Dashboard',
                    link: '/admiral-admin'
                },
                {
                    name: 'Themes',
                    link: '/admiral-admin/themes'
                },
                {
                    name: item.name,
                    link: false
                }
            ]))
        }
    }, [item]);

    return (
        <>
            <CardHeader>
                <CardTitle>Theme view: {item && item.name}</CardTitle>
            </CardHeader>

            {item &&
            <div>
                <p className='uk-margin-top'>Active: {item.activity === "1" ? "true" : "false"}</p>
            </div>
            }

            <ButtonsWrapper>
                <Button variant={'primary'} onClick={setActiveTheme}>Set active theme</Button>
                <Button variant={'danger'} onClick={onClickDeleteTheme}>Delete theme</Button>
            </ButtonsWrapper>
        </>
    );
}
;

export default View;