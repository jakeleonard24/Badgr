import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getCurrentUser, getFollowers} from '../../ducks/reducer';
import {connect} from 'react-redux';
import './CreateBadge.css'

class CreateBadge extends Component {
    constructor(){
        super()
        this.state = {
           groups: [],
           selectedCreatorId:'',
           selectedLogo:'',
           selectedTitle:'',
           description: '',
           image: '',
           badgeIsChosen: false,
           selectedOrigin: 0
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.uploadSuccess = this.uploadSuccess.bind(this);
        this.createBadge = this.createBadge.bind(this);
        this.selectBadge = this.selectBadge.bind(this);
    }
    handleFileUpload(event){
         const file = event.target.files[0]
         this.updateImage({file})
     }


     updateImage({file}){
        console.log('file', file)
         let data = new FormData();
         data.append('key', 'value')
         data.append('file', file);
         console.log(data, 'data')
        
 
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
        axios.post('/api/complete', {
            userId: this.props.currentUserId,
            creatorId: this.state.selectedCreatorId,
            title: this.state.selectedTitle,
            description: this.state.description,
            content: this.state.image,
            logo: this.state.selectedLogo,
            originId: this.state.selectedOrigin,
            type: 'complete'


        }).then(response => {
            console.log(response)
        })
    } else {
        alert("Please log in")
    }
    }
    selectBadge(id, title, logo, origin){
        this.setState({
            selectedCreatorId: id,
            selectedTitle: title,
            selectedLogo: logo,
            selectedOrigin: origin,
            badgeIsChosen: true
        })

    }
    render() {
        console.log('state', this.state)
        console.log('props', this.props)

       let badges = this.props.allBadgeGroups.map((badge, i) => {
            return(
                <div onClick={() => {this.selectBadge(badge.creatorid, badge.title, badge.logo, badge.origin_id)}} key={i}>
                    <img className='createBadgeLogo' src={badge.logo} alt='' />
                </div>
            )
       })
        
        return (
            <div>
            <div className='choose-complete-header'>
                <div className='choose-complete-wrapper'>
                <Link to='/post' style={{ textDecoration: 'none' }} >
                <div className='choose-choose-title'>Create Badge</div>
                </Link> 
                <div className="title-nav">
                <div className='choose-complete-title'> Complete Badge</div>
                </div>
                </div>
            </div>
            <div className={this.state.badgeIsChosen ?  'hiddenView' : 'createBadgeBody'}>
                  Which badge did you complete? {badges}
            </div>
            <div className={this.state.badgeIsChosen ? 'createBadgeBody' : 'hiddenView'}>
            Description: <textarea value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}} placeholder='Describe your challenge'></textarea>

            <div className='editProfileImageBox'>
            <img className='editProfileImage' src={this.state.image ? this.state.image : 'http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png'} alt='' />
            <div className='fileInput'>
            <input  type='file' name='userImage' onChange={this.handleFileUpload} />
            <Link to='/'>
            <button onClick={this.createBadge}>Post Completed Badge</button>
            </Link>
            </div>
            </div>
            </div>

            </div>
        );
    }
}

function mapStateToProps( state ) {
    const {  currentUserId, currentUserFollowers, allBadgeGroups } = state;
  
    return {
      
      currentUserId,
      currentUserFollowers,
      allBadgeGroups,

    };
  }
  
  export default connect( mapStateToProps, { getCurrentUser, getFollowers})( CreateBadge );