import React, { useState, useEffect } from 'react';
import './PopUpItem.css';

const PopUpItem = props => {
	const [confirm, setConfirm] = useState(false);
	const [selectedPotion, setSelectedPotion] = useState(props.medic);
	useEffect(() => {
		setConfirm(false);
	}, [props.isHidden]);
	return (
		<div className="animated-popup bounceInLeft pop-up-pokemon faster" hidden={props.isHidden || confirm}>
			{/* <div className="title">You are dead...</div> */}
			<div className="subtitle">Select items you want to use</div>
			<div className="item-name">{selectedPotion.name}</div>
			<div className="d-flex justify-content-center">
				{props.items.map(i => {
					return (
						<div
							onClick={() => {
								setSelectedPotion(i);
							}}
						>
							<img src={i.url} alt="potion" style={{ cursor: 'pointer' }} />
							<div>
								{i.name} x{i.amount}
							</div>
						</div>
					);
				})}
			</div>

			<div>
				<button
					className="mt-4 mr-4"
					onClick={() => {
						setConfirm(true);
						props.setUseItem(false)
					}}
				>
					Back
				</button>
				<button
					className="mt-4"
					onClick={() => {
						setConfirm(true);
						selectedPotion.amount -= 1;
						props.setItem(selectedPotion);
					}}
				>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default PopUpItem;
