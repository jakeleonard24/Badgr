require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , massive = require('massive')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , cors = require('cors')
    , axios = require('axios')
    , ctrl = require('./controller')
    , multer = require('multer')
    , upload = multer({dest: './public/uploads'})

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'startingover',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.static(`${__dirname}/../build`))

massive(process.env.CONNECTION_STRING)
.then( db => {
    app.set('db', db)
})

passport.use( new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
    }, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
// =============================================================================
// Retrieving User Info 
// =============================================================================
db.get_user([profile.identities[0].user_id]).then( user => {
if (user[0]) {
    done(null, user[0])
} else {
if(profile.nickname){
db.create_user([
    profile.emails[0].value,
    profile.nickname,
    profile.picture,
    profile.identities[0].user_id
    ])
    .then( user => {
        done(null, user[0])
    })}
    else {
        db.create_user([
            profile.emails[0].value,
            profile.emails[0].value,
            profile.password,
            profile.identities[0].user_id])
            .then( user => {
                done(null, user[0])
            })
        }
    }})
}))
// =============================================================================
// Passport 
// =============================================================================
passport.serializeUser(function(user, done) {
    done(null, user);
})
passport.deserializeUser(( userId, done) => {
    app.get('db').current_user([userId.id]).then(user => {
    done(null, user[0])
    })
})

const storage = multer.diskStorage({
    
     filename: function (req, file, cb) {
         let extArray = file.mimetype.split("/");
         let extension = extArray[extArray.length - 1];
         cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
       }
     })

     var type = upload.single('file')

     pp.post('/profile', type, (req, res, next) => {
        console.log(req.body, 'Body')
        console.log(req.file.originalname)
        res.json(req.file)
        
        
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../build/index.html'));
  })

// =============================================================================
// Auth0 Endpoints 
// =============================================================================
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: 'http://localhost:3000/#/profile',
    failureRedirect: '/auth'
    }))
    app.get('/auth/logout', (req,res) => {
    req.logOut();
    res.redirect(302, 'http://localhost:3000/#/blog')
})
// =============================================================================
// User Endpoints
// =============================================================================
app.get('/api/user', ctrl.getUser)
app.get('/api/singleuser/:id', ctrl.getSingleUser)
// =============================================================================
// Post Endpoints 
// =============================================================================
app.get('/api/allposts', ctrl.getAllPosts);
app.post('/api/addlike', ctrl.addLikes);
// =============================================================================
// Follow/Following Endpoints 
// =============================================================================
app.get(`/api/following/:id`, ctrl.getFollowing);
app.post(`/api/followuser`, ctrl.followUser);
app.get(`/api/followers/:id`, ctrl.getFollowing);
app.post('/api/addcomment', (req, res) => {
        let {comment, userId, badgeId} = req.body;
        req.app.get('db').add_comment([comment, userId, badgeId]).then(comments => {
                res.status(200).json(req.body)
        })
})

// =============================================================================
// Comments Endpoints
// =============================================================================
app.get('/api/getcomments/:id', (req, res) => {
    let {id} = req.params;
    req.app.get('db').get_comments([id]).then(comments => {
        res.status(200).send(comments)
    }).catch((err) => {console.log(err)})
})

const port = 3333;

app.listen(port, () => console.log(`listening on port ${port}`));