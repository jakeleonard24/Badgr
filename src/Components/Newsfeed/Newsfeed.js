import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Newsfeed.css'
import {getPosts, getCurrentUser} from '../../ducks/reducer';

class Newsfeed extends Component {
    constructor(props){
        super(props)

        this.state = {
            posts: this.props.posts,
            currentUserId: this.props.currentUserId
        }
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
    render() {
        console.log('props', this.props)
        console.log(this.state)
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
                {posts}
            </div>
        );
    }
}

function mapStateToProps( state ) {
    const { posts, currentUserId } = state;
  
    return {
      posts,
      currentUserId,
    };
  }
  
  export default connect( mapStateToProps, {getPosts, getCurrentUser})( Newsfeed ); 