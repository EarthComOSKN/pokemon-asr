import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Particles from "react-particles-js";
import { CSSTransition } from "react-transition-group";
import data from "./data.json";
import Sound from "react-sound";
import TextBox from "../../components/TextBox";
import PopUpEnemy from "../../components/PopUpEnemy.js";
import PopUpPokemon from "../../components/PopUpPokemon.js";
import "./Battle.css";
import PopUpWin from "../../components/PopUpWin.js";
import PopUpItem from "../../components/PopUpItem.js";

const Screen = styled.div`
  background: url("/bg-battle.png") no-repeat center center fixed;
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
  font-family: "Nosifer", cursive;
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
      <CSSTransition
        in={showMyPokemon}
        timeout={320}
        classNames="pokemon"
        unmountOnExit
      >
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

const EnemyPokemon = ({
  pokemon,
  showEnemyPokemon,
  enemyCurrentHp,
  setBallShow
}) => {
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
      <CSSTransition
        in={showEnemyPokemon}
        timeout={320}
        classNames="pokemon"
        unmountOnExit
      >
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

const Battle = props => {
  const { my_pokemon, enemy, items } = data;
  const [sound, setSound] = useState(Sound.status.PLAYING);
  const [song, setSong] = useState("/battle.mp4");
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
  const [attackSong, setAttackSong] = useState("/attack.mp3");
  const [useItem, setUseItem] = useState(false);
  const [enemyAttack, setEnemyAttack] = useState("");
  const [showEnemyAttack, setShowEnemyAttack] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [medicSpeech, setMedicSpeech] = useState("");

  const selectMyPokemon = pokemon => {
    console.log("chhooooose pokemon", pokemon);
    setBallMeShow(true);
    setTimeout(() => {
      setMyPokemon(pokemon);
      setShowMyPokemon(true);
      setMyCurrentHp(pokemon.hp);
      setPopOut(Sound.status.PLAYING);
      setListPokemon(listPokemon);
      setStart(false);
      console.log("selectPokemon", listPokemon);
    }, 3000);
  };
  const findPoke = (list, poke) => {
    let i = 0;
    while (true) {
      if (list[i].name === poke.name) break;
      else i++;
    }
    console.log("num", i);
    return i;
  };
  const selectEnemyPokemon = enemy => {
    setPlayerTurn(false);
    console.log("chhooooose enemy", enemy, listEnemy);
    setBallEnemyShow(true);
    let temp = listEnemy;
    const index = findPoke(temp, enemy);
    temp.splice(index, 1);
    setTimeout(() => {
      setPlayerTurn(true);
      setEnemyPokemon(enemy);
      setShowEnemyPokemon(true);
      setEnemyCurrentHp(enemy.hp);
      setPopOut(Sound.status.PLAYING);
      setListEnemy(temp);
      setStart(false);
      console.log("selectEnemy", temp);
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
    if (playerTurn && !showEnemyAttack && !useEnemySkill && showEnemyPokemon) {
      setPlayerTurn(false);
      const move = myPokemon.moves[index];
      const remainingHP =
        enemyCurrentHp - move.damage < 0 ? 0 : enemyCurrentHp - move.damage;
      setEnemyCurrentHp(remainingHP);
      console.log("player", move);
      if (move.name === "bodyslam") {
        setAttackSong("/bodyslam.mp3");
      }
      if (remainingHP === 0) {
        //enemy
        setTimeout(() => {
          if (listEnemy.length > 0) deSelectEnemyPokemon();
        }, 800);
        setTimeout(() => {
          if (listEnemy.length > 0) selectEnemyPokemon(listEnemy[0]);
          else {
            setWin(true);
            setSong("/win.mp3");
          }
        }, 3000);
      }
      setAttackSound(Sound.status.PLAYING);
      setTimeout(() => {
        setAttackSong("/attack.mp3");
        const random = Math.floor(Math.random() * 3);
        if (remainingHP !== 0) enemyMove(random);
        setPlayerTurn(true);
      }, 1100);
    }
  };

  const enemyMove = index => {
    setPlayerTurn(false);
    const move = enemyPokemon.moves[index];
    const remainingHP =
      myCurrentHp - move.damage < 0 ? 0 : myCurrentHp - move.damage;
    setMyCurrentHp(remainingHP);
    if (remainingHP === 0) {
      //pokemon
      const index = listPokemon.indexOf(myPokemon);
      const deadPokemon = listPokemon.splice(index, 1);
      setListPokemon(listPokemon);
      listDead.push(deadPokemon);
      setListDead(listDead);
      setTimeout(() => {
        deSelectMyPokemon();
      }, 800);
    }
    setAttackSound(Sound.status.PLAYING);
    setShowEnemyAttack(true);
    setEnemyAttack(move.name);
    setTimeout(() => {
      setShowEnemyAttack(false);
      setPlayerTurn(true);
    }, 1000);
    listPokemon.forEach((i, index) => {
      if (i.name === myPokemon.name) {
        listPokemon[index].hp = remainingHP;
      }
    });
    console.log(listPokemon);
  };
  const setItem = selectedItem => {
    items.forEach((i, index) => {
      if (i.name === selectedItem.name) {
        items[index] = selectedItem;
      }
    });
    const remainingHP =
      myCurrentHp + selectedItem.effect > myPokemon.maxHp
        ? myPokemon.maxHp
        : myCurrentHp + selectedItem.effect;
    setMyCurrentHp(remainingHP);
    setUseItem(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setSound(Sound.status.PLAYING);
    }, 100);
    my_pokemon.forEach(p => {
      const pokemon = localStorage.getItem("pokemon");
      if (pokemon === p.name) {
        selectMyPokemon(p);
      }
    });
    enemy.forEach(e => {
      const ene = localStorage.getItem("enemy");
      console.log("ene", ene);
      if (ene === e.name) {
        selectEnemyPokemon(e);
      }
    });
  }, []);
  useEffect(() => {
    console.log("command", props.speech);
    if (playerTurn) {
      // document.getElementById("psychic").click();
      if (props.speech.includes("ยา")) {
        if (props.speech.includes("เล็ก")) {
          setUseItem(true);
          setMedicSpeech("Potion");
        } else if (props.speech.includes("กลาง")) {
          setUseItem(true);
          setMedicSpeech("Super Potion");
        } else if (
          props.speech.includes("ใหญ่") &&
          props.speech.includes("มาก")
        ) {
          setUseItem(true);
          setMedicSpeech("Max Potion");
        } else if (props.speech.includes("ใหญ่")) {
          setUseItem(true);
          setMedicSpeech("Hyper Potion");
        }
      }
      if (myPokemon.name === "Kairyu") {
        if (props.speech.includes("ปีก")) {
          document.getElementById("wingattack").click();
        } else if (props.speech.includes("อยู่ไม่สุข")) {
          document.getElementById("้hyperbeam").click();
        } else if (props.speech.includes("กรงเล็บ")) {
          document.getElementById("dragonclaw").click();
        } else if (props.speech.includes("พิโรธ")) {
          document.getElementById("dragonrage").click();
        }
      }
      if (myPokemon.name === "Koiking") {
        if (props.speech.includes("สาดน้ำ")) {
          document.getElementById("splash").click();
        } else if (props.speech.includes("ดิ้น")) {
          document.getElementById("dint").click();
        }
      }
      if (myPokemon.name === "Lizardon") {
        if (props.speech.includes("ปีก")) {
          document.getElementById("wingattack").click();
        } else if (props.speech.includes("โยน ไฟ")) {
          document.getElementById("flamethrower").click();
        } else if (props.speech.includes("กรงเล็บ")) {
          document.getElementById("dragonclaw").click();
        } else if (props.speech.includes("พิโรธ")) {
          document.getElementById("dragonrage").click();
        }
      }
      if (myPokemon.name === "Pikachu") {
        if (props.speech.includes("กระแสไฟฟ้า")) {
          document.getElementById("thunderbolt").click();
        } else if (props.speech.includes("ฟ้าผ่า")) {
          document.getElementById("thunderbolt").click();
        } else if (props.speech.includes("พี่ตูน")) {
          document.getElementById("bodyslam").click();
        } else if (props.speech.includes("หางเหล็ก")) {
          document.getElementById("irontail").click();
        } else if (props.speech.includes("รวดเร็ว")) {
          document.getElementById("quickattack").click();
        }
      }
      if (myPokemon.name === "Laplace") {
        if (props.speech.includes("โต้ คลื่น")) {
          document.getElementById("surf").click();
        } else if (props.speech.includes("น้ำแข็ง")) {
          document.getElementById("icebeam").click();
        } else if (props.speech.includes("เครื่องสูบน้ำ")) {
          document.getElementById("hydropump").click();
        } else if (props.speech.includes("พี่ตูน")) {
          document.getElementById("bodyslam").click();
        }
      }
      if (myPokemon.name === "Mewtwo") {
        if (props.speech.includes("ลำแสง") && props.speech.includes("จิต")) {
          document.getElementById("psybeam").click();
        } else if (
          props.speech.includes("จิต") &&
          !props.speech.includes("ลำแสง")
        ) {
          document.getElementById("psychic").click();
        } else if (props.speech.includes("ว่องไว")) {
          document.getElementById("swift").click();
        } else if (props.speech.includes("งง")) {
          document.getElementById("confusion").click();
        }
      }
    }
  }, [props.speech]);
  return (
    <Screen className="animated fadeInn">
      <Sound url={song} playStatus={sound} autoLoad={true} volume={10} />
      <Sound
        url="/popout.mp3"
        playStatus={popOut}
        onFinishedPlaying={() => {
          setPopOut(Sound.status.STOPPED);
        }}
        autoLoad={true}
        volume={10}
      />
      <Sound
        url="/alert.mp3"
        playStatus={
          !start && !win && !showEnemyPokemon
            ? Sound.status.PLAYING
            : Sound.status.STOPPED
        }
        autoLoad={true}
        volume={20}
      />
      <Sound
        url={attackSong}
        playStatus={attackSound}
        autoLoad={true}
        volume={30}
        onFinishedPlaying={() => {
          setAttackSound(Sound.status.STOPPED);
        }}
      />
      {/* <button
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
			</button> */}
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
      <div className="d-flex justify-content-center mt-3 skill">
        {myPokemon.moves &&
          myPokemon.moves.map((skill, index) => {
            return (
              <div
                id={skill.name}
                className="d-flex"
                onClick={() => {
                  playerMove(index);
                  if (playerTurn && !showEnemyAttack && !useEnemySkill) {
                    setPokemonSkill(skill);
                    setUsePokemonSkill(true);
                    setTimeout(() => {
                      setUsePokemonSkill(false);
                    }, 1000);
                  }
                }}
              >
                {skill.name}
                <div className="mr-2 ml-2">/</div>
              </div>
            );
          })}
      </div>
      {props.speech}
      <Pokeball
        className={(ballMeShow ? "bounce" : "fadeOut") + " me"}
        src="./pokeball.png"
        alt=""
      />
      <Pokeball
        className={(ballEnemyShow ? "bounce" : "fadeOut") + " enemy"}
        src="./pokeball.png"
        alt=""
      />
      <MyPokemon
        pokemon={myPokemon}
        myCurrentHp={myCurrentHp}
        showMyPokemon={showMyPokemon}
        setBallShow={setBallMeShow}
      />
      {usePokemonSkill && (
        <img
          src={pokemonSkill.url}
          alt="pokemonSkill"
          className="pokemon-skill"
        />
      )}
      <EnemyPokemon
        pokemon={enemyPokemon}
        enemyCurrentHp={enemyCurrentHp}
        showEnemyPokemon={showEnemyPokemon}
        setBallShow={setBallEnemyShow}
      />
      {useEnemySkill && <div>{enemySkill.name}</div>}
      {!start && !win ? (
        <PopUpEnemy isHidden={showEnemyPokemon} enemy={enemyPokemon} />
      ) : null}
      {!start ? (
        <PopUpPokemon
          isHidden={showMyPokemon || win}
          listPokemon={listPokemon}
          setPokemon={p => selectMyPokemon(p)}
          myPokemon={myPokemon}
        />
      ) : null}
      {win && <PopUpWin />}
      {useItem && (
        <PopUpItem
          items={items}
          medic={medicSpeech}
          setItem={e => setItem(e)}
          setUseItem={e => setUseItem(e)}
        />
      )}
      {showEnemyAttack && <EnemyAttack>{enemyAttack}</EnemyAttack>}
    </Screen>
  );
};

export default Battle;

//อย่าเลือก อาจารย์อติวงศ์
//item -1 aaaa T^T
// อาจารย์เด้ง2รอบตอนเปลี่ยน turn อาจารย์
// ตีเบิ้ลตอนใช้ body slam

//เปลี่ยนตัว
// ยืนยัน

//โจมตีช้าไป step  นึง
