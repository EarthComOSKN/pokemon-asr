import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HealthBox = styled.div`
    background-color: #ccc;
    height: 30px;
    width: 250px;
    border: solid 1px #aaa;
`
const HealthBar = styled.div`
    background-color: #007f00;
    width: ${props => props.width}%;
    transition: width ${props => props.transition}ms
    height: 28px;
    position: relative;
    bottom: 56px;
`
const HealthBarRed = styled.div`
    width: ${props => props.width}%;
    height: 100%;
    background-color: #cc0000;
    transition: width ${props => props.transition}ms
`
const HealthBarBlue = styled.div`
    width: ${props => props.width}%;
    transition: width ${props => props.transition}ms
    height: 100%;
    background-color: #3bd3df;
    bottom: 28px;
    position: relative;
`
function applyChange(curHealth, maxHealth) {
    var a = curHealth * (100 / maxHealth);
    return a
}


const HPBar = ({hp, maxHP}) => {
    const [width, setWidth] = useState(100)
    useEffect(() => {
        console.log('dmg')
        setWidth(applyChange(hp, maxHP))
    },[hp]);

return (
    <div className="d-flex justify-content-end">
        <HealthBox className="health-box">
            <HealthBarRed className="health-bar-red" width={width} transition={700}></HealthBarRed>
            <HealthBarBlue className="health-bar-blue" width={width} transition={300}></HealthBarBlue>
            <HealthBar className="health-bar" width={width} transition={500}></HealthBar>
        </HealthBox>
    </div>)
}

export default HPBar