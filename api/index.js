const bodyParser = require('body-parser');
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const session = require('express-session');

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  done(null, {username: "dwight", email: 'dwight@dwightgunning.com'});

  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

passport.use(new LocalStrategy(
  function(username, password, done) {

    // return done(null, false, { message: 'Incorrect username.' });

return done(null, {username: "dwight", email: 'dwight@dwightgunning.com'});


    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));

const router = express.Router();
router.use(new session({ secret: 'adfasfdadfasfdsadfasfdasdf' }));
router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.json());

router.use(function(req, res, next) {
  console.log(req.body);
  next();
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/users/' + req.user.username);
    res.send(req.user);
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
    // res.redirect('/users/' + req.user.username);
    res.send(req.user);
  });

router.post('/words', function(req, res) {
  console.log(req.body);
  res.send("OK");
  // res.sendStatus(200).;
});



module.exports = router
