/* eslint-disable node/no-unsupported-features/es-syntax */
import app from './src/app';
import http from 'http';
import mongoose from 'mongoose'

const server = http.createServer(app)


mongoose.connect('mongodb://localhost:27017/gabbiee', { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
    server.listen(9090, () => console.log('server started'))
})
.catch(err => console.log(err));
