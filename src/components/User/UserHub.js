import React, {useContext} from 'react';
import _ from 'lodash';
import {VotingOptions} from '../VotingOptions';
import {
  RoomContext
} from '../../context/RoomContext';
import {
  UserContext
} from '../../context/UserContext';


export const UserHub = ({ message }) => {
  const {
    users,
    socket,
    cardsFlipped
  } = useContext(RoomContext);
  const {
    userObj
  } = useContext(UserContext);

  const kickUser = user => {
    console.log('kicking', user);
    socket.emit('kickUser', user);
  }

  const playerItem = (player) => {
    const playerStatusMessage = player.vote ? 'Voted' : '...waiting'
    const playerValues = cardsFlipped ? player.vote || 'No vote' : playerStatusMessage;
    return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {player !== userObj && <span>
        <button onClick={() => kickUser(player)}>Kick</button>
      </span>}
      <span>
        {player.username}: {playerValues}
      </span>
    </div>
  )};

  const playersList = () => _.map(users, (user) => playerItem(user));

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
      <VotingOptions />
      <div
        style={{
          border: 'solid',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <h5 style={{ paddingRight: '10px' }}>{users.map( u => u.username).length} Users</h5>
      </div>

      {playersList()}
    </div>
  );
};
