import React, { Component } from 'react';
import {connect} from 'react-redux';

import {getPosts} from '../../ducks/reducer'

class Newsfeed extends Component {
    constructor(props){
        super(props)

        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        this.props.getPosts()
    }
    render() {
        let posts = this.props.tasks.map((post, i) => {
            return(
                <div key={i}>
                    <div>
                        {post.logo}{post.title}{post.description}{post.content}
                    </div>

                </div>
            )
        })
        return (
            <div>
                The Newsfeed Component
            </div>
        );
    }
}

function mapStateToProps( state ) {
    const { posts } = state;
  
    return {
      posts
    };
  }
  
  export default connect( mapStateToProps, {getPosts})( Newsfeed ); 