
import express from 'express';
import passport from 'passport';
import getIndex from '../handlers/index';
import {getloginHandler} from '../handlers/login';
import {getSignUp, postSignUp} from '../handlers/signup';
import isAuth from '../middleware/auth';
import { Strategy } from "passport-local";
import User from "../model/user";
import bcryptjs from "bcryptjs";

const Router = express.Router();

passport.use(
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        let user = await User.findOne({ email : email });
  
        if (!user) {
          return done(null, false, {message : 'email is not registered'});
        }
  
        let passwordMatch = await bcryptjs.compare(password, user.password);

      
        if (!passwordMatch) {
          return done(null, false, {message : 'wrong password'});
        } else {
          return done(null, user);
        }
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
  

Router.get('/', isAuth, getIndex)

Router.get('/login', getloginHandler)

Router.post('/login', passport.authenticate('local', { successRedirect : '/', failureRedirect : '/login', failureFlash : 'invalid password or email'}))

Router.get('/signup', getSignUp)

Router.post('/signup', postSignUp)

export default Router