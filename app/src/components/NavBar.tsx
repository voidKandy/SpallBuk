import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

function NavBar() {

  return (
    <nav>
      <ul>
        <button className="create-prompt-button">
          <Link to="/create" style={{ textDecoration: 'none' }}> + </Link>
        </button>
      </ul>
    </nav>
  );
};

export default NavBar;

