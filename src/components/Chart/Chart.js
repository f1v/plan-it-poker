import React, { useState, useContext } from 'react';
import DonutChart from 'react-donut-chart';
import { compact, groupBy, map } from 'lodash';
import { RoomContext } from '../../context/RoomContext';
import { Legend } from './Legend';
import './Chart.scss';

export const Chart = () => {
  const { users } = useContext(RoomContext);
  const [votes] = useState(
    compact(
      map(
        users,
        (userVote) => typeof userVote.vote === 'number' && userVote.vote
      )
    )
  );
  const groupedUsers = groupBy(users, 'vote');

  const colors = [
    'turquoise',
    'purple',
    'red',
    'teal',
    'yellow',
    'brown',
    'blue',
    'green',
    'orange',
    'black',
  ];

  const findAverage = (votes) => {
    return votes.length >= 1 ? votes.reduce((a, b) => a + b) / votes.length : 0;
  };
  const average = parseFloat(findAverage(votes).toFixed(2));

  const formatData = () => {
    return map(groupedUsers, (voteData) => {
      const vote = voteData[0].vote;
      const label = `Vote Revealed: ${vote === null ? 'did not vote' : vote}`;
      return {
        label,
        value: voteData.length,
      };
    });
  };
  return (
    <div style={{ display: 'flex' }}>
      <DonutChart
        colors={colors}
        formatValues={() => (votes ? `Avg Vote: ${average}` : 'No votes')}
        data={formatData()}
        legend={false}
        outerRadius={0.7}
        innerRadius={0.6}
        className='vote-chart'
        clickToggle={false}
      />
      <Legend users={groupedUsers} />
    </div>
  );
};
