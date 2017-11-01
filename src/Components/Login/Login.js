import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Login extends Component {
    render() {
        return (
            <div>
                Login Page
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <a href={'http://localhost:3333/auth'}>
                    <button>Login</button>
                    </a>
                 
                </div>
            </div>
        );
    }
}

export default Login;