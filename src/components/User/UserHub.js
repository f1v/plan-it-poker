import React from 'react';
import _ from 'lodash';

export const UserHub = ({ message, store, socket, cardsFlipped }) => {

  const kickUser = userId => {
    console.log('kicking', userId);
    socket.emit('kickUser', userId);
  }

  const playerItem = (player) => {
    const playerStatusMessage = player.vote ? 'Voted' : '...waiting'
    const playerValues = cardsFlipped ? player.vote || 'No vote' : playerStatusMessage;
    return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>
        <button onClick={() => kickUser(player.userId)}>Kick</button>
      </span>
      <span>
        {player.username}: {playerValues}
      </span>
    </div>
  )};

  const playersList = () => _.map(store, (user) => playerItem(user));

  const displayMessage = () => (
    <div
      style={{
        borderRadius: '5px',
        backgroundColor: 'lightblue',
        marginBottom: '10px',
      }}
    >
      {message || 'User Hub'}
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
        <h5 style={{ paddingRight: '10px' }}>{store.map( u => u.username).length} Users</h5>
      </div>

      {playersList()}
    </div>
  );
};
