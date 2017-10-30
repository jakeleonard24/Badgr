import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PostPage extends Component {
    render() {
        return (
            <div>
                PostPage
                <Link to='/home'>
                <button>Home</button>
                </Link>
            </div>
        );
    }
}

export default PostPage;