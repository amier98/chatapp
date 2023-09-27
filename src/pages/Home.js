import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

const Home = () => {
    return (
      <div className="homePage">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </div>
    );
}

export default Home