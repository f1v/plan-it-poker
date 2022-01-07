import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [username, setUsername] = useState(
    localStorage.getItem('pokerName') || ''
  );
  const [vote, setVote] = useState(null);
  const [userObj, setUserObj] = useState({});
  const [votingRole, setVotingRole] = useState(true);
  const [adminRole, setAdminRole] = useState(localStorage.getItem("adminRole") || '');

  useEffect(() => {
    const newUserObj = {
      username: username,
      vote: vote || null,
      userId: userId,
      votingRole: votingRole,
      adminRole: adminRole,
    }
    setUserObj(newUserObj);
  }, [username, vote, userId, adminRole, votingRole])

  return (
    <UserContext.Provider
      value={{
        loggedIn: !!username,
        username,
        userId,
        votingRole,
        adminRole,
        userObj,
        vote,
        setUserId,
        setUsername,
        setVote,
        setVotingRole,
        setAdminRole,
        setUserObj
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
