import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getCurrentUser} from '../../ducks/reducer';
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
            logoView: false
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.uploadSuccess = this.uploadSuccess.bind(this);


    }
    handleFileUpload(event){
        
         console.log(event.target.files)
       
         const file = event.target.files[0]
         console.log('file', file)
         
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
        axios.post('/api/newbadge', {
            creatorId: this.props.currentUserId,
            title: this.state.title,
            description: this.state.description,
            content: this.state.image,
            logo: this.state.logo,
            type: 'create'


        })
    }

    render() {
        console.log('state', this.state)
        console.log('props', this.props)
        return (
            <div>
                <div>
                PostPage
                <Link to='/home'>
                <button>Home</button>
                </Link>
                </div>

                <div>
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
                       <div className={this.state.logoView ? 'iconList' : 'noShow'}>
                           
                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>
                               
                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>

                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>
                               
                               <div className='individualIcon'><img className='iconSize' src='https://static1.squarespace.com/static/5683fc75df40f34a36a136db/56ec2e8a45bf2139a4b998b5/56ec2e8a859fd0e27286ceb1/1458318990599/JandJIcons3.png'/></div>
                           
                       </div>
                    </div>
                </div>

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
  
  export default connect( mapStateToProps, { getCurrentUser})( PostPage ); 