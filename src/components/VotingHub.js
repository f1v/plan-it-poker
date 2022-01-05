import React from 'react';
import {
	VoteDisplay
} from './VoteDisplay';
import {
	CardsDisplay
}
from './CardsDisplay';
export const VotingHub = ({socket, voting = true}) => voting ? <CardsDisplay socket={socket} /> : <VoteDisplay />;