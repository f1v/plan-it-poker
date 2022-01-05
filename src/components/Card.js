import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const Card = ({ value, socket }) => {
  const { setVote } = useContext(UserContext);

  const emitValue = (value) => {
    socket.emit('vote', value);
    console.log('card value clicked', value);
    setVote(value);
  };

  return (
    <div
      onClick={() => emitValue(value)}
      style={{ border: '1px solid black', height: '200px', width: '200px' }}
    >
      {value}
    </div>
  );
};
