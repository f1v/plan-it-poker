import React, { Fragment, useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { UserHub } from '../../components/User/UserHub';
import { VotingHub } from '../../components/VotingHub';
import io from 'socket.io-client';

export const MainPage = () => {
  const { userObj, userId, setStoreContext } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [cardValues, setCardValues] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [store, setStore] = useState([]);
  const ENDPOINT = process.env.REACT_APP_ENDPOINT
    ? `${process.env.REACT_APP_ENDPOINT}`
    : 'http://localhost:4000';

  useEffect(() => {
    console.log('first useEffect running');
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    setSocket(newSocket);
    newSocket.emit('username', userObj);

    return () => {
      newSocket.disconnect();
    };
  }, [userObj, ENDPOINT]);

  useEffect(() => {
    console.log('second useEffect running');
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });
    newSocket.emit('username', userObj);
    newSocket.on('vote', (updatedStore) => {
      setStore(updatedStore);
      setStoreContext(updatedStore);
    });

    newSocket.on('users', (u) => {
      setStore(u);
      setStoreContext(u);
    });

    newSocket.on('reset', (u) => {
      setStore(u);
      setStoreContext(u);
    });

    newSocket.on('cards flipped', (msg) => {
      setCardsFlipped(msg);
    });

    newSocket.on('cardValues', (values) => {
      setCardValues(values);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setStore, userObj, ENDPOINT, setStoreContext]);

  useEffect(() => {
    console.log('third useEffect running');
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    newSocket.emit('cards flipped', cardsFlipped);

    return () => {
      newSocket.disconnect();
    };
  }, [cardsFlipped, ENDPOINT]);

  useEffect(() => {
    console.log('Fourth useEffect running');
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    newSocket.emit('cardValues', cardValues);

    return () => {
      newSocket.disconnect();
    };
  }, [cardValues, ENDPOINT]);

  const resetVoting = () => {
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    socket.emit('reset');

    newSocket.disconnect();
  };

  const mySocketInfo = store.find((u) => u.userId === userId);
  const vote = mySocketInfo && mySocketInfo.vote;

  const updateCardValues = (options) => {
    const values = [];
    const fib = (n) => (n <= 1 ? 1 : fib(n - 1) + fib(n - 2));

    for (let i = 1; i <= options.numberOfCards; i++) {
      values.push(options.sequence === 'fib' ? fib(i) : i);
    }

    options.includeCoffee && values.push('coffee');
    setCardValues(values);
  };

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
          <VotingHub
            vote={vote}
            cardValues={cardValues}
            socket={socket}
            cardsFlipped={cardsFlipped}
          />
          <div>
            <UserHub
              store={store}
              cardsFlipped={cardsFlipped}
              socket={socket}
            />
            <button
              disabled={!store.map((u) => u.vote).some((el) => el !== null)}
              style={{ width: '100%', marginTop: '50px', height: '50px' }}
              onClick={() => {
                setCardsFlipped(!cardsFlipped);
              }}
            >
              Flip Cards
            </button>
            <button
              style={{ width: '100%', marginTop: '50px', height: '50px' }}
              onClick={(e) => {
                updateCardValues({
                  numberOfCards: 5,
                  sequence: 'fib',
                  includeCoffee: true,
                });
              }}
            >
              Set card Values
            </button>
            {cardsFlipped && (
              <button
                style={{ width: '100%', marginTop: '50px', height: '50px' }}
                onClick={resetVoting}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      ) : (
        []
      )}
    </Fragment>
  );
};
