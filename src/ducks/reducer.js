import axios from 'axios';

const initialState = {
    posts: [],
    currentUserId: 0
}

const GET_POSTS = "GET_POSTS";
const GET_CURRENT_USER = "GET_CURRENT_USER";

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_POSTS + "_FULFILLED":
            return Object.assign({}, state, {posts: action.payload})

        case GET_CURRENT_USER + "_FULFILLED":
            return Object.assign({}, state, {currentUserId: action.payload})

            default:
                return state;
    }
}

export function getPosts(){
    const allPosts = axios.get('/api/allposts').then(response => {
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

    