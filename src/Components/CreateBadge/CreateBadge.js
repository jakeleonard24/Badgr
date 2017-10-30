import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class CreateBadge extends Component {
    render() {
        return (
            <div>
                CreateBadge Page
                <div>
                    <Link to="/group">
                    <button>Group Page</button>
                    </Link>

                    <Link to='/home'>
                     <button>Home</button>
                     </Link>
                </div>
            </div>
        );
    }
}

export default CreateBadge;