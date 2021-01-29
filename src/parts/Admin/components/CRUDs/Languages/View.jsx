import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setActive, setDefault, getItemData, deleteItem} from '../../../../../redux/languages-reducer';
import CardHeader from '../../styled/CardHeader';
import CardTitle from '../../styled/CardTitle';
import {useParams} from 'react-router-dom';
import ButtonsWrapper from '../../common/ButtonsWrapper';
// import Button from '../../common/AdmiralNavlink';
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

        const setActiveLanguage = () => {
            dispatch(setActive(id));
        }

        const setDefaultLanguage = () => {
            dispatch(setDefault(id));
        }

        const onClickDeleteLanguage = () => {
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
                        name: 'Languages',
                        link: '/admiral-admin/languages'
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
                    <CardTitle>Language view: {item && item.name}</CardTitle>
                </CardHeader>

                {item &&
                <div>
                    <p className="uk-margin-top">URL: {item.url_code}</p>
                    <p>Code: {item.code}</p>
                    <p>Active: {item.active === "1" ? "true" : "false"}</p>
                    <p>Default: {item.default_item === "1" ? "true" : "false"}</p>
                </div>
                }

                <ButtonsWrapper>
                    <Button variant={'primary'} onClick={setActiveLanguage}>Set active</Button>
                    <Button variant={'primary'} onClick={setDefaultLanguage}>Set as default</Button>
                    <Button variant={'danger'} onClick={onClickDeleteLanguage}>Delete</Button>
                </ButtonsWrapper>
            </>
        );
    }
;

export default View;