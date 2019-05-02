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
	const [speech,setSpeech] = useState('')
	useEffect(() => {
		console.log(props.location.pathname);
		if (props.location.pathname.includes('/enemy') || props.location.pathname.includes('/pokemon'))
			setSound(Sound.status.PLAYING);
		else setSound(Sound.status.STOP);
	}, [props]);
	return (
		<div className="App">
			<Route exact path="/" render={ (props) => <Home {...props} speech={speech} />} />
			<Route path="/battle" render={ (props) => <Battle {...props} speech={speech} />} />
			<Route path="/posts" render={ (props) => <Post {...props} speech={speech} />} />
			<Route path="/projects" render={ (props) => <Project {...props} speech={speech} />} />
			<Route path="/enemy" render={ (props) => <Enemy {...props} speech={speech} />} />
			<Route path="/pokemon" render={(props) => <Pokemon {...props} speech={speech} />} />
			<Sound url="/choose.mp3" playStatus={sound} autoLoad={true} volume={50} />
			<Mic getSpeech={e => {setSpeech(e.data)}} />
		</div>
	);
};

export default withRouter(App);
