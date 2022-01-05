import React from 'react';
import { VoteDisplay } from './VoteDisplay';
import { CardsDisplay } from './CardsDisplay';
export const VotingHub = ({ socket, voting }) =>
  voting ? <CardsDisplay socket={socket} /> : <VoteDisplay />;
