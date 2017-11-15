import React, { Component } from 'react'
import { SearchService } from './search-service';
import './Search.css';
import { getNewBadgeGroupFeed, getPosts, getCurrentUser, getFollowingFeed, followUser} from '../../ducks/reducer';
import {connect} from 'react-redux';

class Search extends Component {
  constructor() {
    super();
    this.searchService = new SearchService();
    this.state = {results: []};
  }
  componentDidMount() {
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
let searchResults = this.state.results.map((res, i) => {
  console.log('why work half the time tho', res.username)
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

          </div>   
  });
    return (
      <div>
          <div className='search-title-wrapper'>
          <input onChange={this.search.bind(this)} className='search-user' type="text" placeholder='Search for new friends!'/>
          </div>
          {searchResults}
      </div>
    )
  }
}

function mapStateToProps( state ) {
  const { posts, currentUserId, currentUserFollowing, currentUserFollowers, followingFeed, badgePost } = state;

  return {
    posts,
    currentUserId,
    currentUserFollowing,
    currentUserFollowers,
    followingFeed,
    badgePost,
  };
}

export default connect( mapStateToProps, { getNewBadgeGroupFeed, getPosts, getCurrentUser, getFollowingFeed, followUser})( Search ); 
