import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { LoginModal } from "../Login/LoginPage";
import "./LandingPage.css";

export const LandingPage = () => {
  const { userId } = useContext(UserContext);

  const navigate = useNavigate();
  return (
    <div className="background">
      <h1 className="header">Welcome to Solar System Poker</h1>
      <button
        className="button"
        onClick={() => {
          navigate(`/${userId}`);
        }}
      >
        Create a Room
      </button>
      <LoginModal show={!userId} />
    </div>
  );
};
