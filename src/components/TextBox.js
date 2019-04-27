import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HPBar from './HPBar';

const Container = styled.div`
    position: absolute;
    z-index: 2;
    width: 400px;
    height: 130px;
    background-color: rgb(255,254,222);
    border-radius: 20px 10px 20px 10px;
    border: 5px solid rgb(60,69,30);
    box-shadow: 10px 13px 1px -2px rgb(86,103,91);
    font-size: 25px;
    padding: 15px;
`
const Tail = styled.div`
    content: '';
    position: absolute;
    left: 394px;
    top: 110px;
    width: 0;
    height: 0;
    z-index: 1;
    border: 55px solid transparent;
    border-left-color: rgb(86,103,91);
    border-right: 0;
    border-bottom: 0;
`

const TextBox = ({className, name,currentHp,hp, lv }) => {

    
    return (
        <div className={className}>
            {className}
            <Container><div className="d-flex justify-content-between">
            <div>{name}</div><div>Lv.{lv}</div></div><HPBar hp={currentHp} maxHP={hp} /><div className="d-flex justify-content-end">{currentHp}/{hp}</div></Container>
            <Tail />
        </div>

    );
}

export default TextBox;