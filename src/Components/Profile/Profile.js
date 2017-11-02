import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getCurrentUser, getFollowing, followUser,getSingleUser} from './../../ducks/reducer';
import axios from 'axios';
import {connect} from 'react-redux';


class Profile extends Component {
constructor(props){
super(props);
    this.state={
    value:'',
    currentUser:[]
}
    this.getFollowing = this.getFollowing.bind(this)
}

componentDidMount(){
    axios.get('/api/user').then((response)=>{
        this.setState({
            currentUser:response.data
    })
    });   
}

getFollowing(){
    this.props.getFollowing(this.state.currentUser.id)
}

getUser(id){
    this.props.getSingleUser(id)
    this.setState({
        currentUser: this.props.singleUser
    })
}


render() {
    console.log('DUDE',this.props);
    console.log('LOL',this.state);
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
    <div>
        <div>
        Profile Page
        <Link to='/'>
        <button>Home</button>
        </Link>
        </div>    
        <div>
            Welcome, {this.state.currentUser.username}!
        </div>
        <div>
            <img src={this.state.currentUser.picture}/>
        </div>
        <div>
            <div className='profileFollowingButton'> <button onClick={this.getFollowing}>Following</button>
        {following}</div>
        </div>
    </div>
    );
}
}

function mapStateToProps( state ) {
    const { currentUser, currentUserFollowing, singleUser } = state;

    return {
      currentUser,
      currentUserFollowing,
      singleUser,

    };
  }

export default connect( mapStateToProps, {getCurrentUser, getFollowing, followUser, getSingleUser})(Profile);