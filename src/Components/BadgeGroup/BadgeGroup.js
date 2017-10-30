import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class BadgeGroup extends Component {
    render() {
        return (
            <div>
                Badge Group Page

                <Link to='/home'>
                <button>Home</button>
                </Link>
                
            </div>
        );
    }
}

export default BadgeGroup;