import React from "react";
import Hero from "./Hero";
import Latest from "./Latest";
import Header from "./Header";
import MatterCanvas from "./Matter";

const Nav = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <MatterCanvas />
      <Hero />
      <Latest />
    </div>
  );
};

export default Nav;
