import React, { Fragment, useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { UserHub } from '../../components/User/UserHub';
import { VotingHub } from '../../components/VotingHub';
import { LoginModal } from '../Login/LoginPage';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Modal } from '../../components/Modal'
import CardOptionForm from '../../components/Card/CardOptionForm'

export const MainPage = () => {
  const { loggedIn, userObj, userId, setStoreContext } = useContext(
    UserContext
  );
  const [socket, setSocket] = useState(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [cardValues, setCardValues] = useState([1,2,3,5,8,13,21]);
  const [store, setStore] = useState([]);
  const { id } = useParams();
  const [showCardOptions, showModal] = useState(false)

  const ENDPOINT = process.env.REACT_APP_ENDPOINT
    ? `${process.env.REACT_APP_ENDPOINT}`
    : 'http://localhost:4000';
  const updatedUser = {
    ...userObj,
    room: id,
  };

  useEffect(() => {
    console.log('first useEffect running');
    const newSocket = io(ENDPOINT, {
      query: {
        id: id,
      },
      transports: ['websocket'],
    });

    setSocket(newSocket);
    newSocket.emit('username', updatedUser);

    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line
  }, [id, userObj, ENDPOINT]);

  useEffect(() => {
    console.log('second useEffect running');
    const newSocket = io(ENDPOINT, {
      query: {
        id: id,
      },
      transports: ['websocket'],
    });
    newSocket.emit('username', updatedUser);
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
    // eslint-disable-next-line
  }, [id, setStore, userObj, ENDPOINT, setStoreContext]);

  useEffect(() => {
    console.log('third useEffect running');
    const newSocket = io(ENDPOINT, {
      query: {
        id: id,
      },
      transports: ['websocket'],
    });

    newSocket.emit('cards flipped', cardsFlipped);

    return () => {
      newSocket.disconnect();
    };
  }, [id, cardsFlipped, ENDPOINT]);

  useEffect(() => {
    console.log('Fourth useEffect running');
    const newSocket = io(ENDPOINT, {
      query: {
        id: id,
      },
      transports: ['websocket'],
    });

    newSocket.emit('cardValues', cardValues);

    return () => {
      newSocket.disconnect();
    };
  }, [id, cardValues, ENDPOINT]);

  const resetVoting = () => {
    const newSocket = io(ENDPOINT, {
      query: {
        id: id,
      },
      transports: ['websocket'],
    });

    socket.emit('reset');

    newSocket.disconnect();
  };

  const mySocketInfo = store.find((u) => u.userId === userId);
  const vote = mySocketInfo && mySocketInfo.vote;

  const updateCardValues = (options) => {
    const values = [];
    const fib = n => n <= 1 ? 1 : fib(n - 1) + fib(n - 2);
    const seq = n => n;
    const bin = n => n.toString(2);
    const squ = n => n * n;
    const cub = n => n ** n;
    const sequences = { fib, seq, bin, squ, cub }

    for (let i = 1; i <= options.numberOfCards; i++) {
      values.push(sequences[options.sequence](i));
    }

    options.includeCoffee && values.push('coffee');
    setCardValues(values);
  };

  return (
    <Fragment>
      <LoginModal show={!loggedIn} />
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
              onClick={() => {
                showModal(true)
              }}
            >
              Open Board Options
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

      <Modal show={showCardOptions} handleClose={() => showModal(false)}>
        <CardOptionForm updateBoard={updateCardValues} closeModal={() => showModal(false)}/>
      </Modal>
    </Fragment>
  );
};
