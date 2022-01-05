import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("pokerName") || '');
  const [vote, setVote] = useState(0);

  return (
    <UserContext.Provider
      value={{
        loggedIn: !!username,
        username,
        users: [...users, username ? { name: username, vote } : {}],
        vote,
        setUsername,
        setVote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
