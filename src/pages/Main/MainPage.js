import React, { Fragment } from 'react';
import { UserHub } from '../../components/User/UserHub';

export const MainPage = () => {
  return (
    <Fragment>
      <h4>Welcome to Plan-It Poker!</h4>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <div style={{ padding: '10px' }}>[Display Cards]</div>
        <UserHub message={'Test Message'} />
      </div>
    </Fragment>
  );
};
