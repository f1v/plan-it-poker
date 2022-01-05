import React, {
  Fragment,
  useContext,
  useEffect,
  useState
} from 'react';
import { UserHub } from '../../components/User/UserHub';
import {
  CardsDisplay
}
from '../../components/CardsDisplay';
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        {socket ? <CardsDisplay socket={socket} /> : []}
        <UserHub message={'Test Message'} />
        {socket ? <div>THIS IS THE VOTNG HISTORY:
      {votes}
    </div> : []}
      </div>
    </Fragment>
  );
};
