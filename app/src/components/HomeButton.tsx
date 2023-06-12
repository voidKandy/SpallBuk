import { Link } from "react-router-dom";
import React from "react";


const HomeButton: React.FC = () => {

  return (
    <div>
      <Link to="/" className="home-button">
        [ Spållßµk ]
      </Link>
    </div>
  );
};

export default HomeButton;
