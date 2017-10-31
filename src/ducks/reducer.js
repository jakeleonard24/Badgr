import axios from 'axios';

const initialState = {
    posts: []
}
console.log('redux posts', this.posts)
const GET_POSTS = "GET_POSTS";

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_POSTS + "_FULFILLED":
            return Object.assign({}, state, {posts: action.payload})

            default:
                return state;
    }
}

export function getPosts(){
    
    const allPosts = axios.get('/api/allposts').then(response => {
        console.log('redux function res', response)
        return response.data
    })

    return {
        type: GET_POSTS,
        payload: allPosts
    }
};