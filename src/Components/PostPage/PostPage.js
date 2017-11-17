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
         axios.post('/api/origin', {
             originId: this.state.badgeId
         })
    }

    render() {
        console.log('state', this.state)
        console.log('props', this.props)

        let challenged = this.state.challengeArray.map((follower, i) => {
            return(

            <div key={i} onClick={() => {this.removeFromChallenged(follower, i)}}>
                <div className='create-badge-group-header'>
                <div className='create-post-padding-wrapper'>
                <div className='create-left-header'>
                
                <div className='create-badge-icon'>
                <img className='create-badge-icon-image' src={follower.picture} alt='content' />
                </div>  
                <div className='create-badge-name'>
                {follower.username}
                </div>  
                </div>
                </div>
                <div className='create-right-header'>
                {/* <div className='create-button'>
                username
                </div>   */}
                </div>
                </div>   
            </div>
            )
        })

        let logos = this.state.logos.map((logo, i) => {
            return(
                <div key={i} className='individualIcon' onClick={() => {this.setState({logo: logo.url, logoView: !this.state.logoView})}}>
                    <img className='iconSize' src={logo.url} alt='' />
                </div>
            )
        })
        
    let followers = this.state.followerArray.map((follower, i) => {
            return(
                <div key={i} onClick={() => {this.addToChallenged(follower, i)}}>
                {/* <img className='userImage' src={follower.picture} />
                <p>{follower.username}</p> */}
                <div className='create-badge-group-header'>
                <div className='create-post-padding-wrapper'>
                <div className='create-left-header'>
                
                <div className='create-badge-icon'>
                <img className='create-badge-icon-image' src={follower.picture} alt='content' />
                </div>  
                <div className='create-badge-name'>
                {follower.username}
                </div>  
                </div>
                </div>
                <div className='create-right-header'>
                </div>
                </div>   
                </div>
            )
        })
        return (
                <div>
                    <div className='create-complete-header'>
                        <div className='create-complete-wrapper'>
                        <div className='create-create-title'>Create Badge</div>
                        <div className="title-nav">
                        <Link to='/create' style={{ textDecoration: 'none' }} >
                        <div className='create-complete-title'> Complete Badge</div>
                        </Link> </div>
                        </div>
                    </div>
                <div className={this.state.badgeCreated ? 'noShow' : 'create-badge-wrapper'}>
                <div className='upload-picture' type='file' name='user-image' >
                <img  className='upload-badge-image' src={this.state.logo ? this.state.logo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Circle-icons-trophy.svg/1024px-Circle-icons-trophy.svg.png'}  alt=''/>
                       <div>
                <div className='upload-logo' onClick={() => {this.setState({logoView: !this.state.logoView})}}><div className='view-logo-text'>VIEW LOGOS</div></div>

                <div className={this.state.logoView ? 'iconList' : 'noShow'}>       
                {logos}
                </div>
                    </div>
                <div className='file-input' >
                </div>
                </div>
                <div className='title-description'>
                    <div className='create-title-wrapper'>
                        <input  value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}} className='create-title-badge' type="text" placeholder='Title'/>
                    </div>
                    <div className='create-description-wrapper'>
                        <textarea onChange={(e) => {this.setState({title: e.target.value})}} value={this.state.title} className='create-description-badge' type="text" placeholder='Description' rows='10'/>
                    </div>
                    <div className='create-badge-button-padding'>
                    <div className='create-badge-button' onClick={() => {this.createBadge()}}>CREATE BADGE </div>
                    </div>
                </div>
                </div>     

                <div className={this.state.badgeCreated ? 'createBadge' : 'noShow'}>
                    <div className='followerRow'>
                        {/* <h1>Challenged</h1>
                            {challenged} */}
                </div>
                <div className='follower-to-invite-container'>
                <div className='create-badge-title'><div className='create-title'>FOLLOWERS
                </div>
                </div>
                 {followers}
                <div className='create-badge-title'><div className='create-title'>CHALLENGED
                </div>
                </div>
                </div>
                {challenged}
                        <Link to='/'>
                        <div onClick={this.sendInvites} className='invite-button-followers'>INVITE</div>
                        </Link>
                </div>  
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