import React, { useState } from "react";
import styled from "styled-components";
import Particles from "react-particles-js";
import config from "./particlesjs-config.json";
import Sound from "react-sound";

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-image: url('./bg-home.png')
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
  width: 500px;
  margin-top: 5%;
`;

const StartButton = styled.a`
    font-size: 50px;
    color: yellow;
`;

const Home = () => {
  const [sound, setSound] = useState(Sound.status.STOPPED);
  console.log(config);
  return (
    <Screen>
      <Sound url="/battle.mp4" playStatus={sound} autoLoad={true} />
      <Particles className="bg" params={config} />
      <Logo>
        <Img className="animated  fadeIn" src="./pokelogo.png" alt="" />
        <div style={{ marginTop: "300px" }}>
          <StartButton href="/battle">Start Game</StartButton>
        </div>
      </Logo>
    </Screen>
  );
};

export default Home;
