import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export const Card = ({ value, socket, disabled, selected }) => {
  const { username } = useContext(UserContext);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
	setIsSelected(selected);
  }, [selected])

  const emitValue = (value) => {
	if(selected) {
		socket.emit('vote', {
			username: username,
			vote: null,
		});
	} else {
		socket.emit('vote', {
			username: username,
			vote: value
		});
	}
	setIsSelected(!isSelected);
  };

  return (
    <div
      onClick={disabled ? () => {} : () => emitValue(value)}
      style={{ border: '1px solid black', height: '200px', width: '200px', backgroundColor: selected ? 'blue' : disabled ? 'grey' : 'white' }}
    >
      {value}
    </div>
  );
};
