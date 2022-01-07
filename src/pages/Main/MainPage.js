import React, { Fragment, useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { RoomContext } from '../../context/RoomContext';
import { UserHub } from '../../components/User/UserHub';
import { VotingHub } from '../../components/VotingHub';
import io from 'socket.io-client';

export const MainPage = () => {
  const { userObj, setUserObj } = useContext(UserContext);
  const {socket, setSocket, cardsFlipped, setCardsFlipped, cardValues, setCardValues, users, setUsers, ENDPOINT} = useContext(RoomContext);

  const findMyUser = u => u.find(u => u.userId === userObj.userId);

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    setSocket(newSocket);
    newSocket.emit('username', userObj);

    return () => {
      newSocket.disconnect();
    };
  }, [userObj, ENDPOINT, setSocket]);

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    newSocket.on('users', (u) => {
      setUsers(u);
      const user = findMyUser(u);
      setUserObj(user);
    });

    newSocket.on('reset', (u) => {
      setUsers(u);
      const user = findMyUser(u);
      setUserObj(user);
      setCardsFlipped(false);
    });

    // newSocket.on('votingRole', u => {
    //   setUsers(u);
    //   const user = findMyUser(u);
    //   setUserObj(user);
    // })

    newSocket.on('cards flipped', (msg) => {
      setCardsFlipped(msg);
    });

    newSocket.on('cardValues', (values) => {
      setCardValues(values);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setUsers, userObj, ENDPOINT, setCardsFlipped, setCardValues, findMyUser, setUserObj]);

  useEffect(() => {
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
    socket.emit('reset');
  };

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
          />
          <div>
            <UserHub
            />
            <button
              disabled={!users.map((u) => u.vote).some((el) => el !== null)}
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
