import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Login extends Component {
    render() {
        return (
            <div>
                Login Page
                <div>
                    <Link to="/home">
                    <button>Login</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;