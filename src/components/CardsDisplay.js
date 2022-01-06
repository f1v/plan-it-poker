import React from 'react';
import {
	Card
} from './Card';

export const CardsDisplay = ({socket, vote}) => {
const cardValues = [...Array(10).keys()];
return <div style={{display: 'grid', gridTemplate: '1fr 1fr / repeat(5, 1fr)'}}>
	{cardValues.map(v => {
		if (vote) {
			return <Card socket={socket} value={v} disabled={v !== vote} selected={v === vote} />
		} else {
			return <Card socket={socket} value={v}/>
		}
	})}
</div>}