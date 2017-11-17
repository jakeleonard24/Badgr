import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed'
import { SearchService } from './search-service';
import { getUserInvites, joinBadgeGroup, getNewBadgeGroupFeed, getPosts, getCurrentUser, getFollowingFeed, followUser} from '../../ducks/reducer';
import {connect} from 'react-redux';
import './Home.css';

class Home extends Component {
    constructor() {
        super();
        
        this.searchService = new SearchService();
        this.state = {results: []};
      }
      componentDidMount() {
        this.props.getPosts()
        this.props.getCurrentUser().then( () => {
        this.props.getFollowingFeed(this.props.currentUserId)
            }).then( () => {
              this.props.getUserInvites(this.props.currentUserId)
            })
        

        this.searchService
            .getResults()
            .subscribe(res => {
              this.setState({results: res});
            });
      }
      search(event) {
        this.searchService.search({value: event.target.value.trim()});
      }
    render() {
const buttonDisplay={display:this.state.display};
let posts = this.props.posts.map((post, i) => {
    if(post.type === 'complete') {
    var likeButtonType=null
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
<div key={post.title}>
<div className='newsfeed-user-header'>
<div className='newsfeed-wrapper'>
<div className='newsfeed-left-header'>

<div className='newsfeed-user-icon'>
<a href={`/#/profile/${post.id}`}><img className='newsfeed-image' src={post.picture} alt='content' /></a>
</div>  
<div className='newsfeed-name'>
{post.username}
</div>  
</div>
</div>
<div className='newsfeed-right-header'>
<div className='newsfeed-follow-padding'>
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
</div>
<div className="like-number"></div>
<div>
</div>
</div>
</div> 
</div>
</div>
</div>
  )
}  
if(post.type === 'create') {
  return (
        <div key={i}>
        <div className='creator-container'>  

        <div className='creator-container-padding'>
        {post.username} has created a badge
        </div>
        </div>
         <div className='badge-group-badge-group-header'>
        <div className='badge-group-post-padding-wrapper'>
        <div className='badge-group-left-header'>
        
        <div className='badge-group-badge-icon'>
        <img className='badge-group-badge-icon-image' src={post.logo} alt='content' />
        </div>  
        <div className='badge-group-badge-name'>
        {post.title}
        </div>  
        </div>
        </div>
        <div className='group-right-header'>
        <div className='group-join-padding'>
        </div>
        </div>
        </div>         
        <div className='badge-newsfeed-description'>  

        <div className='badge-newsfeed-description-padding'>
        {post.description}
        </div>
        </div>
        </div>
  )
}

})
    
let searchResults = this.state.results.map((res, i) => {
console.log('fuck', res.username)
return <div key={i}>
      <div key={res.title}>
      <div className='search-user-header'>
      <div className='search-wrapper'>
      <div className='search-left-header'>

      <div className='search-user-icon'>
      <a href={`/#/profile/${res.id}`}><img className='search-image' src={res.picture} alt='content' /></a>
      </div>  
      <div className='search-name'>
      {res.username}
      </div>  
      </div>
      </div>
      <div className='search-right-header'>
      <div className='follow-padding'>
      <div onClick={ () => {this.props.followUser(this.props.currentUserId, res.id)}} className='follow-button-head' >
        Follow
      </div>
      </div>
      </div>
      </div>   
      </div>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem vitae optio ipsa tempore eum ea!
    </div>  
        });
        console.log('hi', this.props.currentUserId);
        return (
          
          <div>
          <div className='search-title-wrapper'>
          <input onChange={this.search.bind(this)} className='search-user' type="text" placeholder='Search for new friends!'/>
          </div>
          <div>{searchResults}</div>
           
          <div>
          <div className='home-content-wrapper'>
          <div className='home-left-margin'></div>
          <div className='home-right-margin'></div>
          <div className='home-news-feed'> {this.props.currentUserId ? (<Newsfeed></Newsfeed>) : (<div>{posts}</div>)}</div>
          </div></div>
            
          </div>
            
        );
    }
}

function mapStateToProps( state ) {
  const { userInvites, badgeJoin, posts, currentUserId, currentUserFollowing, currentUserFollowers, followingFeed, badgePost } = state;

  return {
    posts,
    currentUserId,
    currentUserFollowing,
    currentUserFollowers,
    followingFeed,
    badgePost,
    badgeJoin,
    userInvites,
  };
}

export default connect( mapStateToProps, { getUserInvites, joinBadgeGroup, getNewBadgeGroupFeed, getPosts, getCurrentUser, getFollowingFeed, followUser})( Home ); 