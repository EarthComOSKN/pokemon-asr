import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import config from './particlesjs-config.json';
import Sound from 'react-sound';
import './home.css';

const Screen = styled.div`
	background-image: url('./bg-home.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
`;
const Logo = styled.div`
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	position: relative;
	display: block;
`;
const Img = styled.img`
	margin-top: 2em;
	width: 40%;
	height: 25%;
`;

const Version = styled.div`
	font-size: 50px;
	color: white;
	-webkit-text-stroke: 3px black;
`;

const Home = props => {
	const [sound, setSound] = useState(Sound.status.PLAYING);
	useEffect(() => {
		setTimeout(() => {
			setSound(Sound.status.PLAYING);
		}, 100);
	}, []);
	return (
		<Screen>
			<Sound url="/home.mp3" playStatus={sound} autoLoad={true} volume={10} />
			<Particles className="bg" params={config} />
			<Logo>
				<Img className="animated  fadeIn" src="./pokelogo.png" alt="pokemon title" />
				<Version>ASR VERSION</Version>
				<div style={{ marginTop: '15em' }}>
					<div
						className="start"
						onClick={() => {
							props.history.push('/enemy');
						}}
					>
						Press Start
					</div>
				</div>
			</Logo>
		</Screen>
	);
};

export default withRouter(Home);
