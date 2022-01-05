import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './Login.scss';

export const LoginForm = () => {
  const { setUsername } = useContext(UserContext);
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
            setUsername(name);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
