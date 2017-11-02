import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getCurrentUser, getFollowing, followUser} from './../../ducks/reducer';
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
        console.log('your user info is: ',response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
        this.setState({
            currentUser:response.data
    })
    });   
}

getFollowing(){
    this.props.getFollowing(this.state.currentUser.id)
}

render() {
let following = this.props.currentUserFollowing.map((user, i) => {
    return(
    <div  key={i}>
        {user.username}
        <div>
        <button className='add-cart-button' onClick={ () => {this.props.followUser(this.state.currentUser.id, user.id)}}
        > FOLLOW</button>  
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
    const { currentUser, currentUserFollowing } = state;

    return {
      currentUser,
      currentUserFollowing,
    };
  }

export default connect( mapStateToProps, {getCurrentUser, getFollowing, followUser})(Profile);