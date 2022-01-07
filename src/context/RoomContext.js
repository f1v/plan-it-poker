import React, { createContext, useState, useEffect } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [cardValues, setCardValues] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [users, setUsers] = useState([]);
  const ENDPOINT = process.env.REACT_APP_ENDPOINT ?
  	`${process.env.REACT_APP_ENDPOINT}` :
  	'http://localhost:4000';

	// users looks like an array of 
	// {
	// 	username: username,
	// 	vote: vote || null,
	// 	userId: userId,
	// 	votingRole: votingRole,
	// 	adminRole: adminRole,
	// }

	const votes = users && users.map(u => u.vote);
  return (
    <RoomContext.Provider
      value={{
		  socket,
		  cardsFlipped,
		  votes,
		  users,
		  cardValues,
		  ENDPOINT,
		  setSocket,
		  setCardsFlipped,
		  setCardValues,
		  setUsers,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
