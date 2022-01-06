import React from 'react';
import { VoteDisplay } from './VoteDisplay';
import { CardsDisplay } from './CardsDisplay';
export const VotingHub = ({ socket, cardsFlipped, votes, vote }) =>
  !cardsFlipped ? <CardsDisplay socket={socket} vote={vote} /> : <VoteDisplay votes={votes} />;
