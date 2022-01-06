import React from 'react';
import { Chart } from '../components/Chart/Chart';

export const VoteDisplay = ({ votes }) => (
  <div>
    <Chart votes={votes} />
  </div>
);
