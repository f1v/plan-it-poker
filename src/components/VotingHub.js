import React from 'react';
import { CardsDisplay } from './Card/CardsDisplay';
import { Chart } from './Chart/Chart';
export const VotingHub = ({ socket, cardsFlipped, vote, cardValues }) =>
  !cardsFlipped ? (
    <CardsDisplay socket={socket} vote={vote} cardValues={cardValues} />
  ) : (
    <Chart />
  );
