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
// =============================================================================
// Posts 
// =============================================================================
getAllPosts: (req, res) => {
  req.app.get('db').get_posts().then(posts =>{
          res.status(200).send(posts);
  }).catch((err) => {console.log(err)})
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
getFollowing: ( req, res ) => {
  let {id} = req.params;
  req.app.get('db').get_following([id]).then( user => {
          res.status(200).send(user)
  }).catch((err) => {console.log(err)})
}
}