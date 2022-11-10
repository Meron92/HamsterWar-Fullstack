import React from "react";
import { Link } from "react-router-dom";
export default function StartPage() {
  return (
    <div>
      <header className="welcome">
      <h1>Welcome to hamster war</h1>
      </header>
      <div className="button"></div>
      <img  src="http://s1.thingpic.com/images/Wn/VN5nsWUzAByTsRCdxGx4qjGr.jpeg"/>
      <h1 className="welcome">Game rules</h1>
      <p>Chose the cutest hamster</p>
      <div className="Btn-center">
      <Link to="/battle">
        <button className="btn-play">Play</button>
      </Link>
      <Link to="/gallery">
        <button className="btn-gallery">Gallery</button>
      </Link>
      </div>
    </div>
  );
}