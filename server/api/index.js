const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const bodyParser = require('body-parser');

const users = [
  {
    id: 1,
    email: 'dwight@dwightgunning.com',
    password: 'test',
  },
  {
    id: 2,
    email: 'test@email.com',
    password: 'test',
  },
];

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  // usually this would be a database call:
  const existingUser = users.find((user) => user.id === jwtPayload.id);
  if (existingUser) {
    next(null, existingUser);
  } else {
    next(null, false);
  }
}));

passport.serializeUser((user, done) => done(null, user.email));

passport.deserializeUser((id, done) => {
  done(null, { email: 'dwight@dwightgunning.com' });
});

const router = express.Router();
router.use(passport.initialize());
router.use(bodyParser.json());

router.use((req, res, next) => next()); // TODO: Name this magical function

router.post('/login', (req, res) => {
  let resp;
  let email;
  let password;

  if (req.body.email && req.body.password) {
    email = req.body.email;
    password = req.body.password;
  } else {
    resp = res.status(400);
  }
  // usually this would be a database call:
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser) {
    resp = res.status(401).json({ message: 'no user found' });
  }
  if (existingUser.password === password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    const payload = { id: existingUser.id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    resp = res.json({ email: existingUser.email, token });
  } else {
    resp = res.status(401).json({ message: 'passwords did not match' });
  }
  return resp;
});

router.post('/logout', (req, res) => res.send('OK'));

router.post('/signup',
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user);
  });

router.post('/words',
  (req, res) => {
    res.send('OK');
  });

module.exports = router;
