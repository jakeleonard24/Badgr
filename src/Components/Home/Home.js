import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed'

class Home extends Component {
    render() {
        return (
            <div>

            <div>
                This is the Home Page
            </div>
                <Link to='/login'>
                <button>Login</button>
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
                <Newsfeed/>

                <br/>
                <Newsfeed></Newsfeed>

            </div>
        );
    }
}

export default Home;