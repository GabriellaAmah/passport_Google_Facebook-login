/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express'
import path from 'path'
import Router from './routers/router'
import { default as bodyParser } from 'body-parser'
import passport from 'passport';
import dotenv from 'dotenv'
import { default as session } from 'express-session'
import {default as flash} from 'connect-flash'
import { default as sessionStore } from 'connect-mongodb-session'
import googleRouter from './routers/router-google';
import facebookRouter from './routers/router-facebook';
const app = express();

dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
let mongodbStore = sessionStore(session)
let store = new mongodbStore({
    url: 'mongodb://localhost:27017/gabbiee',
    collection: 'sessions'
})
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false, store: store }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, './style')))
app.use(facebookRouter)
app.use(googleRouter)
app.use(Router)

export default app