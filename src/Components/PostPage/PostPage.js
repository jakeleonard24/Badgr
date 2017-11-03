import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class PostPage extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    handleFileUpload(event){
        
         console.log(event.target.files)
         console.log(this.state)
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


    render() {
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
                    Title: <input placeholder='Name your challenge' />
                    Description: <textarea placeholder='Describe your challenge'></textarea>
                    <input type='file' name='userImage' onChange={this.handleFileUpload} />
                </div>
            </div>
        );
    }
}

export default PostPage;