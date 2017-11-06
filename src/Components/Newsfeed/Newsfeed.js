import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Newsfeed.css';
import Modal from 'react-modal'
import {getPosts, getCurrentUser, getFollowingFeed} from '../../ducks/reducer';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Newsfeed extends Component {
constructor(props){
    super(props)

    this.state = {
        posts: [],
        currentUserId: this.props.currentUserId,
        modalIsOpen: false,
        selectedPostIndex: 0,
        selectedPostId: 0,
        comment: '',
        comments: [],
        likes:this.props.likes,
        followingFeed: this.props.followingFeed
    }
    this.closeModal = this.closeModal.bind(this);
    this.addCommentButton = this.addCommentButton.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.postComment = this.postComment.bind(this);
    this.addLikes=this.addLikes.bind(this);
    this.addCommentButton = this.addCommentButton.bind(this);
    this.getComments = this.getComments.bind(this);
}
componentDidMount(){
this.props.getCurrentUser().then( () => {
this.props.getFollowingFeed(this.props.currentUserId)
    })
}
componentWillReceiveProps(nextProps){
    this.setState({
        currentUserId: nextProps.currentUserId,
        posts: nextProps.followingFeed,
        
    })
}
addLikes(i){
    this.state.posts[i].likes=this.state.posts[i].likes + 1
    
    // console.log(this.props.posts[i].id, this.props.posts[i].likes)
    axios.post('/api/addlike', {
        badgeId: this.state.posts[i].id,
        likes: this.state.posts[i].likes
    }).then((response)=>{
    this.props.getPosts()
    })
}
addCommentButton(i, id){
    this.setState({
        modalIsOpen: true,
        selectedPostIndex: i,
        selectedPostId: id
    })
}
getComments(id){
    console.log('this ran', id)
    axios.get('/api/getcomments/' + id).then((response) => {
        this.setState({
            comments: response.data
        })
    })
}

afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#5BC3EB';
}
closeModal() {
    this.setState({modalIsOpen: false});
}
postComment(){
    if(this.state.comment.length > 0){
        axios.post('/api/addcomment', {
            comment: this.state.comment,
            userId: this.props.currentUserId,
            badgeId: this.state.selectedPostId
        })

        this.setState({
            comment: ''
        })
    } else {

    this.setState({
        comment: ''
    })
}
}

render() {
// console.log('props', this.props)
console.log("STATE", this.state)
let comments = this.state.comments.map((comment, i) => {
    return(
        <div key={i}>
            <div className='postBorder'>
                <img className='imageSize' src={comment.picture} alt='hi' />
                <p>{comment.username} : </p>
                <p>{comment.comments}</p>
            </div>
        </div>
    )
})
// =============================================================================
// Functions and stuff.
// =============================================================================
let posts = this.props.followingFeed.map((post, i) => {
    return(
        <div key={i}>
            <div className='badge-wrapper'>
            <div className='badge-header'>
            </div>
            <div className='badge-content'>
                <img className='post-image' src={post.content} alt='hi'/>
            </div>
            <div className='content-header'>
                <img className='badge-logo' src={post.logo} alt='hi'/>
                <div className='temp'>{post.title}</div>
                <div className='temp'>{post.description}</div>
            </div>
                <div className='like-comment'>
                <button className="like-button" onClick={()=>{this.addLikes(i)}}>Like</button> 
                <div className="like">{this.props.followingFeed[i].likes}</div>
                <button className="comment-button" onClick={()=>{this.addCommentButton(i, post.id); this.getComments(post.id)}}>Add Comment</button>
                </div>
                </div>
        </div>
    )
})
// =============================================================================
// Body
// =============================================================================
        return (
        <div>
        
            
            {posts}
            <Modal isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <h2 ref={subtitle => this.subtitle = subtitle}>Specific Post View</h2>
            <p>{this.state.posts[0] ? this.state.posts[this.state.selectedPostIndex].title : 'loading'}</p>
            <p>{this.state.posts[0] ? this.state.posts[this.state.selectedPostIndex].description : 'loading'}</p>
            <img className='imageSize' src={this.state.posts[0] ? this.state.posts[this.state.selectedPostIndex].content : 'loading'}alt='hi' />
            {comments}
            <textarea value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}}></textarea>
            <button onClick={() => {this.postComment(); this.getComments(this.state.selectedPostId)}}>Add Comment</button>
            </Modal>
        </div>
        );
    }
}

function mapStateToProps( state ) {
    const { posts, currentUserId, currentUserFollowing, currentUserFollowers, followingFeed } = state;
  
    return {
      posts,
      currentUserId,
      currentUserFollowing,
      currentUserFollowers,
      followingFeed,
    };
  }
  
  export default connect( mapStateToProps, {getPosts, getCurrentUser, getFollowingFeed})( Newsfeed ); 