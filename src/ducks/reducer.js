import axios from 'axios';

const initialState = {
    posts: [],
    currentUserId: 0,
    currentUserFollowing: [],
    followUser: [],
    currentUserFollowers: [],
    singleUser: []
}
// =============================================================================
// Action Creators 
// =============================================================================
const GET_POSTS = "GET_POSTS";
const GET_CURRENT_USER = "GET_CURRENT_USER";
const GET_FOLLOWING = "GET_FOLLOWING";
const FOLLOW_USER = "FOLLOW_USER";
const GET_FOLLOWERS = "GET_FOLLOWERS";
const GET_SINGLE_USER = "GET_SINGLE_USER";
// =============================================================================
// Post Functions 
// =============================================================================
export function getPosts(){
    const allPosts = axios.get('http://localhost:3333/api/allposts').then(response => {
        console.log('redux function res', response)
        return response.data
    })
    return {
        type: GET_POSTS,
        payload: allPosts
    }
}
// =============================================================================
// User Functions
// =============================================================================
export function getCurrentUser(){
    const currentUser = axios.get('/api/user').then(response => {
        console.log('this ran', response)
        return response.data.id
    })
    return{
        type: GET_CURRENT_USER,
        payload: currentUser
    }
}
export function getSingleUser(id){
    const singleUser = axios.get(`/api/singleuser/${id}`).then(response => {
        return response.data
    })
    return{
        type: GET_SINGLE_USER,
        payload: singleUser
    }
}
// =============================================================================
// Follow/Following Functions 
// =============================================================================
export function getFollowing(id){
    const following = axios.get('/api/following/' + id).then(response => {
        console.log('get following ran', response)
        return response.data
    })
    return{
        type: GET_FOLLOWING,
        payload: following
    }
}
export function followUser(id, followId){
    const followUser = axios.post('/api/followuser/', {currentUserId: id, followerUser: followId}).then(response => {
    })
    return{
        type: FOLLOW_USER,
        payload: followUser
    }
  }
export function getFollowers(id){
    const followers = axios.get('/api/followers/' + id).then(response => {
        console.log('get following ran', response)
        return response.data
    })
    return{
        type: GET_FOLLOWERS,
        payload: followers
    }
}
// =============================================================================
// Reducer 
// =============================================================================
export default function reducer(state = initialState, action){
console.log('state', state)
console.log('action', action)
switch (action.type) {
// =============================================================================
// Post Reducers 
// =============================================================================
    case GET_POSTS + "_FULFILLED":
        return Object.assign({}, state, {posts: action.payload}) 
// =============================================================================
// User Reducers
// =============================================================================
    case GET_CURRENT_USER + "_FULFILLED":
        return Object.assign({}, state, {currentUserId: action.payload})
    case GET_SINGLE_USER + "_FULFILLED":
        return Object.assign({}, state, {singleUser: action.payload})
// =============================================================================
// Follow/Following Reducers 
// =============================================================================
    case GET_FOLLOWING + "_FULFILLED":
        return Object.assign({}, state, {currentUserFollowing: action.payload})
    // case GET_FOLLOWING + "_FULFILLED":
    //     return Object.assign({}, state, {followUser: action.payload})
    case GET_FOLLOWERS + "_FULFILLED":
        return Object.assign({}, state, {currentUserFollowers: action.payload})
        default:
        return state;
}
}


    