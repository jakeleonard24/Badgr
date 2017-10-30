import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component {
    render() {
        return (
            <div>
                Profile Page

                <Link to='/home'>
                <button>Home</button>
                </Link>
            </div>
        );
    }
}

export default Profile;