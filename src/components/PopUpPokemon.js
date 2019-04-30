import React, { useState, useEffect } from 'react';
import './PopUpPokemon.css';

const PopUpPokemon = props => {
	const [selectedPokemon, setSelectedPokemon] = useState(props.listPokemon[0]);
	const [confirm, setConfirm] = useState(false);
	console.log(props.listPokemon);
	useEffect(() => {
        setSelectedPokemon(props.listPokemon[0])
		setConfirm(false);
	}, [props.isHidden]);
	return (
		<div className="animated-popup bounceInLeft pop-up-pokemon faster" hidden={props.isHidden || confirm}>
			{/* <div className="title">You are dead...</div> */}
			<div className="subtitle">Please choose your pokemon</div>
			<div className="pokemon-name mt-3 mb-3">{selectedPokemon.name}</div>
			{props.listPokemon.map(p => {
				return (
					<img
						src={p.urlNormal}
						alt="pokemon"
						className="pokemon-popup-pic pointer"
						onClick={() => setSelectedPokemon(p)}
					/>
				);
			})}
			<div>
            <button
                className="mt-4 mr-4"
					onClick={() => {
						props.setPokemon(props.myPokemon);
						setConfirm(true);
					}}
				>
					Back
				</button>
				<button
                className="mt-4"
					onClick={() => {
						props.setPokemon(selectedPokemon);
						setConfirm(true);
					}}
				>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default PopUpPokemon;
