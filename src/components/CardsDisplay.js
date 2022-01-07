import React, {useContext} from 'react';
import {
	Card
} from './Card';
import './Card.scss';
import {
	RoomContext
} from '../context/RoomContext';
import {
	UserContext
} from '../context/UserContext';

export const CardsDisplay = () => {
	const {cardValues, socket } = useContext(RoomContext);
	const {userObj} = useContext(UserContext);
	const {vote} = userObj;
return <div className='card-container'>
	{cardValues.map(v => {
		if (vote) {
			return <Card socket={socket} value={v} disabled={v !== vote} selected={v === vote} />
		} else {
			return <Card socket={socket} value={v}/>
		}
	})}
</div>}
