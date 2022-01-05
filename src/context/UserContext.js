import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [vote, setVote] = useState(0);

  return (
    <UserContext.Provider
      value={{
        loggedIn: !!username,
        username,
        vote,
        setUsername,
        setVote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
