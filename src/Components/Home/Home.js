import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed'

class Home extends Component {
    render() {
        return (
            <div>

            <div>
            </div>
                <Link to='/login'>
                <button>bob</button>
                </Link>
                <Link to='/create'>
                <button>Create Badge</button>
                </Link>

                <Link to='/post'>
                <button>Post Badge</button>
                </Link>

                <Link to='/profile'>
                <button>Profile</button>
                </Link>

                <Link to='/notifications'>
                <button>Notifications</button>
                </Link>

                <br/>
                <Newsfeed></Newsfeed>

            </div>
        );
    }
}

export default Home;