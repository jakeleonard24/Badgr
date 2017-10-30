import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import router from './router'
import Login from './Components/Login/Login';

class App extends Component {
  render() {
    return (
      <div>
          {router}
      </div>
    );
  }
}

export default App;
