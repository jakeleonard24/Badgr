import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class NotificationsView extends Component {
    render() {
        return (
            <div>
                Notifications Page

                <Link to='/home'>
                <button>Home</button>
                </Link>
            </div>
        );
    }
}

export default NotificationsView;