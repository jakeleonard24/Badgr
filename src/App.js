import React, { Component } from 'react';
import './App.css';
import router from './router'
import Navbar from './Components/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <div>
      <div className='nav-bar'>
      </div>
          <Navbar/>
          {router}
      </div>
    );
  }
}

export default App;
