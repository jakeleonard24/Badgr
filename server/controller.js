module.exports = { 
// =============================================================================
// User 
// =============================================================================
getUser:  (req, res)=> {
  res.send(req.user)
},
getSingleUser: ( req, res, next ) => {
  const db = req.app.get('db');
  const { id } = req.params; 
  db.get_single_user([ id ])
    .then( users => res.status(200).json( users[0] ) )
    .catch( (err) => {
        res.status(500).send(err)
    } );
},

searchuser: ( req, res, next ) => {
  const db = req.app.get('db');
   
  db.search_user(req.query.monkey)
    .then( users => res.status(200).json( users ) )
    .catch( (err) => {
        res.status(500).send(err)
    } );
},
// =============================================================================
// Posts 
// =============================================================================
getAllPosts: (req, res) => {
  req.app.get('db').get_posts().then(posts =>{
          res.status(200).send(posts);
  }).catch((err) => {console.log(err)})
},
addLikes: (req, res) =>{
  let {badgeId, likes} = req.body
  req.app.get('db').update_likes([badgeId, likes]).then(post=>{
    res.status(200).send(post);
  }).catch((err)=>{console.log(err)})
},
addLiked: (req, res) =>{
  let {badgeId, userId} = req.body
  req.app.get('db').track_likes([badgeId, userId]).then(post=>{
    res.status(200).send(post);
  }).catch((err)=>{console.log(err)})
},
getTrackedLikes: (req, res) => {
  req.app.get('db').find_if_liked(userId).then(posts =>{
          res.status(200).send(posts);
  }).catch((err) => {console.log(err)})
},
getFollowingFeed: (req, res) => {
  let {id} = req.params;
  req.app.get('db').get_feed([id]).then(feed =>{
          res.status(200).send(feed);
  }).catch((err)=>{console.log(err)})
},
getAllUserBadgeGroups: (req, res) => {
  let {id} = req.params;
  req.app.get('db').all_badges_user([id]).then(badges =>{
          res.status(200).send(badges);
  }).catch((err)=>{console.log(err)})
},
getBadgeGroup: ( req, res, next ) => {
  const db = req.app.get('db');
  const { id } = req.params; 
  db.get_badgegroup([ id ])
    .then( users => res.status(200).json( users[0] ) )
    .catch( (err) => {
        res.status(500).send(err)
    } );
},
getBadgePosts: ( req, res, next ) => {
  const db = req.app.get('db');
  const { id } = req.params; 
  db.get_badgegroup([ id ])
    .then( users => res.status(200).json( users[0] ) )
    .catch( (err) => {
        res.status(500).send(err)
    } );
},
// =============================================================================
// Follower/Following 
// =============================================================================
getFollowing: ( req, res ) => {
  let {id} = req.params;
  req.app.get('db').get_following([id]).then( user => {
          res.status(200).send(user)
  }).catch((err) => {console.log(err)})
},
followUser: ( req, res ) => {
  const db = req.app.get('db');
  const { currentUserId, followerUser } = req.body;
  req.app.get('db').follow_user([ currentUserId, followerUser ]).then(
  //IF ELSE STATEMENT FOR DUPLICATES SHOULD GO HERE
  ).catch((err) => {console.log(err)})
  },
getFollower: ( req, res ) => {
  let {id} = req.params;
  req.app.get('db').get_followers([id]).then( user => {
          res.status(200).send(user)
  }).catch((err) => {console.log(err)})
}
}


