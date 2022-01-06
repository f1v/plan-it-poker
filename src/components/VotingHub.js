import React from 'react';
import { VoteDisplay } from './VoteDisplay';
import { CardsDisplay } from './CardsDisplay';
export const VotingHub = ({ socket, cardsFlipped, votes, vote, cardValues }) =>
  !cardsFlipped ? <CardsDisplay socket={socket} vote={vote} cardValues={cardValues}/> : <VoteDisplay votes={votes} />;
