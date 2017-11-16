import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                Login Page
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <a href={process.env.SERVERHOST}>
                    <button>Login</button>
                    </a>
                 
                </div>
            </div>
        );
    }
}

export default Login;