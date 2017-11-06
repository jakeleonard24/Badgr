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
        like:this.props.like,
        likes:[],
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
    this.state.posts[i].likes=this.state.posts[i].likes + 1;

    // console.log(this.props.posts[i].id, this.props.posts[i].likes)
    axios.post('/api/addlike', {
        badgeId: this.state.posts[i].id,
        likes: this.state.posts[i].likes
    }).then((response)=>{
    this.props.getPosts()
    })
    axios.post('api/tracklikes',{
        badgeId: this.state.posts[i].id,
        userId:this.state.currentUserId
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

findOutIfLiked(){
    console.log('running')
    axios.get('/api/tracklikes/').then((response) => {
        console.log(response.data)
        this.setState({
            likes: response.data
        })
    })

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
console.log(this.props.followingFeed);
let posts = this.props.followingFeed.map((post, i) => {
    var likeButtonType=null
    if(this.state.likes.userid==this.props.currentUserId){
      likeButtonType= <button className="like-button" onClick={()=>{this.addLikes(i)}}>Unlike</button>
      console.log("unlike",this.state.likes.userid, this.props.currentUserId)
    } else {
        likeButtonType=< button className="like-button" onClick={()=>{this.addLikes(i)}}>Like</button>
      console.log("like",this.state.likes.userid, this.props.currentUserId)
      
    }
    return(

            <div key={i} className='badge-post-wrapper'>
            <div className='badge-group-header'>
                <div className='left-header'>
                  <div className='badge-icon'>
                  <img className='badge-icon-image' src={post.logo} alt='content' />
                 </div>  
                  <div className='badge-name'>
                  {post.title}
                </div>  
                </div>
                <div className='right-header'>
            
                </div>
            </div>


            <div className='badge-content'>
                <img className='badge-image' src={post.content} alt='content' />
            </div>

            <div className='badge-footer-wrapper'>
            <div className='badge-post-interaction'>
            <div className='left-header'>
                  <div className='badge-icon'>
                  <img className='badge-icon-image' src={post.logo} alt='content' />
                 </div>  
                  <div className='badge-name'>
                  {post.username}
                </div>  
                </div>
            </div>
            <div className='badge-caption'>
                <div className='caption'>
                {post.description}
                </div>
            </div>
            {/* <hr className='divider'/> */}
            <div className='like-comment'>
                <div className='like-comment-wrapper'>
            <img 
            className='like' 
            src='https://s1.postimg.org/5s41055u5r/like.png' 
            alt='content' 
            onClick={()=>{this.addLikes(i)}}
            />
            <div className="like-number">{this.props.followingFeed[i].likes}</div>
            <img 
            className='like' 
            src='https://s1.postimg.org/9l0au19msf/comment.png' 
            alt='content'
            onClick={()=>{this.addCommentButton(i, post.id); this.getComments(post.id)}}
             />
                </div>
            </div>

            </div>
            </div>



        
/* <div key={i}>
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
{likeButtonType} 
<button className="like-button" onClick={()=>{this.addLikes(i)}}>Unlike</button> 
<button className="like-button" onClick={()=>{this.addLikes(i)}}>Like</button>  
<div className="like">{this.state.posts[i].likes}</div> 
<button className="like-button" onClick={()=>{this.addLikes(i)}}>Like</button> 
<div className="like">{this.props.followingFeed[i].likes}</div>
<button className="comment-button" onClick={()=>{this.addCommentButton(i, post.id); this.getComments(post.id)}}>Add Comment</button>
</div>
</div>
</div> */

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