import React from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/home';
import Enemy from './pages/enemy';
import './App.css';
import Battle from './pages/fight'
const About = () => <h1>About</h1>
const Post = () => <h1>Post</h1>
const Project = () => <h1>Project</h1>
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
        <Route path="/battle" component={Battle} />
        <Route path="/posts" component={Post} />
        <Route path="/projects" component={Project} />
        <Route path="/enemy" component={Enemy}/>
    </div>
  );
}

export default App;
