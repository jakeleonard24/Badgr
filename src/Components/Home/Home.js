import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed'
import { SearchService } from './search-service';
import { getNewBadgeGroupFeed, getPosts, getCurrentUser, getFollowingFeed, followUser} from '../../ducks/reducer';
import {connect} from 'react-redux';
import './Home.css'

class Home extends Component {
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

                  </div>  
        });
        return (
            <div>


            <div className='home-content-wrapper'>
            {/* <div className='home-header'>1</div> */}
            <div className='home-left-margin'></div>
            <div className='home-right-margin'></div>
            <div className='home-news-feed'><Newsfeed></Newsfeed></div>
            </div>
            <div>
              
            </div>

            <div className='search-title-wrapper'>
            <input onChange={this.search.bind(this)} className='search-user' type="text" placeholder='Search for new friends!'/>
            </div>
            {searchResults}
            </div>
        );
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

export default connect( mapStateToProps, { getNewBadgeGroupFeed, getPosts, getCurrentUser, getFollowingFeed, followUser})( Home ); 