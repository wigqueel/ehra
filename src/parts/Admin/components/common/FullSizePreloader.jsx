import React, {useState, useEffect} from 'react';
import styled from "styled-components";

const PreloaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top:0;
  z-index: 9999;
  background: #F8F9FD;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  opacity: ${props => props.show ? "1" : "0"};
  visibility: ${props => props.show ? "visible" : "hidden"};
`

const FullSizePreloader = ({show}) => {
    return (
        <PreloaderContainer show={show}>
            <div>
                <span>Loading...</span>
            </div>
        </PreloaderContainer>
    );
};

export default FullSizePreloader;