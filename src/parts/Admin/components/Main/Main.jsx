import React from 'react';
import styled from "styled-components";
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const MainContainer = styled.div`
    margin-left: 250px;
    height: calc(100vh - 72px);
    padding: 35px;
    background: #F8F9FD;
`

const MainCard = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.04);
    border-radius: 24px;
    padding: 30px 36px;
    max-height: calc(100vh - 182px);
    overflow-y: auto;
`

const Main = (props) => {
    return (
        <MainContainer>
            <Breadcrumbs />

            <MainCard>
                {props.children}
            </MainCard>
            
        </MainContainer>
    )
}

export default Main;