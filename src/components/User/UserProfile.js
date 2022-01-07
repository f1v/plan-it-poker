import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './User.scss';

export const UserProfile = ({ show, onClose, socket }) => {
  const { setUsername, setUserId, username, userObj, vote } = useContext(
    UserContext
  );
  const [name, setName] = useState(username);

  return (
    <Modal open={show} onClose={onClose} center>
      <div className='Login'>
        <div className='login-form'>
          <div>
            <h4 style={{ textAlign: 'center', marginTop: 40 }}>
              Update Username
            </h4>
            <input
              autoFocus
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            style={{ margin: 10 }}
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              const updatedUser = { ...userObj, username: name, vote };
              setUsername(name);
              setUserId(userObj.userId);
              localStorage.setItem('pokerName', name);
              socket.emit('kickUser', userObj.userId);
              socket.emit('username', updatedUser);
              socket.emit('vote', updatedUser);
              onClose();
            }}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};
