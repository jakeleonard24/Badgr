import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import './EditProfile.css'

class EditProfile extends Component {
    constructor(){
        super()

        this.state = {
            currentUser: [],
            bio:'',
            picture:''
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.uploadSuccess = this.uploadSuccess.bind(this);
        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount(){
        axios.get(`/api/singleuser/${this.props.match.params.id}`).then((response)=>{
            this.setState({
                currentUser:response.data
                })
    })
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
       picture: './uploads/' + data.filename
   })
}

updateUser(){
    console.log('this ran')
    axios.post('/api/updateuser', {
        bio: this.state.bio,
        picture: this.state.picture,
        id: this.props.currentUserId
    })
}

    render() {
        console.log('state', this.state)
        return (
            <div>
            {/* <img className='edit-profile-pic' src={this.state.picture ? this.state.picture : this.state.currentUser.picture} />
            <p>{this.state.currentUser.username}</p>
            current bio: {this.state.currentUser.bio}
            
            <br/>
            Change Bio:
            <textarea value={this.state.bio} onChange={(e)=> {this.setState({bio: e.target.value})}}></textarea>

        <br/>

        Change Profile Picture:
        <input  type='file' name='userImage' onChange={this.handleFileUpload} />
        <Link to={`/profile/${this.props.currentUserId}`}>
        <button onClick={() => {this.updateUser()}}>Update User BOI</button>
        </Link> */}

<div>
<div className='edit-badge-wrapper'>
<div className='upload-picture' type='file' name='user-image' >
<img  className='upload-badge-image'  src={this.state.picture ? this.state.picture : this.state.currentUser.picture} alt='' />
<div className='edit-description-wrapper'>
<div className='current-username'>{this.state.currentUser.username}</div>
<div className='current-bio'>{this.state.currentUser.bio}</div>
</div>
</div>
<div className='title-description'>
<div className='edit-description-wrapper'>
<textarea value={this.state.bio} onChange={(e)=> {this.setState({bio: e.target.value})}} className='edit-description-badge' type="text" placeholder='Description' rows='10'/>
</div>
<div className='edit-badge-button-padding'>
<div className='edit-badge-button' onClick={() => {this.updateUser()}}>UPDATE PROFILE </div>
</div>
</div>
</div>
</div>
</div>
        );
    }
}

function mapStateToProps( state ) {
    const {  currentUserId } = state;
  
    return {
      
      currentUserId,
      

    };
  }
  
  export default connect( mapStateToProps)( EditProfile );