import React, {useContext} from 'react';
import { CardsDisplay } from './CardsDisplay';
import { Chart } from './Chart/Chart';
import {
	RoomContext
} from '../context/RoomContext';
export const VotingHub = () => {
	  const {
	  	cardsFlipped
	  } = useContext(RoomContext);
  return !cardsFlipped ? (
    <CardsDisplay />
  ) : (
    <Chart />
  )};
