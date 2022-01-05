import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import _ from 'lodash';

export const UserHub = ({ message }) => {
  const { users } = useContext(UserContext);

  const playerItem = (player) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>
        {player.name}: {player.vote !== 0 ? 'Voted' : '(...waiting)'}
      </span>
      <span>[Timer]</span>
    </div>
  );

  const playersList = () => _.map(users, (user) => playerItem(user));

  const displayMessage = () => (
    <div style={{ borderRadius: '5px', backgroundColor: 'lightblue' }}>
      {message}
    </div>
  );

  return (
    <div style={{ paddingLeft: '20vw' }}>
      {displayMessage()}
      <h5>Players: [TIMER] </h5>
      {playersList()}
    </div>
  );
};
