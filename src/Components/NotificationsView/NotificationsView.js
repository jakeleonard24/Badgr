import React, { Component } from 'react';
import axios from 'axios';
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
                <div className='notify-badge-group-header'>
                <div className='notify-post-padding-wrapper'>
                <div className='notify-left-header'>
                
                <div className='notify-badge-icon'>
                <img className='notify-badge-icon-image' src={invite.logo} alt='content' />
                </div>  
                <div className='notify-badge-name'>
                {invite.title}
                {/* {invite.username} */}
                </div>  
                </div>
                </div>
                </div>   
                <div className='notify-right-header'>
                <div onClick={() => {this.acceptChallenge(this.props.currentUserId, invite.badge_id)}} className='notify-button-accept'>
                Accept
                </div>  
                <div onClick={() => {this.declineChallenge(this.props.currentUserId, invite.badge_id)}} className='notify-button-decline'>
                Decline
                </div>  
                </div>
                    {/* <p>{invite.username} challenged you to complete <img className='notificationImage' src={invite.logo} /> {invite.title}</p>
                    <button onClick={() => {this.acceptChallenge(this.props.currentUserId, invite.badge_id)}}>Accept</button><button onClick={() => {this.declineChallenge(this.props.currentUserId, invite.badge_id)}}>Decline</button> */}
                </div>
            )
        })
        return (
            <div>
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