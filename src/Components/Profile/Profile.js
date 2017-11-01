import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getCurrentUser} from './../../ducks/reducer';
import axios from 'axios';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            value:'',
            currentUser:[]}
    }
    componentDidMount(){
        axios.get('/api/user').then((response)=>{
            console.log('your user info is: ',response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
            this.setState({
                currentUser:response.data
            })
          });
    }
    render() {

        return (
            <div>
                <div>
                Profile Page
                <Link to='/home'>
                <button>Home</button>
                </Link>
                </div>    
                <div>
                   Welcome, {this.state.currentUser.username}!
                </div>
                <div>
                    <img src={this.state.currentUser.picture}/>
                </div>
            </div>
        );
    }
}

export default Profile;