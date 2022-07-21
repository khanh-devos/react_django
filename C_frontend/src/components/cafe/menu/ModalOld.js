import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';


//DIV1 is vital for covering | deactivating all the root
const DIV1 = styled.div`
    background-color: black;
    opacity: 0.7;
    position: absolute;

    width: 100%;
    height: 100%;

    margin-left: -2.5vmax;
`

const DIV2 = styled.div`
    background-color: whitesmoke;
    width: 800px;

    z-index: 1;
    position: absolute;
    top: 5vmax;

    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px grey;
    padding: 20px 10px;
`




export default function ModalSelect(){  
    
    return ReactDOM.createPortal(  
      <>
        
        <DIV1 />
        <DIV2 > 
            <h2>ModalSelect</h2>
        </DIV2>
      </>,  
      document.getElementById('modal-root')  
    )  
}  
