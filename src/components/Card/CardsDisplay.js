import React from 'react';
import {
	Card
} from './Card';
import './Card.scss';

export const CardsDisplay = ({ socket, vote, cardValues}) => {
return <div className='card-container'>
	{cardValues.map(v => {
		if (vote) {
			return <Card socket={socket} value={v} disabled={v !== vote} selected={v === vote} />
		} else {
			return <Card socket={socket} value={v}/>
		}
	})}
</div>}
