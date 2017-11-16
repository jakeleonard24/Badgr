import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                Login Page
                <div>
                    <br/>
                    <a href={`/auth`}> 
                    <button>Login</button>
                    </a>
                 
                </div>
            </div>
        );
    }
}

export default Login;