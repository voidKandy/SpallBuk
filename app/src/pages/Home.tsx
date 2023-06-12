import React from 'react';
import '../App.css';
import NavBar from "../components/NavBar";
import HomeButton from "../components/HomeButton";

function Home() {
  return (
    <div className="container">
      <HomeButton />
      <NavBar />
    </div>
  );
}

export default Home;
