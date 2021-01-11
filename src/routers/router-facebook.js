import express from 'express';
import passport from 'passport';
import {Strategy as FacebookStrategy}  from 'passport-facebook';
import oAuthUser from '../model/oAuth-model';


const facebookRouter = express.Router();

passport.use(new FacebookStrategy({
    clientID : process.env.FACEBOOK_ID,
    clientSecret : process.env.FACEBOOK_SECRET,
    callbackURL : process.env.FACEBOOK_CALLBACK
}, (accessToken, refreshToken, profile, done) => {
    oAuthUser.findOrCreate({facebook_id : profile.id,  name : profile.displayName }, (err, user) => {
        if(err) return done(err);
        done(null, user)
    })
}))

facebookRouter.get('/auth/facebook', passport.authenticate('facebook'))

facebookRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect : '/', failureRedirect : '/login'} ))

export default facebookRouter