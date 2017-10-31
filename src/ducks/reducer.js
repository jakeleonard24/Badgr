import axios from 'axios';

const initialState = {
    posts: [],
    currentUserId: 0
}
console.log('redux posts', this.posts)
const GET_POSTS = "GET_POSTS";
const GET_CURRENT_USER = "GET_CURRENT_USER";

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_POSTS + "_FULFILLED":
            return Object.assign({}, state, {posts: action.payload})
<<<<<<< HEAD

        case GET_CURRENT_USER + "_FULFILLED":
            return Object.assign({}, state, {currentUserId: action.payload})
=======
>>>>>>> 11365cebbb8461144b0cc10d0f553525afa82f7c

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

export function getCurrentUser(){
    const currentUser = axios.get('/api/user').then(response => {
        return response
    })

    return{
        type: GET_CURRENT_USER,
        payload: currentUser.id
    }
    
}

    