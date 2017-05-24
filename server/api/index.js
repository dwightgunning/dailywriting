const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

var users = [
  {
    id: 1,
    email: 'dwight@dwightgunning.com',
    password: 'test'
  },
  {
    id: 2,
    email: 'test@email.com',
    password: 'test'
  }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users.find((user) => user.id === jwt_payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  done(null, {email: 'dwight@dwightgunning.com'});
});

passport.use(new LocalStrategy(
  function(email, password, done) {

    // return done(null, {email: 'dwight@dwightgunning.com'});


    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

const router = express.Router();
router.use(passport.initialize());
router.use(bodyParser.json());

router.use(function(req, res, next) {
  next();
});

router.post("/login", function(req, res) {
  if(req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
  } else {
    return res.status(400);
  }
  // usually this would be a database call:
  var user = users.find((user) => { console.log(user); return user.email == email});

  if( ! user ){
    res.status(401).json({message:"no user found"});
    return;
  }

  if(user.password === password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({email: user.email, token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

router.post('/logout',
  function(req, res) {
    // TODO: Drop the session
    res.send("OK");
  });

router.post('/signup',
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user);
  });

router.post('/words', function(req, res) {
  res.send("OK");
});

module.exports = router
