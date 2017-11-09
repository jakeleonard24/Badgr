import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getCurrentUser, getFollowers} from '../../ducks/reducer';
import {connect} from 'react-redux';
import './PostPage.css'

class PostPage extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            image:'',
            description:'',
            logo: '',
            logos: [],
            logoView: false,
            followerArray: [],
            challengeArray: [],
            badgeCreated: false,
            badgeId: ''
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.uploadSuccess = this.uploadSuccess.bind(this);
        this.createBadge = this.createBadge.bind(this);
        this.addToChallenged = this.addToChallenged.bind(this);
        this.removeFromChallenged = this.removeFromChallenged.bind(this);
        this.sendInvites = this.sendInvites.bind(this);
    }
     componentDidMount(){
         axios.get('/api/logos').then(response => {
            this.setState({
                logos: response.data
            })
         })
         this.props.getFollowers(this.props.currentUserId)
     }
     componentWillReceiveProps(nextProps){
         this.setState({
             followerArray: nextProps.currentUserFollowers
         })
     }
    handleFileUpload(event){
         const file = event.target.files[0]
         this.updateImage({file})
     }

     addToChallenged(user, i){
         let arr = this.state.followerArray
         arr.splice(i, 1)
         this.setState({
             challengeArray: [...this.state.challengeArray, user],
             followerArray: arr
         })
     }
     removeFromChallenged(user, i){
         let arr = this.state.challengeArray
         arr.splice(i, 1)
         this.setState({
             challengeArray: arr,
             followerArray: [...this.state.followerArray, user]
         })
     }
     updateImage({file}){
        console.log('file', file)
         let data = new FormData();
         data.append('key', 'value')
         data.append('file', file);
         axios.post('/profile', data)
         .then(response => this.uploadSuccess(response))
         .catch(error => console.log(error))
     }
     uploadSuccess({data}){
        console.log('response data' ,data)
        this.setState({
            image: './uploads/' + data.filename
        })
    }
    createBadge(){
        if(this.props.currentUserId){
        axios.post('/api/newbadge', {
            creatorId: this.props.currentUserId,
            title: this.state.title,
            description: this.state.description,
            content: this.state.image,
            logo: this.state.logo,
            type: 'create'


        }).then(response => {
            console.log(response)
             this.setState({badgeId: response.data[0].id})
        })
    } else {
        alert("Please log in")
    }
    this.setState({badgeCreated: true})
    }
    sendInvites(){
        this.state.challengeArray.forEach((user, i) => {
            axios.post('/api/invites', {
                userId: user.id,
                badgeId: this.state.badgeId
            })
        })
        axios.post('/api/group', {
            
             userId: this.props.currentUserId,
             badgeId: this.state.badgeId
         })
    }

    render() {
        console.log('state', this.state)
        console.log('props', this.props)

        let challenged = this.state.challengeArray.map((follower, i) => {
            return(

            <div key={i} onClick={() => {this.removeFromChallenged(follower, i)}}>
                <img className='userImage' src={follower.picture} />
                <p>{follower.username}</p>
            </div>
            )
        })

        let logos = this.state.logos.map((logo, i) => {
            return(
                <div key={i} className='individualIcon' onClick={() => {this.setState({logo: logo.url, logoView: !this.state.logoView})}}>
                    <img className='iconSize' src={logo.url} />
                </div>
            )
        })
        
    let followers = this.state.followerArray.map((follower, i) => {
            return(
                <div key={i} onClick={() => {this.addToChallenged(follower, i)}}>
                    <img className='userImage' src={follower.picture} />
                    <p>{follower.username}</p>
                </div>
            )
        })
        return (
            <div>
                <div className={this.state.badgeCreated ? 'noShow' : 'create-badge-wrapper'}>
                {/* <div className='create-badge-title'><div className='create-title'>CREATE BADGE</div></div> */}
                <div className='upload-picture'>
                <img className='edit-badge-image' src={this.state.image ? this.state.image : 'http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png'} />
                <div className='file-input'>
                <input  className='file-choose' type='file' name='user-image' onChange={this.handleFileUpload} />
                </div>
                </div>
                <div className='title-description'>
                    <div className='create-title-wrapper'>
                        <input className='create-title-badge' type="text" placeholder='Title'/>
                    </div>
                    <div className='create-description-wrapper'>
                        <input className='create-description-badge' type="text" placeholder='Description' rows='10'/>
                    </div>
                </div>
                </div>







                {/* <div className={this.state.badgeCreated ? 'noShow' : 'createBadge'}>
                    <h1>Create A Badge</h1>
                    Title: <input onChange={(e) => {this.setState({title: e.target.value})}} value={this.state.title} placeholder='Name your challenge' />
                    Description: <textarea value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}} placeholder='Describe your challenge'></textarea>
                    <div className='editProfileImageBox'>
                    <img className='editProfileImage' src={this.state.image ? this.state.image : 'http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png'} />
                    <div className='fileInput'>
                    <input  type='file' name='userImage' onChange={this.handleFileUpload} />
                    </div>
                    <div>
                       <button onClick={() => {this.setState({logoView: !this.state.logoView})}}>View Logos</button>
                       <button onClick={() => {this.createBadge()}}>Create Badge </button>
                       <div className={this.state.logoView ? 'iconList' : 'noShow'}>       
                       {logos}
                       </div>
                    </div>
                </div>
                </div>
                <div className={this.state.badgeCreated ? 'createBadge' : 'noShow'}>
                    <div className='followerRow'>
                        <h1>Challenged</h1>
                            {challenged}
                    </div>
                    <div className='followerRow'>
                        <h1>Followers</h1>
                        {followers}
                    </div>
                    <button onClick={this.sendInvites}>Send Challenges</button>
                </div>   */}
            </div>
        );
    }
}

function mapStateToProps( state ) {
    const {  currentUserId, currentUserFollowers } = state;
  
    return {
      
      currentUserId,
      currentUserFollowers
      
    };
  }
  
  export default connect( mapStateToProps, { getCurrentUser, getFollowers})( PostPage ); 