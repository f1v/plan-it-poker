import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("pokerName") || '');
  const [vote, setVote] = useState(0);

  return (
    <UserContext.Provider
      value={{
        finishedVoting: !!vote,
        loggedIn: !!username,
        username,
        users: [
          ...users,
          // Dummy Data
          { name: 'Bob', vote: 1 },
          { name: 'Rick', vote: 5 },
          // end Dummy Data
          username ? { name: username, vote } : {}, // refactor how current user is added
        ],
        vote,
        setUsername,
        setVote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
