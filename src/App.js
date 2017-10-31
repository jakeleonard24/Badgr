import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import router from './router'
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
          {router}
      </div>
    );
  }
}

export default App;
