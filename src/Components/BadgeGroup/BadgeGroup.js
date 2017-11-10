import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getPosts, getCurrentUser, getFollowingFeed, getSingleBadge} from '../../ducks/reducer';

import './BadgeGroup.css'
// import {Link} from 'react-router-dom';

class BadgeGroup extends Component {
    constructor(){
        super()

        this.state = {

        }
    }

    componentDidMount() {
        this.props.getSingleBadge(this.props.match.params.id)
      }
    render() {
        console.log(this.props)
        return (
            <div>
            <div>
                {/* <div><img src={this.props.singleBadge[0] ? this.props.singleBadge[0].logo : ''} /></div>
                <div>{this.props.singleBadge[0] ? this.props.singleBadge[0].title : ''}</div> */}
                
            </div>
    <div className='bg-profile-wrapper'>
    <div className='bg-profile-header'></div>
    <div className='bg-profile-left'></div>
    <div className='bg-profile-right'></div>
    <div className='bg-profile-info'>
        <div className='bg-title-username-profile-wrapper'>
        <img className='bg-main-profile-icon' src='http://icons.iconarchive.com/icons/seanau/fresh-web/512/Badge-icon.png' alt='icon' />
            <div className='bg-username'>BADGE GROUP</div>
            <div className='bg-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, harum!</div>
        </div>
        <div className='bg-follow-padding'>
        {/* <div className='follow-button'>FOLLOW</div> */}
        {/* <div className='edit-button'>EDIT PROFILE <img className='settings-icon' src='https://s1.postimg.org/24t5bnkfy7/settings_white_Asset_6_3x.png' alt='icon' />
        </div> */}
        </div>
    </div>
    <div className='bg-profile-showcase'>
    {/* <div className='bg-showcase-text'>JOIN GROUP</div> */}
    <div className='bg-follow-padding'>
        <div className='bg-join-button'>JOIN BADGE</div>
        {/* <div className='edit-button'>LEAVE BADGE <img className='settings-icon' src='https://s1.postimg.org/24t5bnkfy7/settings_white_Asset_6_3x.png' alt='icon' />
        </div> */}
        </div>
    </div>
    <div className='bg-profile-filter'>
        <div className='bg-filter-flex'>
        <img className='bg-filter-badge-icon' src='https://s1.postimg.org/7lys2r10xr/newsfeed_Asset_2_3x.png' alt='icon' />
        <img className='bg-filter-badge-icon' src='https://s1.postimg.org/77scbvvq3j/members_Asset_7_3x.png' />
        <img className='bg-filter-badge-icon' src='https://s1.postimg.org/55cjnu17nz/comment_Asset_9_3x.png' />
        </div>
    </div>
    <div className='bg-profile-content'></div>
    <div className='bg-profile-footer'></div>
</div>
</div>
        );
    }
}

function mapStateToProps( state ) {
    const { posts, currentUserId, currentUserFollowing, currentUserFollowers, followingFeed, singleBadge } = state;
  
    return {
      posts,
      currentUserId,
      currentUserFollowing,
      currentUserFollowers,
      followingFeed,
      singleBadge,
    };
  }
  
  export default connect( mapStateToProps, {getPosts, getCurrentUser, getFollowingFeed, getSingleBadge})( BadgeGroup ); 