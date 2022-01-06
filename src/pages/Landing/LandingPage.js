import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export const LandingPage = () => {
  const { userId } = useContext(UserContext);

  const navigate = useNavigate();
  return <button onClick={() => navigate(`/${userId}`)}>Create a Room</button>;
};
