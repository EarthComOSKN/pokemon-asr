import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import { CSSTransition } from 'react-transition-group';
import data from './data.json';
import Sound from 'react-sound';
import TextBox from '../../components/TextBox';
import PopUpEnemy from '../../components/PopUpEnemy.js';
import PopUpPokemon from '../../components/PopUpPokemon.js';
import './Battle.css';
import PopUpWin from '../../components/PopUpWin.js';
import PopUpItem from '../../components/PopUpItem.js';

const Screen = styled.div`
	background: url('/bg-battle.png') no-repeat center center fixed;
	background-size: cover;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	background-color: red;
	position: absolute;
`;
const EnemyAttack = styled.div`
	position: absolute;
	font-size: 80px;
	top: 35%;
	z-index: 100;
	left: 10%;
	color: red;
	font-family: 'Nosifer', cursive;
	text-shadow: 5px 0 black;
`;
const Pokeball = styled.img``;
const Pokemon = styled.img``;

const MyPokemon = ({ pokemon, showMyPokemon, myCurrentHp, setBallShow }) => {
	return (
		<span>
			<CSSTransition
				in={showMyPokemon}
				timeout={320}
				classNames="pokemon"
				unmountOnExit
				onEnter={() => setBallShow(false)}
			>
				<Pokemon src={pokemon.url} className="pokeme" alt="" />
			</CSSTransition>
			<CSSTransition in={showMyPokemon} timeout={320} classNames="pokemon" unmountOnExit>
				<TextBox
					className="pokemon-detail"
					name={pokemon.name}
					currentHp={myCurrentHp}
					hp={pokemon.maxHp}
					lv={pokemon.lv}
				/>
			</CSSTransition>
		</span>
	);
};

const EnemyPokemon = ({ pokemon, showEnemyPokemon, enemyCurrentHp, setBallShow }) => {
	return (
		<span>
			<CSSTransition
				in={showEnemyPokemon}
				timeout={300}
				classNames="pokemon"
				unmountOnExit
				onEnter={() => setBallShow(false)}
			>
				<Pokemon src={pokemon.url} className="pokeenemy" alt="" />
			</CSSTransition>
			<CSSTransition in={showEnemyPokemon} timeout={320} classNames="pokemon" unmountOnExit>
				<TextBox
					className="enemy-detail"
					name={pokemon.name}
					currentHp={enemyCurrentHp}
					hp={pokemon.hp}
					lv={pokemon.lv}
				/>
			</CSSTransition>
		</span>
	);
};

