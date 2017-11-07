import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getCurrentUser, getFollowing, getFollowers, followUser, getSingleUser, getAllBadgeGroups} from './../../ducks/reducer';
import axios from 'axios';
import {connect} from 'react-redux';


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
    axios.get('/api/user').then((response)=>{
        this.setState({
            currentUser:response.data
    })
    this.props.getAllBadgeGroups(this.state.currentUser.id) //TEMP TEST WILL PLACE SOMEWHERE ELSE
    }); 
    this.getFollowers() 
    console.log('look at this',this.props.currentUserFollowers.length)
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
            <img src={badges.content} alt=''/>
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
            <img src={this.state.currentUser.picture} alt='hi'/>
        </div>
        <div>
        Followers {this.props.currentUserFollowers.length}
        {/* /* {console.log('this is the followers ',this.state.followerAmount)} */ }
        {console.log('this is the followers ',this.props.currentUserFollowers.length)}
             <button onClick={this.getFollowing}>Following</button>
            {following}
            <button onClick={this.getFollowers}>Followers</button>
            {followers}
        </div>
        { allGroups }
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