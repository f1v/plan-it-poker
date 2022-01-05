import React from 'react';
import {
	Card
} from './Card';

export const CardsDisplay = ({socket}) => {
const cardValues = [...Array(10).keys()];
return <div style={{display: 'grid', gridTemplate: '1fr 1fr / repeat(5, 1fr)'}}>
	    {
        cardValues.map(v => <Card socket={socket} value={
            v
          }
          />)}
</div>}