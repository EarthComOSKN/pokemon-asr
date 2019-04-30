import React, { useState } from 'react';
import './PopUpEnemy.css';

const PopUpEnemy = (props) => {
	console.log(props.enemy)
	return (
		<div className="animated-popup bounceInLeft pop-up faster" hidden={props.isHidden}>
			<div className="title">Danger !!!</div>
			<div className="subtitle mb-5">Enemy is detected!</div>
		</div>
	);
};

export default PopUpEnemy;
