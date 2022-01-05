import React, {
  Fragment,
  useEffect,
  useState
} from 'react';
import { UserHub } from '../../components/User/UserHub';
import {
  VotingHub
}
from '../../components/VotingHub';
import io from "socket.io-client";

export const MainPage = () => {
  const [socket, setSocket] = useState(null);
  const [votes, setVotes] = useState("");
  const ENDPOINT = "http://localhost:4000";
  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ['websocket']
    });
    setSocket(newSocket);
    newSocket.on('vote', (vote) => {
      setVotes(`${votes}, ${vote}`)
      console.log('vote is in');
    })

    return () => {
      newSocket.disconnect();
    }
  }, [setSocket, votes]);

  return (
    <Fragment>
      <h4>Welcome to Plan-It Poker!</h4>
      {socket ? <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <VotingHub socket={socket} />
        <UserHub message={'Test Message'} />
      </div> : []}
    </Fragment>
  );
};
