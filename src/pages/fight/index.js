import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Particles from "react-particles-js";
import { CSSTransition } from 'react-transition-group';
import data from './data.json';
import Sound from "react-sound";
import TextBox from '../../components/TextBox';
const Screen = styled.div`
  background: url('./bg-battle.png') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color:red;
  position: absolute;
`;

const Pokeball = styled.img`
`
const Pokemon = styled.img`
`

const MyPokemon = ({ pokemon, showMyPokemon, setBallShow }) => {
  console.log('dsfds', pokemon);
  return (
    <span>
      <CSSTransition
        in={showMyPokemon}
        timeout={320}
        classNames="pokemon"
        unmountOnExit
        onEnter={() => setBallShow(false)}>

        <Pokemon src={pokemon.url} className="pokeme" alt="" />
      </CSSTransition>
      <CSSTransition
        in={showMyPokemon}
        timeout={320}
        classNames="pokemon"
        unmountOnExit
      >
        <TextBox className="pokemon-detail" name={pokemon.name} hp={pokemon.hp} lv={pokemon.lv} />
      </CSSTransition>


    </span>
  )
}

const EnemyPokemon = ({ pokemon, showEnemyPokemon, setBallShow }) => {
  return (
    <span>
      <CSSTransition
        in={showEnemyPokemon}
        timeout={300}
        classNames="pokemon"
        unmountOnExit
        onEnter={() => setBallShow(false)}>

        <Pokemon src={pokemon.url} className="pokeenemy" alt="" />
      </CSSTransition>
      <CSSTransition
        in={showEnemyPokemon}
        timeout={320}
        classNames="pokemon"
        unmountOnExit
      >
        <TextBox className="enemy-detail" name={pokemon.name} hp={2000} lv={pokemon.lv} />
      </CSSTransition>

    </span>
  )
}


const Battle = () => {
  const { my_pokemon, enemy } = data
  const [sound, setSound] = useState(Sound.status.PLAYING);
  const [popOut, setPopOut] = useState(Sound.status.STOPPED)
  const [myPokemon, setMyPokemon] = useState(my_pokemon[0])
  const [enemyPokemon, setEnemyPokemon] = useState(enemy[0])
  const [ballMeShow, setBallMeShow] = useState(false)
  const [ballEnemyShow, setBallEnemyShow] = useState(false)
  const [showMyPokemon, setShowMyPokemon] = useState(false)
  const [showEnemyPokemon, setShowEnemyPokemon] = useState(false)
  const selectMyPokemon = (num) => {
    setBallMeShow(true)
    setTimeout(() => {
      setMyPokemon(my_pokemon[0])
      setShowMyPokemon(true)
      setPopOut(Sound.status.PLAYING);
    }, 3000);
  }
  const selectEnemyPokemon = (num) => {
    setBallEnemyShow(true)
    setTimeout(() => {
      setEnemyPokemon(enemy[0])
      setShowEnemyPokemon(true)
      setPopOut(Sound.status.PLAYING);

    }, 3000);
  }
  const deSelectMyPokemon = () => {
    setShowMyPokemon(false)
  }
  const deSelectEnemyPokemon = () => {
    setShowEnemyPokemon(false)
  }

  useEffect(() => {
    selectMyPokemon(1)
    selectEnemyPokemon(1)
  }, [])
  return (
    <Screen className="animated fadeInn">

      <Sound url="/battle.mp4" playStatus={sound} autoLoad={true} />
      <Sound url="/popout.mp3" playStatus={popOut} onFinishedPlaying={() => { setPopOut(Sound.status.STOPPED) }} autoLoad={true} />
      <button onClick={() => { deSelectMyPokemon() }}>me Die</button>
      <button onClick={() => { selectMyPokemon(2) }}>me222 Die</button>
      <Pokeball className={(ballMeShow ? "bounce" : "fadeOut") + " me"} src="./pokeball.png" alt="" />
      <Pokeball className={(ballEnemyShow ? "bounce" : "fadeOut") + " enemy"} src="./pokeball.png" alt="" />
      <button onClick={() => { deSelectEnemyPokemon() }}>enemy Die</button>
      <MyPokemon pokemon={myPokemon} showMyPokemon={showMyPokemon} setBallShow={setBallMeShow} />
      <EnemyPokemon pokemon={enemyPokemon} showEnemyPokemon={showEnemyPokemon} setBallShow={setBallEnemyShow} />

    </Screen>
  )
}

export default Battle