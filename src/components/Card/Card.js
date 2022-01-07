import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import './Card.scss';

export const Card = ({ value, socket, disabled, selected }) => {
  const { userObj, setVote } = useContext(UserContext);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const emitValue = (value) => {
    if (selected) {
      socket.emit('vote', { ...userObj, ...{ vote: null } });
      setIsSelected(0);
    } else {
      socket.emit('vote', {
        ...userObj,
        ...{
          vote: value,
        },
      });
    }
    setIsSelected(!isSelected);
    setVote(value);
  };

  return (
    <div
      onClick={disabled ? () => {} : () => emitValue(value)}
      className={`card-edge color-${
        selected ? 'selected' : disabled ? 'disabled' : 'default'
      }`}
    >
      <div className='card-top'>{value === 'coffee' ? '?' : value}</div>
      <div className='card-center'>{value}</div>
      <div className='card-bottom'>{value === 'coffee' ? '?' : value}</div>
    </div>
  );
};
