import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getCurrentUser, getFollowing, getFollowers, followUser, getSingleUser, getAllBadgeGroups} from './../../ducks/reducer';
import axios from 'axios';
import {connect} from 'react-redux';
import './Profile.css'


class Profile extends Component {
constructor(props){
super(props);
    this.state={
    value:'',
    currentUser:[],
    followerAmount:this.props.currentUserFollowers.length
}
this.getFollowing = this.getFollowing.bind(this);
this.getFollowers = this.getFollowers.bind(this);
}

componentDidMount(){
    this.props.getCurrentUser()
    
    axios.get('/api/user').then((response)=>{
        this.setState({
            currentUser:response.data
            
    })
    this.props.getAllBadgeGroups(this.state.currentUser.id) //TEMP TEST WILL PLACE SOMEWHERE ELSE
   this.getFollowers()
   this.getFollowing() }); 
    
    
    console.log('look at this',this.props.currentUserFollowers.length)
    console.log('user flollowing', this.props.currentUserFollowing.length)
}
// getAllBadgeGroups() {
//     this.props.getAllBadgeGroups(30)
// }
getFollowing(){
    this.props.getFollowing(this.state.currentUser.id)
}
getFollowers(){
    this.props.getFollowers(this.state.currentUser.id)
}

getUser(id){
    this.props.getSingleUser(id)
    this.setState({
        currentUser: this.props.singleUser
    })
}


render() {
    console.log('HUNGRY AF', this.props.allBadgeGroups);
let allGroups = this.props.allBadgeGroups.map((badges, i) =>{
        return(
        <div key={i}>
           <img className='badges-content-image' src={badges.content} alt='' />
        </div>
    )

})
let followers = this.props.currentUserFollowers.map((user, i) => {
   
        return(
            <div>
            <div key={i}>
                {user.username}
                 
            </div>
            </div>
        )
    })

let following = this.props.currentUserFollowing.map((user, i) => {
    return(
    <div key={i}>
        
        <div><p>{user.username}</p></div>
        <button
        onClick={ () => {this.getUser(user.id)}}
        >Profile</button>
        <div>
        <button className='follow' onClick={ () => {this.props.followUser(this.state.currentUser.id, user.id)}}
        > follow</button>  
        </div>
    </div>
        )
    })
    return (
<div className='profile-wrapper'>
    <div className='profile-header'></div>
    <div className='profile-left'></div>
    <div className='profile-right'></div>
    <div className='profile-info'>
        <div className='follow-profile-wrapper'>
        <div className='follow-wrapper'>
            <div className='follow-number'>{this.props.currentUserFollowing.length}</div>
        <div className='follow-header'>FOLLOWING</div>
        </div>
    <img className='main-profile-icon' src={this.state.currentUser.picture} alt='icon' />
        <div className='follow-wrapper'>
        <div className='follow-number'>{this.props.currentUserFollowers.length}</div>
        <div className='follow-header'>FOLLOWERS</div>
        </div>
        </div>
        <div className='title-username-profile-wrapper'>
            <div className='username'>{this.state.currentUser.username}</div>
            <div className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, harum!</div>
        </div>
        <div className='follow-padding'>
        {/* <div className='follow-button'>FOLLOW</div> */}
        {/* <div className='edit-button'>EDIT PROFILE <img className='settings-icon' src='https://s1.postimg.org/24t5bnkfy7/settings_white_Asset_6_3x.png' alt='icon' />
        </div> */}
        </div>
    </div>
    <div className='profile-showcase'><div className='showcase-text'>SHOWCASE</div>
    <div className='showcase-flex'>
        <img className='showcase-badge-icon' src='http://icons.iconarchive.com/icons/seanau/fresh-web/512/Badge-icon.png' alt='icon' />
        <img className='showcase-badge-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Circle-icons-trophy.svg/1024px-Circle-icons-trophy.svg.png' alt='icon' />
        <img className='showcase-badge-icon' src='https://d3dzkvk4v33mce.cloudfront.net/assets/badge-list-icon-7bcb4445fa28a0231b1f64c3b177be4a9ce216ac11d570ceeadb292f61ef4688.png' />
        <img className='showcase-badge-icon' src='https://nexusipe-resource-exchange.s3.amazonaws.com/pictures/commentator_l1_large.png' />
        <img className='showcase-badge-icon' src='https://i.pinimg.com/736x/7a/89/9a/7a899a3a256febe4154f0658f968d4e6--friend-birthday-th-birthday.jpg' alt='icon' />
    </div>
    </div>
    <div className='profile-filter'>
        <div className='filter-flex'>
        <img className='filter-badge-icon' src='https://s1.postimg.org/401n421t9r/badges_Asset_3_3x.png' alt='icon' />
        <img className='filter-badge-icon' src='https://s1.postimg.org/3hyu1b2acf/photo_grid_Asset_1.png' />
        <img className='filter-badge-icon' src='https://s1.postimg.org/7qe1b508wv/newsfeed_Asset_2_3x.png' />
        <img className='filter-badge-icon' src='https://s1.postimg.org/56kycnp04v/groups_Asset_4_3x.png' alt='icon' />
        </div>
    </div>
    <div className='profile-content'>{allGroups}</div>
    <div className='profile-footer'></div>
</div>
    );
}
}

function mapStateToProps( state ) {
    const { currentUser, currentUserFollowing, currentUserFollowers, singleUser, allBadgeGroups } = state;

    return {
      currentUser,
      singleUser,
      currentUserFollowers,
      currentUserFollowing,
      allBadgeGroups,
    };
  }

export default connect( mapStateToProps, {getCurrentUser, getFollowing, getFollowers, followUser, getSingleUser, getAllBadgeGroups })(Profile);