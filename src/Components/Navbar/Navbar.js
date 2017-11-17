import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import './Navbar.css';
import {connect} from 'react-redux';
import {getUserInvites, getCurrentUser} from '../../ducks/reducer';

class Navbar extends Component {
  constructor(props){
    super(props)

}
componentDidMount(){
        this.props.getUserInvites(this.props.currentUserId)
}
  render() {
    let invitesNotification = this.props.userInvites.reduce((sum, invite) => {
      return sum + (invite.user_id = 1)
    }, 0)
    return (
<div>
  
<header className='main-nav'>
<nav>
<div className='mobile-nav'>
<div className="title-nav">
<Link to='/'><img className='profile-icon' 
src='https://s1.postimg.org/9n2brz2owf/home_Asset_6_3x.png' alt='ALPHA' />
</Link>
</div>
<Link to='/search' style={{ textDecoration: 'none' }} ><div className="title-nav">
<img className='profile-icon' src='https://s17.postimg.org/9wvuqfb5b/Asset_1_3x.png' alt='create-badge' />
</div></Link>
<Link to='/post' style={{ textDecoration: 'none' }} ><div className="title-nav">
<img className='profile-icon' src='https://s1.postimg.org/8ozuzr6qof/nav_Asset_2_3x.png' alt='create-badge' />
</div></Link>

{/* <Link to='/create' style={{ textDecoration: 'none' }} ><div className="title-nav">
</div></Link> */}

<Link to='/notifications' style={{ textDecoration: 'none' }} ><div className="title-nav">
{ invitesNotification >= 1 ?
<div className='notification-alert'></div> : <div></div>
}
<img className='notifications-icon' src='https://s1.postimg.org/36umzp5ca7/mail_Asset_4_3x.png' alt='Notify Me Baby' />
</div></Link>
{/* <Link to='/login' style={{ textDecoration: 'none' }} > <div className="title-nav">Login</div></Link> */}
<Link to={`/profile/${this.props.currentUserId}`} style={{ textDecoration: 'none' }} ><div onClick={() => {window.location.reload()}} className="title-nav">
<img className='profile-icon' src='https://s1.postimg.org/444r03ygwv/Asset_2_3x.png' alt='profile' />
</div></Link>
</div>




<div className="title-nav">
<div className="left-nav-align">
<Link to='/'><img className='alpha-logo' 
src='https://s1.postimg.org/8hkxcmvqy7/badger_googlefix.png' alt='ALPHA' />
</Link>
</div>
</div>

<div className="right-nav-align">
<Link to='/post' style={{ textDecoration: 'none' }} ><div className="title-nav">
<img className='profile-icon' src='https://s1.postimg.org/8ozuzr6qof/nav_Asset_2_3x.png' alt='create-badge' />
</div></Link>

{/* <Link to='/create' style={{ textDecoration: 'none' }} ><div className="title-nav">
</div></Link> */}

<Link to='/notifications' style={{ textDecoration: 'none' }} ><div className="title-nav">
<img className='notifications-icon' src='https://s1.postimg.org/36umzp5ca7/mail_Asset_4_3x.png' alt='Notify Me Baby' />
</div></Link>
{/* <Link to='/login' style={{ textDecoration: 'none' }} > <div className="title-nav">Login</div></Link> */}
<Link to='/profile' style={{ textDecoration: 'none' }} ><div className="title-nav">
<img className='profile-icon' src='https://s1.postimg.org/444r03ygwv/Asset_2_3x.png' alt='profile' />
</div></Link>
</div>
</nav>
</header>
</div>
    )
  }
}

function mapStateToProps( state ) {
  const {currentUserId,  userInvites } = state;

  return {
    
    currentUserId,
    userInvites,
    
    
  };
}

export default connect( mapStateToProps, {getUserInvites, getCurrentUser})( Navbar ); 