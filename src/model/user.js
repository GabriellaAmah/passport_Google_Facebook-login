/* eslint-disable node/no-extraneous-import */
/* eslint-disable node/no-unsupported-features/es-syntax */
import mongoose from 'mongoose';
import {default as findOrCreate} from 'mongoose-findorcreate'

const Schema = mongoose.Schema;
const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique : true
    },

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

userSchema.plugin(findOrCreate)

const User = mongoose.model('User', userSchema);

export default User

