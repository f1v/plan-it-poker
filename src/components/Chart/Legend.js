import React from 'react';
import { map } from 'lodash';

export const Legend = ({ users }) => {
  const formatLabel = (userVote, vote) => {
    let voteMessage;
    switch (vote) {
      case null:
        voteMessage = 'did not vote';
        break;

      case 'coffee':
        voteMessage = 'voted Coffee Cup';
        break;

      default:
        voteMessage = `voted for ${vote}`;
        break;
    }

    return `${userVote.length} ${
      userVote.length === 1 ? 'Player' : 'Players'
    } ${voteMessage}`;
  };

  const displayListItems = () => {
    return map(users, (voteData) => {
      const label = formatLabel(voteData, voteData[0].vote);
      return <li>{label}</li>;
    });
  };
  return (
    <ul
      style={{
        padding: '0px',
        textAlign: 'left',
      }}
    >
      {displayListItems()}
    </ul>
  );
};
