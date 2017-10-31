const express = require('express'),
        bodyParser = require('body-parser'),
        massive = require('massive'),
        session = require('express-session'),
        passport = require('passport'),
        cors = require('cors'),
        Auth0Strategy = require('passport-auth0');

require ('dotenv').config();
// =============================================================================
// EXPRESS AND EXPRESS SESSIONS
// =============================================================================
const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
// =============================================================================
// CORS CONTROLLERS
// =============================================================================
app.use(cors());
// =============================================================================
// PASSPORT AND BODYPARSERs
// =============================================================================
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
// app.use(express.static(`${__dirname}./../build`));
// =============================================================================
// MASSIVE - CONNECTION STRING FOR DATABASE
// =============================================================================
massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
    const PORT = 3333;
    app.listen(PORT, () => console.log('Listening on port: ', PORT))
})
// =============================================================================
// PASSPORT STRATEGY
// =============================================================================
passport.use( new Auth0Strategy({
domain: process.env.AUTH_DOMAIN,
clientID: process.env.AUTH_CLIENT_ID,
clientSecret: process.env.AUTH_CLIENT_SECRET,
callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {
const db = app.get('db');
db.get_user([profile.identities[0].user_id]).then( user => {
        if (user[0]) {
            done(null, user[0])
        } else {
            if(profile.nickname){
            db.create_user([
                profile.emails[0].value,
                profile.nickname,
                profile.password,
                profile.picture,
                profile.identities[0].user_id])
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
passport.serializeUser(function(user, done) {

done(null, user);
})
passport.deserializeUser(( userId, done) => {

app.get('db').current_user([userId.id]).then(user => {
        
        done(null, user[0])
})
})
// =============================================================================
// AUTH ENDPOINTS
// =============================================================================
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0',{
        successRedirect: 'localhost:3000/#/home',
        failureRedirect: '/auth'
}))
app.get('/auth/logout', (req,res) => {
        req.logOut();
        res.redirect(302, `https:${process.env.AUTH_DOMAIN}/v2/logout?returnTo=${process.env.SERVERHOST}`)
})
app.get('/api/user',  passport.authenticate('auth0'), (req, res) => {
        req.app.get('db').current_user().then(user =>{
        res.status(200).send(user)
        }).catch((err) => {console.log(err)})
})