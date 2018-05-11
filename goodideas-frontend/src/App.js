import React, { Component } from "react";
import "./App.css";
import Ideas from "./components/Ideas";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <h1 className="App-title">Great Ideas Start Here</h1>
        </header>
        <div className="container">
          <Ideas />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
