import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Newsfeed.css'
import {getPosts, getCurrentUser, getFollowing, getFollowers} from '../../ducks/reducer';

class Newsfeed extends Component {
constructor(props){
    super(props)

    this.state = {
        posts: this.props.posts,
        currentUserId: this.props.currentUserId,
        likes:this.props.likes
    }
    this.getFollowing = this.getFollowing.bind(this);
    this.getFollowers = this.getFollowers.bind(this);
    this.addLikes=this.addLikes.bind(this);
}

componentDidMount(){
    this.props.getPosts()
    this.props.getCurrentUser()
    
}
componentWillReceiveProps(nextProps){
    this.setState({
        currentUserId: nextProps.currentUserId
    })
}
getFollowing(){
    console.log(this.state.currentUserId)
    this.props.getFollowing(this.state.currentUserId)
}
getFollowers(){
    this.props.getFollowers(this.state.currentUserId)
}
addLikes(i){
    this.props.posts[i].likes=this.props.posts[i].likes + 1
    
    console.log(this.props.posts[i].id, this.props.posts[i].likes)
    axios.post('/api/addlike', {
        badgeId: this.props.posts[i].id,
        likes: this.props.posts[i].likes
    }).then((response)=>{
    this.props.getPosts()
    })
    
}

render() {

console.log('props', this.props)
console.log(this.state)
let followers = this.props.currentUserFollowers.map((user, i) => {
    return(
        <div key={i}>
            {user.username} & <img src={user.picture} />
        </div>
    )
})
let following = this.props.currentUserFollowing.map((user, i) => {
    return(
        <div key={i}>
            {user.username}
        </div>
    )
})
let posts = this.props.posts.map((post, i) => {
    return(
        <div key={i}>
            <div className='postBorder'>
                <img className='imageSize' src={post.logo}/> title: {post.title}  Description: {post.description} <img className='imageSize' src={post.content}/>
                <button onClick={()=>{this.addLikes(i)}}>Like</button> {this.props.posts[i].likes}
            </div>

        </div>
    )
})

        return (
            <div>
                The Newsfeed Component
                <button onClick={this.getFollowing}>GET FOLLOWING INFO</button>
                <button onClick={this.getFollowers}>GET FOLLOWERS</button>
                {followers}
                {following}
                {posts}
            </div>
        );
    }
}

function mapStateToProps( state ) {
    const { posts, currentUserId, currentUserFollowing, currentUserFollowers } = state;
  
    return {
      posts,
      currentUserId,
      currentUserFollowing,
      currentUserFollowers,
    };
  }
  
  export default connect( mapStateToProps, {getPosts, getCurrentUser, getFollowing, getFollowers})( Newsfeed ); 