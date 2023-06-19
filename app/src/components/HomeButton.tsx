import { Link } from "react-router-dom";
import React from "react";


const HomeButton: React.FC = () => {

  return (
    <div className="home-button-container">
      <Link to="/" className="home-button">
        [ Spållßµk ]
      </Link>
    </div>
  );
};

export default HomeButton;
