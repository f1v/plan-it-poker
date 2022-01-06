import React from 'react';
import DonutChart from 'react-donut-chart';

export const Chart = ({votes}) => {
  const findAverage = votes => votes.length > 1 ? votes.reduce((a, b) => a + b) / votes.length : 0;
  const average = findAverage(votes);

  const formatData = () => {
    const uniqueVotes = [...new Set(votes)];
    return uniqueVotes.map(v => ({
      label: '',
      value: v,
    }));
}
  return (
    <div>
      <DonutChart
        formatValues={ () => 
          votes ? `Avg Vote: ${average}` : 'No votes'
        }
        data={formatData()}
        legend={false}
      />
    </div>
  );
};
