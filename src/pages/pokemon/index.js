import React, { useState,useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './pokemon.css';

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

const Pokemon = props => {
    const [pokemonName, setPokemonName] = useState('');
    useEffect(() => {
        localStorage.setItem('pokemon',pokemonName)
    })
	return (
		<Container>
			<Title>Choose your Pokemon</Title>
			<SubTitle>{pokemonName}</SubTitle>
			<div className="d-flex align-items-center justify-content-center">
				<img
					src="/pokemon/pikachu.gif"
					alt="pikachu"
					className="pic"
					onClick={() => setPokemonName('Pikachu')}
				/>
				<img src="/pokemon/kairyu.gif" alt="kairyu" className="kairyu" onClick={() => setPokemonName('Kairyu')} />
				<img src="/pokemon/lizardon.gif" alt="lizardon" className="pic" onClick={() => setPokemonName('Lizardon')} />
			</div>
			<div className="d-flex align-items-center justify-content-center">
				<img src="/pokemon/koiking.gif" alt="koiking" className="laplace" onClick={() => setPokemonName('Koiking')} />
				<img src="/pokemon/laplace.gif" alt="laplace" className="laplace" onClick={() => setPokemonName('Laplace')} />
				<img src="/pokemon/mewtwo.gif" alt="mewtwo" className="laplace" onClick={() => setPokemonName('Mewtwo')} />
			</div>
			<button className="mr-5" onClick={() => props.history.push('/enemy')}>Back</button>
			<button onClick={() => props.history.push('/battle')}>Confirm</button>
		</Container>
	);
};
export default withRouter(Pokemon);
