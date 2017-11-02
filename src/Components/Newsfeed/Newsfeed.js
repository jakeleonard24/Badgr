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
            currentUserId: this.props.currentUserId
            
        }
        this.getFollowing = this.getFollowing.bind(this);
        this.getFollowers = this.getFollowers.bind(this)
    }

    componentDidMount(){
        // axios.get('/api/allposts').then((response) => {
        //     this.setState({
        //         posts: response.data
        //     })
        // })

        

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

    
    render() {
        console.log('props', this.props)
        console.log(this.state)
let followers = this.props.currentUserFollowers.map((user) => {
    return(
        <div>
            {user.username} & <img src={user.picture} />
        </div>
    )
})
let following = this.props.currentUserFollowing.map((user) => {
    return(
        <div>
            {user.username}
        </div>
    )
})

        let posts = this.props.posts.map((post, i) => {
            return(
                <div key={i}>
                    <div className='postBorder'>
                       <img className='imageSize' src={post.logo}/> title: {post.title}  Description: {post.description} <img className='imageSize' src={post.content}/>
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