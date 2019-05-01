import React, { useState, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Home from './pages/home';
import Enemy from './pages/enemy';
import './App.css';
import Battle from './pages/fight';
import Pokemon from './pages/pokemon';
import Sound from 'react-sound';
import Mic from './components/Mic';
const Post = () => <h1>Post</h1>;
const Project = () => <h1>Project</h1>;
const App = props => {
	const [sound, setSound] = useState(Sound.status.STOP);
	useEffect(() => {
		console.log(props.location.pathname);
		if (props.location.pathname.includes('/enemy') || props.location.pathname.includes('/pokemon'))
			setSound(Sound.status.PLAYING);
		else setSound(Sound.status.STOP);
	}, [props]);
	return (
		<div className="App">
			<Route exact path="/" component={Home} />
			<Route path="/battle" component={Battle} />
			<Route path="/posts" component={Post} />
			<Route path="/projects" component={Project} />
			<Route path="/enemy" component={Enemy} />
			<Route path="/pokemon" component={Pokemon} />
			<Sound url="/choose.mp3" playStatus={sound} autoLoad={true} volume={50} />
			<Mic getSpeech={e => console.log('speechhhhh',e)} />
		</div>
	);
};

export default withRouter(App);
