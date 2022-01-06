import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import {
  v4 as uuidv4
} from 'uuid';
import './Login.scss';

export const LoginForm = () => {
  const { setUsername, setUserId } = useContext(UserContext);
  const [name, setName] = useState();

  return (
    <div className='Login'>
      <div className='login-form'>
        <div>
          <label>Name</label>
          <input
            autoFocus
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            const userId = uuidv4();
            setUsername(name);
            setUserId(userId);
            localStorage.setItem("pokerName", name);
            localStorage.setItem("userId", userId);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
