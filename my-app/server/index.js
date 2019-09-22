const express = require('express')
const http = require('http')
const passport = require('passport')
const session = require('express-session')
var TwitterAPI=require('twitter');
const cors = require('cors')
const socketio = require('socket.io')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const {APICONFIG,PASSWORDAPICONFIG} = require('./config.js')
var TWITTERCONFIG = new TwitterAPI(APICONFIG);


// Create the server and allow express and sockets to run on the same port
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Allows the application to accept JSON and use passport
app.use(express.json())
app.use(passport.initialize())

// Set up cors to allow us to accept requests from our client
app.use(cors({
  origin: 'http://localhost:3000'
})) 

// saveUninitialized: true allows us to attach the socket id
// to the session before we have authenticated with Twitter  
app.use(session({
    secret: "Kittenkey",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  }))

// allows us to save the user into the session
passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

// Basic setup with passport and Twitter
passport.use(new TwitterStrategy(
  PASSWORDAPICONFIG, 
  (accessToken, refreshToken, profile, cb) => {
    
    // save the user right here to a database if you want
    const user = { 
        name: profile.username,
        photo: profile.photos[0].value.replace(/_normal/, ''),
        profile:profile,
        screenname:profile.screen_name
    }
    cb(null, user)
  })
)

// Middleware that triggers the PassportJs authentication process
const twitterAuth = passport.authenticate('twitter')

// This custom middleware picks off the socket id (that was put on req.query)
// and stores it in the session so we can send back the right info to the 
// right socket
const addSocketIdToSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}

// This is endpoint triggered by the popup on the client which starts the whole
// authentication process
app.get('/twitter', addSocketIdToSession, twitterAuth)

// This is the endpoint that Twitter sends the user information to. 
// The twitterAuth middleware attaches the user to req.user and then
// the user info is sent to the client via the socket id that is in the 
// session. 
app.get('/twitter/callback', twitterAuth, (req, res) => {
  io.in(req.session.socketId).emit('user', req.user)
  res.end()
});

app.get('/follow/users',(req,res)=>{
     TWITTERCONFIG.get('followers/list', function(error, tweets, response) {
        if(error) {
            throw error;
        }
        res.send(tweets);
      });
});


server.listen(4000, () => {
  console.log('listening...')
})