import passport from 'passport';
import  {OAuth2Strategy} from 'passport-google-oauth'
import express from 'express'
import oAuthUser from '../model/oAuth-model';

let googleRouter = express.Router()

passport.use(new OAuth2Strategy({
    clientID : process.env.GOOGLE_ID,
    clientSecret : process.env.GOOGLE_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK
}, (accessToken, refreshToken, profile, done) => {
  
    oAuthUser.findOrCreate({googleId : profile.id, name : profile.displayName}, (err, user) => {
        if(err) return done(err)
        return done(null, user)
    })
}))

googleRouter.get('/auth/google', passport.authenticate('google', 
    { scope: ['https://www.googleapis.com/auth/plus.login'] }
))

googleRouter.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect : '/login',
    successRedirect : '/'
}
))



export default googleRouter