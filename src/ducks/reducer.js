import axios from 'axios';

const initialState = {
    posts: [],
    currentUserId: 0,
    currentUserFollowing: [],
    followUser: [],
    currentUserFollowers: [],
    singleUser: [],
    followingFeed: [],
    allBadgeGroups: [],
    userInvites: [],
    singleBadge: {},
    badgePost: [],
    badgeJoin: []

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
const GET_FOLLOWING_FEED = "GET_FOLLOWING_FEED";
const GET_ALL_BADGES_USER = "GET_ALL_BADGES_USER";
const GET_USER_INVITES = "GET_USER_INVITES";
const GET_SINGLE_BADGE = "GET_SINGLE_BADGE";
const GET_NEW_BADGE_GROUP_FEED = "GET_NEW_BADGE_GROUP_FEED";
const JOIN_BADGE_GROUP = "JOIN_BADGE_GROUP";
// =============================================================================
// Post Functions 
// =============================================================================
export function getPosts(){
    const allPosts = axios.get('/api/allposts').then(response => {
        return response.data
    })
    return {
        type: GET_POSTS,
        payload: allPosts
    }
}
export function getCurrentUser(){
    const currentUser = axios.get('/api/user').then(response => {
        return response.data.id
    })
    return{
        type: GET_CURRENT_USER,
        payload: currentUser
    }
}
// =============================================================================
// User Functions
// =============================================================================
export function getFollowingFeed(id){
    const getFeed = axios.get(`/api/getfollowingfeed/${id}`).then(response => {
        console.log('HI DUDE', response.data);
        return response.data
    })
    return{
        type: GET_FOLLOWING_FEED,
        payload: getFeed
    }
}
export function getNewBadgeGroupFeed(id){
    const badgeGroupFeed = axios.get(`/api/getnewbadgegroupfeed/${id}`).then(response => {
        console.log('HI DUDE', response.data);
        return response.data
    })
    return{
        type: GET_NEW_BADGE_GROUP_FEED,
        payload: badgeGroupFeed
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
        return response.data
    })
    return{
        type: GET_FOLLOWERS,
        payload: followers
    }
}
// =============================================================================
// Badge Groups Reducers 
// =============================================================================
export function getAllBadgeGroups(id){
    const allUserBadges = axios.get(`/api/alluserbadges/${id}`).then(response => {
        console.log('HI DUDE', response.data);
        return response.data
    })
    return{
        type: GET_ALL_BADGES_USER,
        payload: allUserBadges
    }
}

export function getSingleBadge(id){
    let singleBadge = axios.get(`/api/onebadge/${id}`).then(response => {
        return response.data
    })
    return{
        type: GET_SINGLE_BADGE,
        payload: singleBadge
    }
}

export function joinBadgeGroup(currentId, otherId){

    let join = axios.post('/api/group', {userId: currentId, badgeId: otherId}).then(response => {
        return response.data
    })
    return{
        type: JOIN_BADGE_GROUP,
        payload: join
    }
}

// =============================================================================
// invites
// ============================================================================
export function getUserInvites(id){
    let invites = axios.get(`/api/getinvites/${id}`).then(response => {
        return response.data
    })
    return{
        type:GET_USER_INVITES,
        payload: invites
    }
}


//=============================================================================
// Reducer 
// =============================================================================
export default function reducer(state = initialState, action){
console.log('state', state)
console.log('action', action)
switch (action.type) {
// =============================================================================
// Badge Groups Reducers 
// =============================================================================
case GET_ALL_BADGES_USER + "_FULFILLED":
console.log('ALL BADGE GROUPS:',action.payload);
    return Object.assign({}, state, {allBadgeGroups: action.payload}) 
case JOIN_BADGE_GROUP + "_FULFILLED":
        return Object.assign({}, state, {badgeJoin: action.payload}) 
// =============================================================================
// Post Reducers 
// =============================================================================
    case GET_POSTS + "_FULFILLED":
        return Object.assign({}, state, {posts: action.payload}) 
    case GET_FOLLOWING_FEED + "_FULFILLED":
        console.log('PAYLOAD:',action.payload);
            return Object.assign({}, state, {followingFeed: action.payload}) 
// =============================================================================
// User Reducers
// =============================================================================
    case GET_CURRENT_USER + "_FULFILLED":
        return Object.assign({}, state, {currentUserId: action.payload})
    case GET_SINGLE_USER + "_FULFILLED":
        return Object.assign({}, state, {singleUser: action.payload})

    case GET_USER_INVITES + "_FULFILLED":
        return Object.assign({}, state, {userInvites: action.payload})
// =============================================================================
// Follow/Following Reducers 
// =============================================================================
    case GET_FOLLOWING + "_FULFILLED":
        return Object.assign({}, state, {currentUserFollowing: action.payload})
    // case GET_FOLLOWING + "_FULFILLED":
    //     return Object.assign({}, state, {followUser: action.payload})
    case GET_NEW_BADGE_GROUP_FEED + "_FULFILLED":
        return Object.assign({}, state, {badgePost: action.payload})
// case GET_FOLLOWING + "_FULFILLED":
//     return Object.assign({}, state, {followUser: action.payload})
    case GET_FOLLOWERS + "_FULFILLED":
        return Object.assign({}, state, {currentUserFollowers: action.payload})
    case GET_SINGLE_BADGE + '_FULFILLED':
        return Object.assign({}, state, {singleBadge: action.payload})
        
        default:
        return state;
}
}


    