import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getPosts, getCurrentUser, getFollowingFeed, getSingleBadge} from '../../ducks/reducer';


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
                Badge Group Page

                <Link to='/home'>
                <button>Home</button>
                </Link>

                <div><img src={this.props.singleBadge[0] ? this.props.singleBadge[0].logo : ''} /></div>
                <div>{this.props.singleBadge[0] ? this.props.singleBadge[0].title : ''}</div>
                
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