import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Login extends Component {
    render() {
        return (
            <div>
                Login Page
                <div>
                    <a href={process.env.REACT_APP_LOGIN}>
                    <button>Login</button>
                    </a>
                 
                </div>
            </div>
        );
    }
}

export default Login;