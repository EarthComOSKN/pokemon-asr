import React, { useState } from 'react';
import './PopUpEnemy.css';

const PopUpWin = (props) => {
	console.log(props.enemy)
	return (
		<div className="animated-popup bounceInLeft pop-up faster">
			<div className="title">Congratulations!!</div>
			<div className="subtitle mb-5">You Win</div>
		</div>
	);
};

export default PopUpWin;
