import React from 'react';

export const Card = ({value, socket}) => {

const emitValue = (value) => {
	socket.emit('vote', value)
	console.log('card value clicked', value);
}

return <div onClick={() => emitValue(value)} style={{border: '1px solid black', height: '200px', width: '200px'}}>{value}</div>}