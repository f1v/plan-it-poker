import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || '');
  const [username, setUsername] = useState(localStorage.getItem("pokerName") || '');
  const [vote, setVote] = useState(0);
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    const newUserObj = {
      username: username,
      vote: vote || null,
      userId: userId,
    }
    setUserObj(newUserObj);
  }, [username, vote, userId])

  return (
    <UserContext.Provider
      value={{
        finishedVoting: !!vote,
        loggedIn: !!username,
        username,
        userId,
        userObj,
        vote,
        setUserId,
        setUsername,
        setVote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
