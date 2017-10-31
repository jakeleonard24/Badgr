import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import './Navbar.css';

export default class Navbar extends Component {
  render() {
    return (
<div> 
<header className='main-nav'>
<nav>
<div className="left-nav-align">
<div className="title-nav">
<Link to='/home'><img className='alpha-logo' 
src='https://s1.postimg.org/8hkxcmvqy7/badger_googlefix.png' alt='ALPHA' />
</Link>

</div>
</div>

<div className="right-nav-align">
<Link to='/post' style={{ textDecoration: 'none' }} ><div className="title-nav">Post Badge</div></Link>
<Link to='/create' style={{ textDecoration: 'none' }} ><div className="title-nav">Create Badge</div></Link>
<Link to='/notifications' style={{ textDecoration: 'none' }} ><div className="title-nav">Notifications</div></Link>
<Link to='/login' style={{ textDecoration: 'none' }} > <div className="title-nav">Login</div></Link>
<Link to='/profile' style={{ textDecoration: 'none' }} ><div className="title-nav">Profile</div></Link>
</div>
</nav>
</header>
</div>
    )
  }
}