const Battle = () => {
	const { my_pokemon, enemy, items } = data;
	const [sound, setSound] = useState(Sound.status.PLAYING);
	const [song, setSong] = useState('/battle.mp4');
	const [popOut, setPopOut] = useState(Sound.status.STOPPED);
	const [myPokemon, setMyPokemon] = useState({});
	const [myCurrentHp, setMyCurrentHp] = useState(0);
	const [enemyCurrentHp, setEnemyCurrentHp] = useState(0);
	const [enemyPokemon, setEnemyPokemon] = useState({});
	const [ballMeShow, setBallMeShow] = useState(false);
	const [ballEnemyShow, setBallEnemyShow] = useState(false);
	const [showMyPokemon, setShowMyPokemon] = useState(false);
	const [showEnemyPokemon, setShowEnemyPokemon] = useState(false);
	const [listPokemon, setListPokemon] = useState(my_pokemon);
	const [listEnemy, setListEnemy] = useState(enemy);
	const [start, setStart] = useState(true);
	const [listDead, setListDead] = useState([]);
	const [pokemonSkill, setPokemonSkill] = useState({});
	const [enemySkill, setEnemySkill] = useState({});
	const [usePokemonSkill, setUsePokemonSkill] = useState(false);
	const [useEnemySkill, setUseEnemySkill] = useState(false);
	const [win, setWin] = useState(false);
	const [attackSound, setAttackSound] = useState(Sound.status.STOPPED);
	const [attackSong, setAttackSong] = useState('/attack.mp3');
	const [useItem, setUseItem] = useState(false);
	const [enemyAttack, setEnemyAttack] = useState('');
	const [showEnemyAttack, setShowEnemyAttack] = useState(false);

	const selectMyPokemon = pokemon => {
		console.log('chhooooose pokemon', pokemon);
		setBallMeShow(true);
		setTimeout(() => {
			setMyPokemon(pokemon);
			setShowMyPokemon(true);
			setMyCurrentHp(pokemon.hp);
			setPopOut(Sound.status.PLAYING);
			setListPokemon(listPokemon);
			setStart(false);
			console.log('selectPokemon', listPokemon);
		}, 3000);
	};
	const selectEnemyPokemon = enemy => {
		console.log('chhooooose enemy', enemy, listEnemy);
		setBallEnemyShow(true);
		let temp = listEnemy;
		const index = temp.indexOf(enemy);
		temp.splice(index, 1);
		setTimeout(() => {
			setEnemyPokemon(enemy);
			setShowEnemyPokemon(true);
			setEnemyCurrentHp(enemy.hp);
			setPopOut(Sound.status.PLAYING);
			setListEnemy(temp);
			setStart(false);
			console.log('selectEnemy', temp);
		}, 3000);
	};
	useEffect(() => {}, [myPokemon]);
	const deSelectMyPokemon = () => {
		setShowMyPokemon(false);
	};
	const deSelectEnemyPokemon = () => {
		setShowEnemyPokemon(false);
	};
	const playerMove = index => {
		const move = myPokemon.moves[index];
		const remainingHP = enemyCurrentHp - move.damage < 0 ? 0 : enemyCurrentHp - move.damage;
		setEnemyCurrentHp(remainingHP);
		console.log('player', move);
		if (move.name === 'bodyslam') {
			setAttackSong('/bodyslam.mp3');
		}
		if (remainingHP === 0) {
			setTimeout(() => {
				if (listEnemy.length > 0) deSelectEnemyPokemon();
			}, 800);
			setTimeout(() => {
				if (listEnemy.length > 0) selectEnemyPokemon(listEnemy[0]);
				else {
					setWin(true);
					setSong('/win.mp3');
				}
			}, 3000);
		} else {
			setAttackSound(Sound.status.PLAYING);
			setTimeout(() => {
				setAttackSound(Sound.status.STOPPED);
				setAttackSong('/attack.mp3');
				const random = Math.floor(Math.random() * 3);
				enemyMove(random);
			}, 1100);
		}
	};

	const enemyMove = index => {
		console.log(index);
		const move = enemyPokemon.moves[index];
		const remainingHP = myCurrentHp - move.damage < 0 ? 0 : myCurrentHp - move.damage;
		setMyCurrentHp(remainingHP);
		if (remainingHP === 0) {
			const index = listPokemon.indexOf(myPokemon);
			const deadPokemon = listPokemon.splice(index, 1);
			setListPokemon(listPokemon);
			listDead.push(deadPokemon);
			setListDead(listDead);
			setTimeout(() => {
				deSelectMyPokemon();
			}, 800);
		} else {
			setAttackSound(Sound.status.PLAYING);
			setShowEnemyAttack(true);
			setEnemyAttack(move.name);
			setTimeout(() => {
				setAttackSound(Sound.status.STOPPED);
				setShowEnemyAttack(false);
			}, 1000);
			listPokemon.forEach((i, index) => {
				if (i.name === myPokemon.name) {
					listPokemon[index].hp = remainingHP;
				}
			});
			console.log(listPokemon);
		}
	};
	const setItem = selectedItem => {
		items.forEach((i, index) => {
			if (i.name === selectedItem.name) {
				items[index] = selectedItem;
			}
		});
		const remainingHP =
			myCurrentHp + selectedItem.effect > myPokemon.maxHp ? myPokemon.maxHp : myCurrentHp + selectedItem.effect;
		setMyCurrentHp(remainingHP);
		setUseItem(false);
	};
	useEffect(() => {
		setTimeout(() => {
			setSound(Sound.status.PLAYING);
		}, 100);
		my_pokemon.forEach(p => {
			const pokemon = localStorage.getItem('pokemon');
			if (pokemon === p.name) {
				setMyPokemon(p);
				selectMyPokemon(p);
			}
		});
		enemy.forEach(e => {
			const ene = localStorage.getItem('enemy');
			if (ene === e.name) {
				setEnemyPokemon(e);
				selectEnemyPokemon(e);
			}
		});
	}, []);
	return (
		<Screen className="animated fadeInn">
			<Sound url={song} playStatus={sound} autoLoad={true} volume={10} />
			{/* <Sound
				url="/popout.mp3"
				playStatus={popOut}
				onFinishedPlaying={() => {
					setPopOut(Sound.status.STOPPED);
				}}
				autoLoad={true}
			/> */}
			<Sound url={attackSong} playStatus={attackSound} autoLoad={true} volume={30} />
			<button
				onClick={() => {
					deSelectMyPokemon();
				}}
			>
				me Die
			</button>
			<button
				onClick={() => {
					selectMyPokemon(2);
				}}
			>
				me222 Die
			</button>
			<button
				onClick={() => {
					playerMove(0);
				}}
			>
				atk
			</button>
			<button
				onClick={() => {
					enemyMove(0);
				}}
			>
				atk me
			</button>
			<button
				onClick={() => {
					setShowMyPokemon(false);
				}}
			>
				change
			</button>
			<button
				onClick={() => {
					setUseItem(true);
				}}
			>
				use item
			</button>
			{myPokemon.moves &&
				myPokemon.moves.map((skill, index) => {
					return (
						<button
							onClick={() => {
								playerMove(index);
								setPokemonSkill(skill);
								setUsePokemonSkill(true);
								setTimeout(() => {
									setUsePokemonSkill(false);
								}, 1000);
							}}
						>
							{skill.name}
						</button>
					);
				})}
			<Pokeball className={(ballMeShow ? 'bounce' : 'fadeOut') + ' me'} src="./pokeball.png" alt="" />
			<Pokeball className={(ballEnemyShow ? 'bounce' : 'fadeOut') + ' enemy'} src="./pokeball.png" alt="" />
			<MyPokemon
				pokemon={myPokemon}
				myCurrentHp={myCurrentHp}
				showMyPokemon={showMyPokemon}
				setBallShow={setBallMeShow}
			/>
			{usePokemonSkill && <img src={pokemonSkill.url} alt="pokemonSkill" className="pokemon-skill" />}
			<EnemyPokemon
				pokemon={enemyPokemon}
				enemyCurrentHp={enemyCurrentHp}
				showEnemyPokemon={showEnemyPokemon}
				setBallShow={setBallEnemyShow}
			/>
			{useEnemySkill && <div>{enemySkill.name}</div>}
			{!start && !win ? <PopUpEnemy isHidden={showEnemyPokemon} enemy={enemyPokemon} /> : null}
			{!start ? (
				<PopUpPokemon
					isHidden={showMyPokemon || win}
					listPokemon={listPokemon}
					setPokemon={p => selectMyPokemon(p)}
					myPokemon={myPokemon}
				/>
			) : null}
			{win && <PopUpWin />}
			{useItem && <PopUpItem items={items} setItem={e => setItem(e)} setUseItem={e => setUseItem(e)} />}
			{showEnemyAttack && <EnemyAttack>{enemyAttack}</EnemyAttack>}
		</Screen>
	);
};

export default Battle;

//อย่าเลือก อาจารย์อติวงศ์
//item -1 aaaa T^T
// อาจารย์เด้ง2รอบตอนเปลี่ยน turn อาจารย์
