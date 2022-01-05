import React, { useContext, useState, useEffect } from 'react';
import DonutChart from 'react-donut-chart';
import { groupBy, map, meanBy, sortBy } from 'lodash';
import { UserContext } from '../../context/UserContext';

export const Chart = () => {
  const { users } = useContext(UserContext);
  const [groupedUsers] = useState(groupBy(users, 'vote'));
  const [average] = useState(meanBy(users, 'vote').toFixed(1));

  const formatData = () => {
    return map(groupedUsers, (voteData) => {
      const label = `${voteData.length} Player(s) voted for ${voteData[0].vote}`;
      return {
        label,
        value: voteData.length,
      };
    });
  };
  return (
    <div>
      <DonutChart
        formatValues={() => average && `Avg Vote: ${average}`}
        data={formatData()}
      />
    </div>
  );
};
