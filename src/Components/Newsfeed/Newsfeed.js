import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Newsfeed.css';
import Modal from 'react-modal'
import {Link} from 'react-router-dom'
import {getPosts, getCurrentUser, getFollowingFeed, followUser} from '../../ducks/reducer';
import addone from '../../utiliy/addone';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 :  '375px',
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
        followingFeed: this.props.followingFeed,
        display:'true',
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
    this.state.posts[i].likes=this.state.posts[i].likes + addone();

    // console.log(this.props.posts[i].id, this.props.posts[i].likes)
    axios.post('/api/addlike', {
        badgeId: this.state.posts[i].uniquebadgeid,
        likes: this.state.posts[i].likes
    }).then((response)=>{
    this.props.getPosts()
    })
    axios.post('api/tracklikes',{
        badgeId: this.state.posts[i].uniquebadgeid,
        userId:this.state.currentUserId
    })
    this.setState({display:'none'})
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
    const buttonDisplay={display:this.state.display};
console.log('props', this.props)
console.log("STATE", this.state)
let comments = this.state.comments.map((comment, i) => {
    return(
        <div key={i}>
            <div className='postBorder'>
                <div className='comment-author-wrapper'>
                <img className='profile-pic' src={comment.picture} alt='hi' />
                <div className='username-comments'>{comment.username} </div>
                {/* <p>{comment.comments}</p> */}
                </div>
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
      likeButtonType= <button className="like-button"  onClick={()=>{this.addLikes(i)}}>Unlike</button>
      console.log("unlike",this.state.likes.userid, this.props.currentUserId)
    } else {
        likeButtonType=< button className="like-button" style={buttonDisplay} onClick={()=>{this.addLikes(i)}}>Like</button>
      console.log("like",this.state.likes.userid, this.props.currentUserId)
    }
    return(

<div key={i} className='badge-post-wrapper'>
<Link to={`/group/${post.origin_id}`} >
<div className='badge-group-header'>
<div className='post-padding-wrapper'>
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
</div>
</Link>

<div className='badge-content'>
<img 
className='badge-image' 
src={post.content} 
alt='content' 
onClick={()=>{this.addLikes(i)}}
/>
</div>

<div className='badge-footer-wrapper'>
<Link to={`/profile/${post.uniqueuserid}`}>
<div className='badge-post-interaction'>
<div className='post-padding-wrapper'>
<div className='left-header'>
<div className='badge-icon'>
<button className='follow' onClick={ () => {this.props.followUser(this.props.currentUserId, post.uniqueuserid)}}
        > follow</button>  
<img 
className='badge-icon-image' 
src={post.picture} 
alt='content' 
/>
</div>  
<div className='badge-name'>
{post.username}
</div>  
</div>
</div>
</div>
</Link>
<div className='badge-caption'>
<div className='post-padding-wrapper'>
<div className='caption'>
{post.description}
</div>
</div>
</div>
<div className='divider'></div>
<div className='like-comment'>
<div className='like-comment-wrapper'>
<div className='post-padding-wrapper'>
<div>
<img 
className='like' 
src='https://s1.postimg.org/7kwqmgofz3/like_Asset_10_3x.png' 
alt='content' 
onClick={()=>{this.addLikes(i)}}
/>
</div>
<div className="like-number">{this.props.followingFeed[i].likes}</div>
<div><img 
className='comment' 
src='https://s1.postimg.org/9cpphd3ijj/comment_Asset_11_3x.png' 
alt='content'
onClick={()=>{this.addCommentButton(i, post.id); this.getComments(post.id)}}
/></div>
</div>
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
console.log('SOME PROPS!',this.props)
console.log('SOME STATE!',this.state)
// =============================================================================
// Body
// =============================================================================
        return (
<div className='news-feed-wrapper'>


{posts}
<Modal isOpen={this.state.modalIsOpen}
onAfterOpen={this.afterOpenModal}
onRequestClose={this.closeModal}
style={customStyles}
contentLabel="Example Modal">
<img className='imageSize' src={this.state.posts[0] ? this.state.posts[this.state.selectedPostIndex].content : 'loading'}alt='OH HEY MAN' />
<h2 ref={subtitle => this.subtitle = subtitle}></h2>

<div className='badge-footer-wrapper'>
<div className='badge-post-interaction'>
<div className='post-padding-wrapper'>
<div className='left-header'>
<div className='badge-icon'>
<img className='badge-icon-image' src={this.state.posts[0] ? this.state.posts[this.state.selectedPostIndex].picture : 'loading'} alt='content' />
</div>  
<div className='badge-name'>
{this.state.posts[0] ? this.state.posts[this.state.selectedPostIndex].username : 'loading'}
</div>  
</div>
</div>
</div>
<div className='badge-caption'>
<div className='caption'>
{this.state.posts[0] ? this.state.posts[this.state.selectedPostIndex].description : 'loading'}
</div>
</div>
</div>
{comments}
<div className='comment-wrapper'>
<input className='comment-input' value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}}></input>
<div className='comment-button' onClick={() => {this.postComment(); this.getComments(this.state.selectedPostId)}}>Comment</div>
</div>
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
  
  export default connect( mapStateToProps, {getPosts, getCurrentUser, getFollowingFeed, followUser})( Newsfeed ); 