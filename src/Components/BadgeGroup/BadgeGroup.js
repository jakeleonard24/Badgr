import React, { Component } from 'react';
import {connect} from 'react-redux';
import Newsfeed from '../Newsfeed/Newsfeed'
import {getPosts, getCurrentUser, getFollowingFeed, getSingleBadge} from '../../ducks/reducer';
import './BadgeGroup.css'
import axios from 'axios';
import {Link} from 'react-router-dom';

class BadgeGroup extends Component {
    constructor(){
        super()

        this.state = {
            view: 'newsfeed',
            userPosts:[]
        }
    }

    componentDidMount() {
        this.props.getCurrentUser()
        this.props.getSingleBadge(this.props.match.params.id)
        axios.get(`/api/userposts/${this.props.match.params.id}`).then((response) => {
            this.setState({userPosts: response.data}) 
         })
      }
    render() {
        
       let members = 'no members'
       if(this.props.singleBadge[0]) {
      members = this.props.singleBadge.map((user, i) => {
            return(
                <Link to={`/profile/${user.uniqueuserid}`}>
                <div className='jakesBorderClassLOL' key={i}>
                    <div>
                        <img className='bg-main-profile-icon' src={user.picture} alt='picture' />
                        <p>{user.username}</p>
                    </div>
                </div>
                </Link>
            )
        })
    }
    
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
        <img className='bg-main-profile-icon' src={this.props.singleBadge[0] ? this.props.singleBadge[0].logo : 'http://icons.iconarchive.com/icons/seanau/fresh-web/512/Badge-icon.png'} alt='icon' />
            <div className='bg-username'>BADGE GROUP</div>
            <div className='bg-description'>{this.props.singleBadge[0] ? this.props.singleBadge[0].description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, harum!'}</div>
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

        </div>
    </div>
    <div className='bg-profile-filter'>
        <div className='bg-filter-flex'>
        <img onClick={() => {this.setState({view: 'newsfeed'})}} className='bg-filter-badge-icon' src='https://s1.postimg.org/7lys2r10xr/newsfeed_Asset_2_3x.png' alt='icon' />
        <img onClick={() => {this.setState({view: 'members'})}} className='bg-filter-badge-icon' src='https://s1.postimg.org/77scbvvq3j/members_Asset_7_3x.png' alt='' />
        <img onClick={() => {this.setState({view: 'chat'})}} className='bg-filter-badge-icon' src='https://s1.postimg.org/55cjnu17nz/comment_Asset_9_3x.png' alt='' />
        </div>
    </div>
    <div className='bg-profile-content'></div>
    <div className={this.state.view === 'newsfeed' ? 'bg-profile-content' : 'noShow'}><Newsfeed></Newsfeed></div>
    <div className={this.state.view === 'members' ? 'bg-profile-content' : 'noShow'}>{members}</div>
    <div className={this.state.view === 'chat' ? 'bg-profile-content' : 'noShow'}>chat</div>
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
  
  export default connect( mapStateToProps, { getPosts, getCurrentUser, getFollowingFeed, getSingleBadge})( BadgeGroup ); 