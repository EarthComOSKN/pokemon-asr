import React, { useState ,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './enemy.css';

const Container = styled.div`
	padding: 2em;
	height: 100vh;
	background-color: rgb(255, 253, 225);
	border: 10px solid rgb(60, 69, 30);
`;
const Title = styled.div`
	font-size: 50px;
`;
const SubTitle = styled.div`
	font-size: 40px;
	color: blue;
`;
const Enemy = props => {
    const [enemyName, setEnemyName] = useState('');
    useEffect(() => {
        localStorage.setItem('enemy',enemyName)
    })
	return (
		<Container>
			<Title>Choose your Enemy</Title>
			<SubTitle>{enemyName}</SubTitle>
			<img src="/enemy/atiwong.jpg" alt="atiwong" className="enemy-pic mr-3" onClick={() => setEnemyName("Atiwong")}/>
			<img src="/enemy/ekapol.jpg" alt="ekapol" className="enemy-pic mr-3" onClick={() => setEnemyName("Ekapol")}/>
			<img src="/enemy/nattee.jpg" alt="nattee" className="enemy-pic mr-3" onClick={() => setEnemyName("Nattee")}/>
			<img src="/enemy/peerapon.jpg" alt="peerapon" className="enemy-pic" onClick={() => setEnemyName("Peerapon")}/>
			<div className="mt-5">
				<button onClick={() => props.history.push('/pokemon')}>Confirm</button>
			</div>
		</Container>
	);
};
export default withRouter(Enemy);
