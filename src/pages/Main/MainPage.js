import React, { Fragment, useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { UserHub } from '../../components/User/UserHub';
import { VotingHub } from '../../components/VotingHub';
import io from 'socket.io-client';

export const MainPage = () => {
  const { userObj, userId } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [store, setStore] = useState([]);
  const ENDPOINT = process.env.REACT_APP_ENDPOINT ? `${process.env.REACT_APP_ENDPOINT}` : 'http://localhost:4000';

  useEffect(() => {
    console.log('first useEffect running')
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    setSocket(newSocket);
    newSocket.emit('username', userObj)

    return () => {
      newSocket.disconnect();
    };
  }, [userObj, ENDPOINT])

  useEffect(() => {
    console.log('second useEffect running')
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });
    newSocket.emit('username', userObj)
    newSocket.on('vote', (updatedStore) => {
      setStore(updatedStore);
    });

    newSocket.on('users', u => {
      setStore(u)
    })

    newSocket.on('reset', u => setStore(u))

    newSocket.on('cards flipped', (msg) => {
      setCardsFlipped(msg);
    })

    return () => {
      newSocket.disconnect();
    };
  }, [setStore, userObj, ENDPOINT]);

  useEffect(() => {
    console.log('third useEffect running')
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    newSocket.emit('cards flipped', cardsFlipped);

    return () => {
      newSocket.disconnect();
    };
  }, [cardsFlipped, ENDPOINT])

  const resetVoting = () => {
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    socket.emit('reset');

    newSocket.disconnect();
  }

  const mySocketInfo = store.find(u => u.userId === userId);
  const vote = mySocketInfo && mySocketInfo.vote;

  return (
    <Fragment>
      <h4>Welcome to Plan-It Poker!</h4>
      {socket ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <VotingHub vote={vote} socket={socket} cardsFlipped={cardsFlipped} votes={store.map(u => u.vote)} />
          <div>
            <UserHub
          store={store}
          cardsFlipped={cardsFlipped}
          socket={socket}
          />
          <button disabled={!store.map(u => u.vote).some(el => el !== null)} style={{width: '100%', marginTop: '50px', height: '50px'}} onClick={() => {setCardsFlipped(!cardsFlipped)}}>Flip Cards</button>
          {cardsFlipped && <button style={{width: '100%', marginTop: '50px', height: '50px'}} onClick={resetVoting}>Reset</button>}
          </div>
        </div>
      ) : (
        []
      )}
    </Fragment>
  );
};
