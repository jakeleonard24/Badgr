import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getCurrentUser, getFollowing} from './../../ducks/reducer';
import axios from 'axios';
import {connect} from 'react-redux';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            value:'',
            currentUser:[]
            }
            this.getFollowing = this.getFollowing.bind(this)
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
    getFollowing(){
            console.log(this.state.currentUser.id)
            this.props.getFollowing(this.state.currentUser.id)
        }
    render() {
        let following = this.props.currentUserFollowing.map((user) => {
            return(
                <div>
                    {user.username}
                </div>
            )
        })

        return (
            <div>
                <div>
                Profile Page
                <Link to='/'>
                <button>Home</button>
                </Link>
                </div>    
                <div>
                   Welcome, {this.state.currentUser.username}!
                

                </div>
                <div>
                    <img src={this.state.currentUser.picture}/>
                </div>
                <div>
                    <div className='profileFollowingButton'> <button onClick={this.getFollowing}>Following</button>
                {following}</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps( state ) {
    const { currentUser, currentUserFollowing } = state;
  
    return {
      currentUser,
      currentUserFollowing,
    };
  }

  export default connect( mapStateToProps, {getCurrentUser, getFollowing})(Profile);