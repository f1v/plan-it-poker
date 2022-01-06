import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { LoginPage } from '../Login/LoginPage';

export const LandingPage = () => {
  const { userId } = useContext(UserContext);

  const navigate = useNavigate();
  return userId ? (
    <button
      onClick={() => {
        navigate(`/${userId}`);
      }}
    >
      Create a Room
    </button>
  ) : (
    <LoginPage />
  );
};
