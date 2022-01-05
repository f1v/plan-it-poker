import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Timer from '../../components/Timer';
import _ from 'lodash';

export const UserHub = ({ message }) => {
  const { users } = useContext(UserContext);

  const playerItem = (player) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>
        {player.name}: {player.vote !== 0 ? 'Voted' : '(...waiting)'}
      </span>
      <Timer />
    </div>
  );

  const playersList = () => _.map(users, (user) => playerItem(user));

  const displayMessage = () => (
    <div
      style={{
        borderRadius: '5px',
        backgroundColor: 'lightblue',
        marginBottom: '10px',
      }}
    >
      {message}
    </div>
  );

  return (
    <div style={{ paddingLeft: '20vw' }}>
      {displayMessage()}
      <div
        style={{
          border: 'solid',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <h5 style={{ paddingRight: '10px' }}>Players:</h5>
        <Timer />
      </div>

      {playersList()}
    </div>
  );
};
