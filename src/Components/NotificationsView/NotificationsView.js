import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {getUserInvites, getCurrentUser} from '../../ducks/reducer';
import './NotificationsView.css' 

class NotificationsView extends Component {
    constructor(props){
        super(props)

        this.acceptChallenge = this.acceptChallenge.bind(this);
        this.declineChallenge = this.declineChallenge.bind(this);
    }

    componentDidMount(){
       
            this.props.getUserInvites(this.props.currentUserId)
                
    }

    acceptChallenge(id, badgeId){
        axios.post('/api/response', {
            userId: id,
            badgeId: badgeId
        })

        axios.post('/api/group', {
            userId: id,
            badgeId: badgeId
        })

        this.props.getUserInvites(id)
    }

    declineChallenge(id, badgeId){
        axios.post('/api/response', {
            userId: id,
            badgeId: badgeId
        })

        this.props.getUserInvites(id)
    }

    

    render() {
        console.log('props', this.props)
        // console.log('state', this.state)

     let invites = this.props.userInvites.map((invite, i)=> {
            return(
                <div key={i}>
                    <p>{invite.username} challenged you to complete <img className='notificationImage' src={invite.logo} /> {invite.title}</p>
                    <button onClick={() => {this.acceptChallenge(this.props.currentUserId, invite.badge_id)}}>Accept</button><button onClick={() => {this.declineChallenge(this.props.currentUserId, invite.badge_id)}}>Decline</button>
                </div>
            )
        })
        return (
            <div>
                Notifications Page hi

                <Link to='/'>
                <button>Home</button>
                
                </Link>

                {invites} 
            </div>
        );
    }
}

function mapStateToProps( state ) {
    const {currentUserId, userInvites} = state;
  
    return {
      
      currentUserId,
      userInvites,
    };
  }
  
  export default connect( mapStateToProps, {getUserInvites, getCurrentUser})( NotificationsView ); 